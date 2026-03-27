import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { playClickTone } from "../lib/sound";
import {
  assistantQuickActions,
  portfolioAssistantStarter,
  resolvePortfolioAssistantReply,
} from "../lib/portfolioAssistant";

const starterMessages = [portfolioAssistantStarter];

function scrollToSection(sectionId) {
  if (!sectionId) {
    return;
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AIAssistant({ onClose, soundEnabled }) {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const messagesEndRef = useRef(null);
  const replyTimeoutRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(
    () => () => {
      if (replyTimeoutRef.current) {
        window.clearTimeout(replyTimeoutRef.current);
      }
    },
    [],
  );

  const sendMessage = (value = input) => {
    const trimmed = value.trim();
    if (!trimmed || isReplying) {
      return;
    }

    playClickTone(soundEnabled);
    const reply = resolvePortfolioAssistantReply(trimmed);
    scrollToSection(reply.sectionId);

    setMessages((current) => [
      ...current,
      { from: "user", text: trimmed },
    ]);
    setInput("");
    setIsReplying(true);

    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, { from: "bot", text: reply.text }]);
      setIsReplying(false);
    }, 500);
  };

  return (
    <motion.aside
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      transition={{ duration: 0.28 }}
      className="fixed bottom-28 right-4 z-[99990] flex h-[32rem] w-[min(24rem,calc(100%-2rem))] flex-col overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-slate-950/80 shadow-[0_0_55px_rgba(34,211,238,0.18)] backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
            <Bot className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Portfolio Guide</div>
            <div className="text-xs text-slate-400">Quick help for projects, skills, and contact</div>
          </div>
        </div>
        <button
          type="button"
          data-cursor="interactive"
          onClick={() => {
            playClickTone(soundEnabled);
            onClose();
          }}
          className="rounded-full border border-white/10 p-2 text-slate-400 transition hover:border-cyan-300/40 hover:text-cyan-300"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, index) => (
          <motion.div
            key={`${message.from}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.from === "bot"
                ? "border border-cyan-300/15 bg-cyan-300/8 text-slate-100"
                : "ml-auto border border-fuchsia-300/20 bg-fuchsia-300/10 text-slate-50"
            }`}
          >
            {message.text}
          </motion.div>
        ))}
        {isReplying ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex max-w-[5.5rem] items-center gap-1.5 rounded-2xl border border-cyan-300/15 bg-cyan-300/8 px-4 py-3"
          >
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="h-2 w-2 rounded-full bg-cyan-200/80"
                animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                transition={{ duration: 0.9, repeat: Number.POSITIVE_INFINITY, delay: dot * 0.12 }}
              />
            ))}
          </motion.div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-white/8 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {assistantQuickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              data-cursor="interactive"
              onClick={() => {
                sendMessage(action.prompt);
              }}
              className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/14"
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <input
            autoFocus
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask about projects, skills, contact, or about me..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
          <button
            type="button"
            data-cursor="interactive"
            onClick={sendMessage}
            disabled={!input.trim() || isReplying}
            className={`grid h-10 w-10 place-items-center rounded-full text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.4)] transition ${
              !input.trim() || isReplying
                ? "cursor-not-allowed bg-slate-600"
                : "bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105"
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

export default AIAssistant;
