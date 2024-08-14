import { useEffect, useState } from "react";

export const useFetch = (url, options = {}) => {
    const [state, setState] = useState({
        data: null, 
        isLoading: true,
        hasError: null,
    });

    const getFetch = async () => {
        setState({
            data: null,
            isLoading: true,
            hasError: null,
        });

        try {
            const resp = await fetch(url, options);
            const data = await resp.json();
            setState({
                data,
                isLoading: false,
                hasError: null,
            });
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                hasError: error,
            });
        }
    };

    useEffect(() => {
        if (url) {
            getFetch();
        }
    }, [url, options.refresh]); // Añadir `options.refresh` como dependencia

    return {
        ...state,
    };
};
