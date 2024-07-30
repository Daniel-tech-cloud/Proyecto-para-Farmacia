import { useState, useEffect } from 'react';

export const useDebounce = (value, delay, initialValue = 'a') => {
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        // Si value es null o vacío, usa el valor inicial
        const handler = setTimeout(() => {
            setDebouncedValue(value || initialValue);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, initialValue]);

    return debouncedValue;
};
