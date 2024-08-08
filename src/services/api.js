// services/api.js

const API_URL = import.meta.env.VITE_API_URL;

export const updateLaboratorio = async (id, data) => {
    try {
        const response = await fetch(`${API_URL}/events/update/laboratorio/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            // Manejar el error basado en el código de estado HTTP
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        return response.json();  // Aquí aún podrías querer manejar un posible error de JSON.
    } catch (error) {
        console.error("Error en la actualización del laboratorio:", error);
        throw error;  // Re-lanzar el error para manejarlo en la UI si es necesario.
    }
};

export const updateMedicamento = async (id, data, image) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    if (image) {
        formData.append('imagen', image);
    }
    const response = await fetch(`${API_URL}/events/update/medicamentos/${id}`, {
        method: 'PUT',
        body: formData
    });
    return response.json();
};

export const updateSustancia = async (id, data) => {
    const response = await fetch(`${API_URL}/events/update/sustancias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};
