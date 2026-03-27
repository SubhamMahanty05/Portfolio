import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles } from "lucide-react";
import { playClickTone } from "../../lib/sound";
import {
  assistantQuickActions,
  portfolioAssistantStarter,
  resolvePortfolioAssistantReply,
} from "../../lib/portfolioAssistant";

const starterMessages = [portfolioAssistantStarter];

const typingPlaceholders = [
  "Ask about projects...",
  "Ask about skills...",
  "Ask for a quick intro...",
  "Ask how to contact...",
  "Explore the portfolio...",
];

function scrollToSection(sectionId) {
  if (!sectionId) {
    return;
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function AIChatInterface({ soundEnabled, onActivityChange }) {
  const [messages, setMessages] = useState(starterMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [particles, setParticles] = useState([]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const replyTimeoutRef = useRef(null);

  // Animated placeholder rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % typingPlaceholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Create particles when typing
  useEffect(() => {
    if (input.length > 0 && !isTyping) {
      setIsTyping(true);
      // Create new particles
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.5 + 0.3,
      }));
      setParticles(newParticles);

      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
        setIsTyping(false);
      }, 2000);
    }
  }, [input, isTyping]);

  useEffect(() => {
    onActivityChange?.(Math.min(1, input.length / 40));
  }, [input.length, onActivityChange]);

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
    onActivityChange?.(0.15);
    setIsReplying(true);

    replyTimeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, { from: "bot", text: reply.text }]);
      setIsReplying(false);
    }, 500);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="relative h-[28rem] overflow-hidden rounded-[1.5rem] border border-cyan-300/16 bg-[linear-gradient(160deg,rgba(8,47,73,0.16),rgba(15,23,42,0.88),rgba(76,29,149,0.12))] shadow-[0_0_52px_rgba(34,211,238,0.12)] backdrop-blur-2xl">
      {/* Reactive Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: "50%",
                y: "50%"
              }}
              animate={{
                opacity: particle.opacity,
                scale: 1,
                x: `${particle.x}%`,
                y: `${particle.y}%`,
              }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.5 }
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut"
              }}
              className="absolute h-2 w-2 rounded-full bg-cyan-300/60 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </AnimatePresence>

        {/* Glowing wave effect when typing */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-[1.5rem] border-2 border-cyan-300/40 shadow-[0_0_60px_rgba(34,211,238,0.4)]"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/8 px-6 py-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={isTyping || isReplying ? { scale: [1, 1.1, 1] } : { scale: 1 }}
            transition={{ duration: 1, repeat: isTyping || isReplying ? Number.POSITIVE_INFINITY : 0 }}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10"
          >
            <Bot className="h-5 w-5 text-cyan-300" />
          </motion.div>
          <div>
            <div className="text-sm font-semibold text-white">Portfolio Guide</div>
            <div className="text-xs text-slate-400">
              {isReplying ? "Typing a reply..." : isTyping ? "Finding the right section..." : "Ask about projects, skills, or contact"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={isTyping || isReplying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 2, repeat: isTyping || isReplying ? Number.POSITIVE_INFINITY : 0 }}
          >
            <Sparkles className="h-4 w-4 text-cyan-300" />
          </motion.div>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 space-y-3 overflow-y-auto px-6 py-4">
        {messages.map((message, index) => (
          <motion.div
            key={`${message.from}-${index}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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

      {/* Input */}
      <div className="relative z-10 border-t border-white/8 p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {assistantQuickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                sendMessage(action.prompt);
              }}
              className="rounded-full border border-cyan-300/18 bg-cyan-300/8 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/14"
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className={`flex items-center gap-3 rounded-2xl border bg-white/5 px-4 py-3 transition-all duration-300 ${
          isTyping
            ? "border-cyan-300/40 shadow-[0_0_30px_rgba(34,211,238,0.3)] bg-cyan-300/5"
            : "border-white/10"
        }`}>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder=""
              className="w-full bg-transparent text-sm text-white outline-none"
            />
            <AnimatePresence mode="wait">
              {!input && (
                <motion.span
                  key={currentPlaceholder}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute left-0 top-0 flex h-full items-center text-sm text-slate-500"
                >
                  {typingPlaceholders[currentPlaceholder]}
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={sendMessage}
            disabled={!input.trim() || isReplying}
            className={`grid h-10 w-10 place-items-center rounded-full text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.4)] transition ${
              input.trim() && !isReplying
                ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                : "bg-slate-600 cursor-not-allowed"
            }`}
          >
            <Send className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default AIChatInterface;
