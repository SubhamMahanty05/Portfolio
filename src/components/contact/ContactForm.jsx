import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Copy, Send } from "lucide-react";
import { playClickTone } from "../../lib/sound";
import SuccessAnimation from "./SuccessAnimation";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

const messagePrompts = [
  "Describe your ML idea or internship opportunity...",
  "Tell me about the product, dataset, or research direction...",
  "Share the problem you want intelligent systems to solve...",
];

function validate(values) {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = "Please share your name.";
  }

  if (!values.email.trim()) {
    nextErrors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    nextErrors.message = "Please add a short message.";
  } else if (values.message.trim().length < 20) {
    nextErrors.message = "A little more context would help. Aim for 20+ characters.";
  }

  return nextErrors;
}

function FloatingField({
  field,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  focused,
  placeholderText,
  waveStrength = 0,
}) {
  const isRaised = focused || value.length > 0;
  const inputClassName =
    "peer w-full rounded-[1.5rem] border bg-white/[0.03] px-4 pb-4 pt-6 text-sm text-white outline-none transition duration-300 placeholder:text-transparent focus:shadow-[0_0_28px_rgba(34,211,238,0.16)]";
  const shellClassName = error
    ? "border-rose-400/45 shadow-[0_0_22px_rgba(244,63,94,0.14)]"
    : focused
      ? "border-cyan-300/45 shadow-[0_0_30px_rgba(34,211,238,0.18)]"
      : "border-white/10 hover:border-cyan-300/24";

  return (
    <label className="block">
      <div className={`relative overflow-hidden rounded-[1.5rem] border backdrop-blur-xl transition duration-300 ${shellClassName}`}>
        {field.multiline ? (
          <>
            <motion.div
              aria-hidden="true"
              animate={{
                opacity: waveStrength > 0 ? [0.14, 0.4, 0.14] : 0.08,
                y: waveStrength > 0 ? [0, -6, 0] : 0,
              }}
              transition={{ duration: 1.8, repeat: waveStrength > 0 ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.22),transparent_62%)] blur-xl"
            />
            <motion.div
              aria-hidden="true"
              animate={{ x: waveStrength > 0 ? ["-20%", "15%", "-20%"] : 0, opacity: waveStrength > 0 ? 1 : 0.35 }}
              transition={{ duration: 2.8, repeat: waveStrength > 0 ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-[-10%] bottom-6 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
            />
            <textarea
              id={field.name}
              name={field.name}
              rows={6}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder={field.label}
              className={`${inputClassName} relative z-10 min-h-[10rem] resize-none`}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${field.name}-error` : undefined}
            />
            <AnimatePresence mode="wait">
              {!value && !focused ? (
                <motion.span
                  key={placeholderText}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.32 }}
                  className="pointer-events-none absolute left-4 top-[3.4rem] flex items-center text-sm text-slate-500"
                >
                  {placeholderText}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
                    className="ml-1 text-cyan-300"
                  >
                    |
                  </motion.span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </>
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={field.label}
            className={inputClassName}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
        )}

        <motion.span
          animate={{
            y: isRaised ? -16 : 0,
            scale: isRaised ? 0.86 : 1,
            color: error ? "#fda4af" : isRaised ? "#cffafe" : "#94a3b8",
          }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="pointer-events-none absolute left-4 top-5 origin-left text-sm"
        >
          {field.label}
        </motion.span>
      </div>

      <AnimatePresence>
        {error ? (
          <motion.p
            id={`${field.name}-error`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="px-2 pt-2 text-xs text-rose-300"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </label>
  );
}

function ContactForm({ contactProfile, soundEnabled, onActivityChange }) {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messagePlaceholderIndex, setMessagePlaceholderIndex] = useState(0);

  const fields = useMemo(
    () => [
      { name: "name", label: "Name", type: "text" },
      { name: "email", label: "Email", type: "email" },
      { name: "message", label: "Message", multiline: true },
    ],
    [],
  );

  useEffect(() => {
    if (values.message || focusedField === "message") {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setMessagePlaceholderIndex((current) => (current + 1) % messagePrompts.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [focusedField, values.message]);

  useEffect(() => {
    const totalSignal = Math.min(
      1,
      (values.name.length * 0.18 + values.email.length * 0.1 + values.message.length * 0.045) / 10,
    );

    onActivityChange?.(totalSignal);
  }, [onActivityChange, values.email.length, values.message.length, values.name.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    playClickTone(soundEnabled);
    setIsSubmitting(true);

    await new Promise((resolve) => window.setTimeout(resolve, 1300));

    setIsSubmitting(false);
    setIsSuccess(true);
    setValues(initialForm);
    onActivityChange?.(0);
  };

  const handleCopy = async () => {
    if (!navigator?.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(contactProfile.email);
    setCopied(true);
    playClickTone(soundEnabled);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <SuccessAnimation key="success" email={contactProfile.email} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 18, filter: "blur(14px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2rem] border border-cyan-300/16 bg-[linear-gradient(160deg,rgba(8,47,73,0.16),rgba(15,23,42,0.88),rgba(76,29,149,0.12))] p-6 shadow-[0_0_52px_rgba(34,211,238,0.12)] backdrop-blur-2xl md:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_24%)]" />
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

          <div className="relative">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.35em] text-cyan-200/75">Form</div>
                <h3 className="mt-3 text-2xl font-semibold text-white">Open a direct line</h3>
              </div>

              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs uppercase tracking-[0.24em] text-slate-200 transition hover:border-cyan-300/24 hover:text-cyan-100"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy Email"}
              </motion.button>
            </div>

            <div className="grid gap-4">
              {fields.map((field) => (
                <FloatingField
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  error={errors[field.name]}
                  focused={focusedField === field.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField("")}
                  placeholderText={field.name === "message" ? messagePrompts[messagePlaceholderIndex] : ""}
                  waveStrength={field.name === "message" ? Math.min(values.message.length / 80, 1) : 0}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_38px_rgba(34,211,238,0.26)] transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span>{isSubmitting ? "Sending Signal..." : "Send Message"}</span>
                <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-slate-950/10">
                  <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition group-hover:opacity-100" />
                  {isSubmitting ? <ArrowRight className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
                </span>
              </motion.button>

              {/* <p className="max-w-xs text-xs leading-6 text-slate-400">
                The interface reacts as you type, then hands off to the same premium success state. EmailJS or an API can plug in later.
              </p> */}
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export default ContactForm;
