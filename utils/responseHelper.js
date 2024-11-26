/**
 * Standardized API response helper
 * 
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Message describing the response
 * @param {object} [data] - Optional data payload
 * 
 * @returns {object} - Express JSON response
 */
const responseHelper = (res, statusCode, message, data = null) => {
    const response = { 
        status: statusCode >= 200 && statusCode < 300 ? 'success' : 'error',
        message 
    };
    
    if (data) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

module.exports = responseHelper;
