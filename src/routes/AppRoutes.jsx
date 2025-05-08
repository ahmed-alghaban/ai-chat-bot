import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PrivateRoute from './PrivateRoute';
import Layout from '../components/shared/Layout';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import APIKeyManager from '../components/profile/APIKeyManager';
import Transcription from '../pages/Transcription';

// Placeholder components for future implementation
const Transcriptions = () => <div className="text-gray-900 dark:text-white">Transcriptions (Coming Soon)</div>;

const AppRoutes = () => {
    const { currentUser } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={currentUser ? <Navigate to="/chat" /> : <Login />}
                />
                <Route
                    path="/register"
                    element={currentUser ? <Navigate to="/chat" /> : <Register />}
                />

                {/* Protected Routes */}
                <Route
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/keys" element={<APIKeyManager />} />
                    <Route path="/transcriptions" element={<Transcription />} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes; 