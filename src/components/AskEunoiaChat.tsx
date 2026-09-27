import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, RotateCcw, ShieldCheck, ArrowRight, Bot } from 'lucide-react';
import { BUSINESS_INFO } from '../data/products.ts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Ayubowan! 🙏 Welcome to Eunoia. I'm your 24/7 craft concierge. Ask me anything about our handcrafted collections, custom personalizations ("Make It Mine"), island-wide delivery in Sri Lanka, or gift recommendations!`,
  timestamp: 'Just now',
};

const SUGGESTED_PROMPTS = [
  '🎨 How does "Make It Mine" work?',
  '🚚 Delivery timeframe & rates in Sri Lanka?',
  '🎁 Suggest a gift under Rs. 3,500 LKR',
  '🕯️ Tell me about your Ceramic Soy Candle',
  '📍 Studio address & hours in Colombo',
];

interface AskEunoiaChatProps {
  onOpenWhatsApp: (customMsg?: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AskEunoiaChat: React.FC<AskEunoiaChatProps> = ({
  onOpenWhatsApp,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const toggleChat = controlledOnToggle || (() => setInternalIsOpen(!internalIsOpen));

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.reply || "Thank you for inquiring! Please feel free to ask more or chat with our Colombo studio team on WhatsApp.";

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMessage: Message = {
        id: `fallback-${Date.now()}`,
        role: 'assistant',
        content: `Ayubowan! We are always here to help. You can also chat directly with our Colombo workshop team on WhatsApp (+94 77 123 4567) for instant assistance!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  return (
    <>
      {/* Floating Bottom Chat Button: 💬 Ask Eunoia */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={toggleChat}
          className="group flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-semibold text-xs sm:text-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-blue-400 cursor-pointer border border-blue-700/60"
          aria-label="Open 24/7 Ask Eunoia Chatbot"
          title="💬 Ask Eunoia — 24/7 Artisan AI Concierge"
        >
          <span className="text-base sm:text-lg leading-none select-none">💬</span>
          <span className="font-semibold tracking-wide">Ask Eunoia</span>
          <span className="flex items-center gap-1 pl-1 border-l border-blue-700/70 text-[10px] text-blue-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline font-mono">24/7</span>
          </span>
        </button>
      </div>

      {/* Chat Window Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ask Eunoia 24/7 Chatbot"
          className="fixed bottom-22 left-4 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] h-[520px] bg-white rounded-2xl shadow-2xl border border-blue-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 p-4 text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-amber-200 bg-[#FDFBF7] shrink-0">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Eunoia Logo"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm tracking-tight text-white">
                    💬 Ask Eunoia
                  </h3>
                  <span className="text-[9px] font-semibold bg-blue-700/80 text-blue-100 px-1.5 py-0.2 rounded">
                    24/7 Concierge
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">
                  Artisanal Craft & Gift Assistant · Colombo
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearHistory}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={toggleChat}
                className="p-1.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-blue-50/70 px-3.5 py-1.5 border-b border-blue-100 flex items-center justify-between text-[11px] text-blue-900 shrink-0">
            <span className="flex items-center gap-1 text-[10px] font-medium">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Always online to answer questions & recommend crafts
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live
            </span>
          </div>

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
            {messages.map((message) => {
              const isUser = message.role === 'user';
              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 text-xs font-serif font-bold border border-blue-200">
                      E
                    </div>
                  )}

                  <div className={`max-w-[82%] space-y-1`}>
                    <div
                      className={`text-xs p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-blue-700 text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`text-[9px] text-slate-400 px-1 ${
                        isUser ? 'text-right' : 'text-left'
                      }`}
                    >
                      {message.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shrink-0 text-xs font-serif font-bold border border-blue-200">
                  E
                </div>
                <div className="bg-white text-slate-600 border border-slate-200 p-3 rounded-2xl rounded-bl-xs shadow-2xs text-xs flex items-center gap-1.5">
                  <span className="text-slate-400 text-[11px]">Eunoia is typing</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" />
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (when only initial message or user wants quick answers) */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 text-[10px] rounded-full whitespace-nowrap border border-slate-200/70 transition-colors cursor-pointer shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input & Send Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0 space-y-2">
            <div className="flex items-center gap-1.5">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about crafts, delivery, custom orders..."
                disabled={isLoading}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-slate-50 focus:bg-white text-slate-800"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-xs"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Direct Human WhatsApp Link */}
            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 px-0.5">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-blue-600" />
                Crafted in Colombo
              </span>
              <button
                type="button"
                onClick={() => onOpenWhatsApp("Hello Eunoia! I'm chatting with 'Ask Eunoia' and would love human assistance.")}
                className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Prefer WhatsApp?</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
