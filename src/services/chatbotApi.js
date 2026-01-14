import axios from 'axios';

// Get API URL from environment variables, fallback to localhost for development
const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:10000';

/**
 * Service to interact with the external Chatbot API
 */
const chatbotApi = {
    /**
     * Check if the chatbot service is healthy
     * GET /api/health
     * @returns {Promise<boolean>} true if healthy
     */
    checkHealth: async () => {
        try {
            const response = await axios.get(`${CHATBOT_API_URL}/api/health`);
            return response.status === 200;
        } catch (error) {
            console.error('Chatbot health check failed:', error);
            return false;
        }
    },

    /**
     * Send a message to the chatbot
     * POST /api/chat
     * @param {string} message - User's message
     * @param {Array} history - Conversation history [{role, content}]
     * @param {string|object} location - User's location
     * @param {string} sessionId - Optional session ID
     * @returns {Promise<object>} Chatbot response { response, retrieved_businesses, ... }
     */
    sendMessage: async (message, history = [], location = null, sessionId = null) => {
        try {
            const payload = {
                message,
                conversation_history: history,
                user_location: location,
                session_id: sessionId
            };

            const response = await axios.post(`${CHATBOT_API_URL}/api/chat`, payload);
            return response.data;
        } catch (error) {
            console.error('Chatbot message failed:', error);
            throw error;
        }
    }
};

export default chatbotApi;
