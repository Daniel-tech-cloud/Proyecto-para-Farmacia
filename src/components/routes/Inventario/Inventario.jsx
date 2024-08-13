import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { EditableRow, ReadOnlyRow } from '../Inventario/';
import '../../../style.css';

export const Inventario = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [inventario, setInventario] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
   // Estado inicial con valores por defecto vacíos
    const [newItem, setNewItem] = useState({
        idInventario: '',
        idMedicamento:'',
        nombreMedicamento: '',
        tipo: '',
        Laboratorio: '',
        cantidad: '',
        precioCompra: '',
        precioVenta: '',
        fechaCompra: '',
        caducidad: ''
    }); 
    const [error, setError] = useState('');

    useEffect(() => {
        fetchInventario();
        fetchMedicamentos();
    }, []);

    const fetchInventario = async () => {
        try {
            const response = await fetch(`${API_URL}/events/inventory/`);
            const data = await response.json();

            // Verifica si `data` es un array
            if (Array.isArray(data)) {
                setInventario(data);
            } else {
                setInventario([]); // O maneja el caso en que no es un array
            }
        } catch (error) {
            console.error('Error fetching inventario:', error);
            setError('Error fetching inventario');
        }
    };

    const fetchMedicamentos = async () => {
        try {
            const response = await fetch(`${API_URL}/events/search/medicamentos/`);
            const data = await response.json();
            if (data.ok && Array.isArray(data.medicamentos)) {
                setMedicamentos(data.medicamentos);
            } else {
                setMedicamentos([]);
                setError('Error fetching medicamentos');
            }
        } catch (error) {
            console.error('Error fetching medicamentos:', error);
            setMedicamentos([]);
            setError('Error fetching medicamentos');
        }
    };

    const handleAdd = async () => {
        try {
            await fetch(`${API_URL}/events/inventory/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            fetchInventario();
            setShowModal(false);
            
            setNewItem({
                idInventario: '',
                idMedicamento:'',
                nombreMedicamento: '',
                tipo: '', 
                idLaboratorio: '',
                cantidad: '',
                precioCompra: '',
                precioVenta: '',
                fechaCompra: '',
                caducidad: ''
            });
        } catch (error) {
            console.error('Error adding inventario:', error);
            setError('Error adding inventario');
        }
    };

    const handleUpdate = async (item) => {
        try {
            await fetch(`${API_URL}/events/inventory/${item.idInventario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            fetchInventario();
            setEditingItem(null);
        } catch (error) {
            console.error('Error updating inventario:', error);
            setError('Error updating inventario');
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/events/inventory/${id}`, {
                method: 'DELETE',
            });
            fetchInventario();
        } catch (error) {
            console.error('Error deleting inventario:', error);
            setError('Error deleting inventario');
        }
    };

    const handleNewMedicament = () => {
        navigate("/alta");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleSelectChange = (e) => {
        const selectedNombre = e.target.value;
        const selectedMedicamento = medicamentos.find(med => med.nombre === selectedNombre);

        if (selectedMedicamento) {
            setNewItem({
                ...newItem,
                nombreMedicamento: selectedNombre,
                idMedicamento: selectedMedicamento.id,
                idLaboratorio: selectedMedicamento.laboratorios.id,
                tipo: selectedMedicamento.tipo
            });
        } else {
            setNewItem({
                ...newItem,
                nombreMedicamento: selectedNombre,
                idMedicamento: '',
                idLaboratorio: '',
                tipo: ''
            });
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Inventario</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <button className="btn btn-primary m-3" onClick={handleNewMedicament}>
                <FontAwesomeIcon icon={faPlus} /> Agregar nuevo medicamento
            </button>

            <button className="btn btn-primary m-2" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Agregar al inventario
            </button>
            <div className="table-responsive mt-3 mb-5  table-shadow">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-center">ID Inventario</th>
                            <th className="text-center">Tipo</th>
                            <th className="text-center">Nombre</th>
                            <th className="text-center">Laboratorio</th>
                            <th className="text-center">Cantidad</th>
                            <th className="text-center">Precio Compra</th>
                            <th className="text-center">Precio Venta</th>
                            <th className="text-center">Fecha Compra</th>
                            <th className="text-center">Caducidad</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventario.map((item) => (
                            <tr key={item.idInventario}>
                                {editingItem?.idInventario === item.idInventario ? (
                                    <EditableRow item={editingItem} setEditingItem={setEditingItem} handleUpdate={handleUpdate} />
                                ) : (
                                    <ReadOnlyRow item={item} setEditingItem={setEditingItem} handleDelete={handleDelete} />
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar medicamento a inventario</h5>
                            <button type="button" className="close" onClick={() => setShowModal(false)}>
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Nombre del Medicamento</label>
                                    <select
                                        className="form-control"
                                        name="nombreMedicamento"
                                        value={newItem.nombreMedicamento}
                                        onChange={handleSelectChange}
                                    >
                                        <option value="">Seleccione un medicamento</option>
                                        {medicamentos.map(med => (
                                            <option key={med.id} value={med.nombre}>
                                                {med.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Tipo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="tipo"
                                        value={newItem.tipo || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ID Laboratorio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="idLaboratorio"
                                        value={newItem.idLaboratorio || ''}
                                        onChange={handleChange}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cantidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="cantidad"
                                        value={newItem.cantidad || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio de Compra</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        name="precioCompra"
                                        value={newItem.precioCompra || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio de Venta</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        name="precioVenta"
                                        value={newItem.precioVenta || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha de Compra</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fechaCompra"
                                        value={newItem.fechaCompra || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Caducidad</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="caducidad"
                                        value={newItem.caducidad || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
