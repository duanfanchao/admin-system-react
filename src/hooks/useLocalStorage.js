import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
    // Get stored value or use initial value
    const readValue = () => {
        // Prevent build error "window is undefined" during SSR
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    };

    // State to store our value
    const [storedValue, setStoredValue] = useState(readValue);

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Save state
            setStoredValue(valueToStore);

            // Save to localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    // Remove value from localStorage
    const removeValue = () => {
        try {
            // Remove from state
            setStoredValue(initialValue);

            // Remove from localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    };

    // Listen for changes across tabs
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === key && event.newValue !== event.oldValue) {
                setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
            }
        };
        console.log('useLocalStorage effect ran');
        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};

export default useLocalStorage;