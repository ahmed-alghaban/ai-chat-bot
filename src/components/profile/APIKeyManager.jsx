import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';

const APIKeyManager = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { apiKey, setApiKey } = useApp();
    const [tempApiKey, setTempApiKey] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setApiKey(tempApiKey);
        setIsEditing(false);
        setTempApiKey('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 m-5" >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Key Management</h2>

            {!isEditing ? (
                <div className="space-y-4">
                    <div className="flex items-center justify-between align-middle">
                        <div>
                            <p className="text-gray-600 dark:text-gray-300 mb-1">Your API Key</p>
                            <p className="text-gray-900 dark:text-white font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                {apiKey ? '••••••••••••••••' : 'No API key set'}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setIsEditing(true);
                                setTempApiKey('');
                            }}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out mt-1"
                        >
                            {apiKey ? 'Update Key' : 'Add Key'}
                        </button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            API Key
                        </label>
                        <input
                            type="password"
                            id="apiKey"
                            value={tempApiKey}
                            onChange={(e) => setTempApiKey(e.target.value)}
                            placeholder="Enter your API key"
                            className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setTempApiKey('');
                            }}
                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default APIKeyManager; 