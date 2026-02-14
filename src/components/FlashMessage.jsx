import React, { useEffect } from 'react';

const FlashMessage = ({ messages, onClose }) => {
    useEffect(() => {
        if (messages && messages.length > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [messages, onClose]);

    if (!messages || messages.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`
            px-4 py-3 rounded-lg shadow-lg max-w-sm
            ${message.type === 'error'
                            ? 'bg-red-100 border border-red-400 text-red-700'
                            : message.type === 'success'
                                ? 'bg-green-100 border border-green-400 text-green-700'
                                : 'bg-blue-100 border border-blue-400 text-blue-700'
                        }
          `}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex">
                            <div className="mr-3">
                                {message.type === 'error' && (
                                    <i className="fas fa-exclamation-circle text-red-500"></i>
                                )}
                                {message.type === 'success' && (
                                    <i className="fas fa-check-circle text-green-500"></i>
                                )}
                                {message.type === 'info' && (
                                    <i className="fas fa-info-circle text-blue-500"></i>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{message.text}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FlashMessage;
