import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, User, Bot, Loader2, CheckCircle2, Maximize2, Minimize2, ChevronDown } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AIAssistantButton = ({ context = 'dashboard' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Speech Bubble */}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mb-4 relative bg-[#0f172a]/90 backdrop-blur-xl text-white px-5 py-3 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)] font-bold text-[13px] whitespace-nowrap border border-indigo-500/30 animate-bounce"
          >
            <span className="flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              Need any help?
            </span>
            {/* Cloud tail */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-[#0f172a]/90 backdrop-blur-xl border-b border-r border-indigo-500/30 transform rotate-45"></div>
          </motion.div>
        )}
        
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative bg-transparent border-none p-0 outline-none flex items-center justify-center cursor-pointer w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] hover:drop-shadow-[0_0_40px_rgba(99,102,241,0.8)] transition-all duration-300"
        >
          {/* Using the user uploaded robot avatar without circle */}
          <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse"></div>
          <img 
            src="/robot-assistant-transparent.png" 
            alt="AI Assistant" 
            className="w-full h-full object-contain filter drop-shadow-2xl relative z-10"
          />
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && <AIChatPanel onClose={() => setIsOpen(false)} context={context} />}
      </AnimatePresence>
    </>
  );
};

const AIChatPanel = ({ onClose, context }) => {
  const initialMessage = context === 'landing' 
    ? "Hello! I'm Kaapde AI. I can tell you all about Kaapde CRM's features, pricing, and how it can help your boutique grow. Ask me anything!"
    : "Hello! I'm Kaapde AI, your intelligent CRM assistant. How can I help you today?";

  const [messages, setMessages] = useState([
    { role: 'ai', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [actionConfirm, setActionConfirm] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, actionConfirm]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/ai/chat`, { message: userMessage, context });
      const data = response.data;
      
      if (data.actionRequired) {
        setActionConfirm(data.action);
        setMessages(prev => [...prev, { role: 'ai', content: data.message, isActionPrompt: true }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: data.message, cards: data.cards }]);
      }
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having trouble connecting to the CRM data right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionConfirm = async (confirmed) => {
    if (confirmed) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${API_URL}/ai/action`, { action: actionConfirm });
        setMessages(prev => [...prev, { role: 'ai', content: response.data.message }]);
      } catch (error) {
         setMessages(prev => [...prev, { role: 'ai', content: "Failed to execute action." }]);
      } finally {
        setIsLoading(false);
        setActionConfirm(null);
      }
    } else {
      setMessages(prev => [...prev, { role: 'ai', content: "Action cancelled." }]);
      setActionConfirm(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed bottom-24 right-6 z-[100] bg-[#09090b]/80 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden border border-white/10 ring-1 ring-white/5 transition-all duration-300 ${isExpanded ? 'w-[90vw] md:w-[800px] h-[85vh] max-h-[900px]' : 'w-[380px] h-[600px] max-h-[80vh]'}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-[#1e1b4b] to-[#312e81] p-5 flex justify-between items-center text-white relative overflow-hidden border-b border-white/10">
        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500 opacity-20 rounded-full blur-[40px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 opacity-20 rounded-full blur-[30px] transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Sparkles size={18} className="text-indigo-300" />
          </div>
          <div>
            <h3 className="font-bold text-[18px] tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white">
              Kaapde AI
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></span>
              <p className="text-[12px] text-gray-300 font-medium tracking-wide">Intelligent Assistant Online</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all duration-200" title={isExpanded ? "Minimize" : "Maximize"}>
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button onClick={onClose} className="text-gray-300 hover:text-red-400 bg-white/5 hover:bg-white/10 p-2 rounded-xl transition-all duration-200" title="Close">
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-transparent relative scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={idx} 
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)] border ${msg.role === 'user' ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-indigo-500/30' : 'bg-[#18181b] text-indigo-400 border-white/10'}`}>
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-3xl p-4 text-[14.5px] shadow-lg backdrop-blur-md ${msg.role === 'user' ? 'bg-indigo-600/20 text-indigo-50 rounded-tr-sm border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.15)]' : 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-sm'}`}>
              <div className="markdown-content leading-relaxed [&>p]:mb-2 last:[&>p]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>li]:mb-1 [&>strong]:font-semibold [&>strong]:text-white">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              
              {/* Cards / Data visualization within chat */}
              {msg.cards && (
                <div className="mt-4 space-y-2">
                  {msg.cards.map((card, cidx) => (
                    <div key={cidx} className="bg-black/20 p-3 rounded-xl border border-white/5 text-[13px] text-gray-300 shadow-inner">
                      {card}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Action Buttons */}
              {msg.isActionPrompt && actionConfirm && (
                <div className="flex gap-2 mt-4">
                  <button onClick={() => handleActionConfirm(true)} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-[13.5px] font-semibold py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] flex justify-center items-center gap-1.5 border border-indigo-400/50">
                    <CheckCircle2 size={16} /> Confirm
                  </button>
                  <button onClick={() => handleActionConfirm(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 text-[13.5px] font-semibold py-2.5 rounded-xl transition-all border border-white/10">
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-[#18181b] border border-white/10 text-indigo-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <Bot size={16} />
            </div>
            <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-3xl rounded-tl-sm shadow-lg flex items-center gap-3 backdrop-blur-md">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping [animation-delay:150ms]"></span>
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping [animation-delay:300ms]"></span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && !isLoading && (
        <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/10 bg-black/20">
          {(context === 'landing' 
            ? ["What features do you offer?", "Tell me about pricing", "Is WhatsApp supported?"] 
            : ["Show this month's sales", "Find hot leads", "Show pending invoices"]
          ).map((prompt, i) => (
            <button key={i} onClick={() => setInput(prompt)} className="shrink-0 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 text-[12.5px] font-medium px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:text-white">
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Initialize command..."
            className="w-full bg-[#18181b] border border-white/10 text-white rounded-2xl pl-5 pr-14 py-3.5 text-[14.5px] shadow-inner focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-gray-500 font-medium"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_0_15px_rgba(79,70,229,0.4)] disabled:shadow-none border border-indigo-400/30"
          >
            <Send size={18} className="ml-1" />
          </button>
        </div>
        <div className="mt-3 flex justify-center items-center gap-2">
           <div className="w-1 h-1 rounded-full bg-gray-500"></div>
           <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Secure AI Connection Established</span>
           <div className="w-1 h-1 rounded-full bg-gray-500"></div>
        </div>
      </div>
    </motion.div>
  );
};

export { AIAssistantButton, AIChatPanel };

