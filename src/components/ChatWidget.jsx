import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Zap, ChevronDown, Minimize2, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import chatbotApi from '../services/chatbotApi';
import { motion, AnimatePresence } from 'framer-motion';

// --- Sub-Component: Rich Service Card ---
const ServiceCard = ({ data }) => {
    if (!data || (!data.name && !data.image)) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow my-2 w-full max-w-[280px]"
        >
            <div className="h-28 bg-gray-200 relative">
                <img
                    src={data.image || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"}
                    alt={data.name || 'Business'}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
                    ⭐ {data.rating || '4.5'}
                </div>
            </div>
            <div className="p-3">
                <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{data.name || 'Business Name'}</h4>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                    <MapPin size={10} />
                    <span className="truncate">{data.location || data.address || 'Location'}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                    {data.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="text-[10px] bg-brand-teal/5 text-brand-teal px-1.5 py-0.5 rounded border border-brand-teal/10 font-medium">
                            {tag}
                        </span>
                    ))}
                </div>
                <button
                    onClick={() => window.location.href = `/business/${data.id || data.$id || data._id}`}
                    className="block w-full text-center bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white py-1.5 rounded-lg text-xs font-semibold transition-colors"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

const ChatWidget = ({ isOpen, onToggle, className }) => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: "👋 Hi there! I'm your **Ekthaa Assistant**.\n\nLooking for **Plumbers**, **Restaurants**, or **Groceries** nearby?",
            type: 'text'
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ragStatus, setRagStatus] = useState('initializing');
    const messagesEndRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);

    const suggestions = ["Find Plumbers", "Nearby Biryani", "Grocery Stores", "Electrical Shops"];

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    useEffect(() => {
        const checkRagStatus = async () => {
            try {
                // If chatbot is down, we handle it quietly
                const isHealthy = await chatbotApi.checkHealth().catch(() => false);
                setRagStatus(isHealthy ? 'ready' : 'error');
            } catch (err) {
                setRagStatus('error');
            }
        };

        checkRagStatus();
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation(`${latitude}, ${longitude}`);
                },
                (error) => console.log("Location access denied")
            );
        }
    }, []);

    const handleSendMessage = async (inputOverride = null) => {
        const messageText = inputOverride || inputText;
        if (!messageText.trim()) return;

        setMessages(prev => [...prev, { role: 'user', content: messageText, type: 'text' }]);
        setInputText('');
        setIsLoading(true);

        try {
            // Mock response if backend is down (to keep UI robust)
            if (ragStatus === 'error') {
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: "⚠️ **Connection Issue**: I'm having trouble reaching the AI server right now. \n\nPlease try searching directly using the search bar above! 👆",
                        type: 'text'
                    }]);
                    setIsLoading(false);
                }, 1000);
                return;
            }

            const data = await chatbotApi.sendMessage(messageText, messages.slice(1), userLocation);

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || "I didn't catch that. Could you try asking differently?",
                type: 'text',
                data: data.retrieved_businesses || data.data || null
            }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "⚠️ **Network Error**: Something went wrong. Please check your internet or try again later.",
                type: 'text'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {/* Floating Action Button */}
            {!isOpen && (
                <motion.div
                    key="fab"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    className="fixed bottom-6 right-6 z-50"
                >
                    <button
                        onClick={() => onToggle(true)}
                        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-brand-teal to-teal-700 text-white rounded-full shadow-2xl shadow-brand-teal/40 transition-all"
                    >
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping group-hover:animate-none opacity-50"></div>
                        <MessageCircle size={26} className="relative z-10" />

                        {/* Status Dot */}
                        <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-2 border-white rounded-full ${ragStatus === 'ready' ? 'bg-green-500' : 'bg-red-400'
                            }`}></div>
                    </button>
                </motion.div>
            )}

            {/* Chat Sidebar/Window */}
            {isOpen && (
                <motion.div
                    key="chat-window"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className={`fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50 font-sans`}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand-teal to-teal-700 p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                                <Zap size={20} className="text-white fill-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">Ekthaa Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className={`w-1.5 h-1.5 rounded-full ${ragStatus === 'ready' ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                    <span className="text-[10px] text-white/80 font-medium uppercase tracking-wide">
                                        {ragStatus === 'ready' ? 'Online' : 'Offline'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 relative z-10">
                            <button
                                onClick={() => onToggle(false)}
                                className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <ChevronDown size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.role === 'user' ? (
                                    <div className="bg-brand-teal text-white rounded-2xl rounded-tr-none px-4 py-2.5 max-w-[85%] text-sm shadow-sm">
                                        {msg.content}
                                    </div>
                                ) : (
                                    <div className="max-w-[90%] space-y-2">
                                        <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 text-sm text-gray-700 shadow-sm prose prose-sm max-w-none prose-p:my-1 prose-a:text-brand-teal">
                                            <ReactMarkdown>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                        {/* Render Data Cards if available */}
                                        {msg.data && (
                                            <div className="pl-2">
                                                {Array.isArray(msg.data) ? (
                                                    msg.data.map((item, i) => <ServiceCard key={i} data={item} />)
                                                ) : <ServiceCard data={msg.data} />}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-brand-teal/60 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-brand-teal/60 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-1.5 h-1.5 bg-brand-teal/60 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                        {/* Suggestions Chips */}
                        {messages.length < 3 && (
                            <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide mb-1">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSendMessage(s)}
                                        className="whitespace-nowrap px-3 py-1.5 bg-gray-50 border border-gray-200 hover:border-brand-teal/30 hover:bg-brand-teal/5 text-xs font-medium text-gray-600 rounded-full transition-all"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative flex items-center gap-2">
                            <input
                                placeholder="Type a message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-teal/20 outline-none transition-all placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="bg-brand-teal text-white p-3 rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-brand-teal/20"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                        <div className="text-[10px] text-center text-gray-400 mt-2">
                            Powered by Ekthaa AI
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatWidget;



