import { useState } from "react";

export const useForm = (initialForm = {}) => {
        
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) =>{
        const { value } = target;
        setFormState({
            ...formState,
            medicamento: value,
        });
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

