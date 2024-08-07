// services/api.js

const API_URL = import.meta.env.VITE_API_URL;

export const updateLaboratorio = async (id, data) => {
    const response = await fetch(`${API_URL}/laboratorios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

export const updateMedicamento = async (id, data, image) => {
    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }
    if (image) {
        formData.append('imagen', image);
    }
    const response = await fetch(`${API_URL}/medicamentos/${id}`, {
        method: 'PUT',
        body: formData
    });
    return response.json();
};

export const updateSustancia = async (id, data) => {
    const response = await fetch(`${API_URL}/sustancias/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};
