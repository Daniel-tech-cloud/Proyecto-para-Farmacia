import { useState } from "react";

export const useForm = (initialForm = {}) => {
        
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) =>{
        const { data, value } = target;
        setFormState({
            ...formState,
             data : value,
        })
    }
    const onResetForm = () =>{
        setFormState(initialForm);
    }

    return {
        // Desestructuración
        ...formState,
        formState, 
        onInputChange,
        onResetForm,
    }
}

