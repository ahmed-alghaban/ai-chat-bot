import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, onAuthStateChanged,
    signInWithRedirect, GoogleAuthProvider, signOut,
    updateProfile, sendPasswordResetEmail, signInWithPopup
} from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Register user and update displayName
    const registerUser = async (email, password, displayName) => {
        setIsLoading(true);
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName });
            const { email: userEmail, displayName: userName, photoURL } = user;
            setCurrentUser({ email: userEmail, displayName: userName, photoURL });
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Sign in user
    const signIn = async (email, password) => {
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign-In
    const signUpProvider = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });

            const result = await signInWithPopup(auth, provider);
            console.log('Sign in successful:', result);

            if (result.user) {
                const { email, displayName, photoURL } = result.user;
                setCurrentUser({ email, displayName, photoURL });
                return true;
            }
            return 'Sign in was not completed successfully.';
        } catch (error) {
            console.error('Detailed auth error:', {
                code: error.code,
                message: error.message,
                fullError: error
            });

            if (error.code === 'auth/popup-blocked') {
                return 'Please allow popups for this site and try again.';
            }
            if (error.code === 'auth/popup-closed-by-user') {
                return 'Sign in was cancelled. Please try again.';
            }
            if (error.code === 'auth/cancelled-popup-request') {
                return 'Sign in was cancelled. Please try again.';
            }
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Google Sign-In (Redirect)
    const signUpProviderRedirect = async () => {
        setIsLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithRedirect(auth, provider);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Sign Out
    const logOut = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setCurrentUser(null);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            return error.message.split('Firebase: ')[1] || error.message;
        } finally {
            setIsLoading(false);
        }
    };

    // Observe user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            } else {
                setCurrentUser(null);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            isLoading,
            registerUser,
            signIn,
            signUpProvider,
            signUpProviderRedirect,
            logOut,
            forgotPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}

