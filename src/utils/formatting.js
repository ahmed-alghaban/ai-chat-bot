export const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

export const formatMessage = (message) => {
    return message.trim();
};

export const formatAPIKey = (key) => {
    if (!key) return '';
    return key.slice(0, 4) + '...' + key.slice(-4);
}; 