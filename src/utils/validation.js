// Validation utilities
export const validationUtils = {};

export const isValidAPIKey = (key) => {
    return key && key.length >= 32;
};

export const isValidMessage = (message) => {
    return message && message.trim().length > 0;
};

export const isValidAudioFile = (file) => {
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
    return file && validTypes.includes(file.type);
}; 