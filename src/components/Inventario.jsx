import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export const Inventario = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [inventario, setInventario] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        idInventario: '',
        nombreMedicamento: '',
        tipo: '',
        idMedicamento: '', 
        idLaboratorio: '',
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
            setInventario(data);
            
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
                nombreMedicamento: '',
                tipo: '',
                idMedicamento: '',  
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

            <button className="btn btn-primary m-3" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Agregar al inventario
            </button>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID Inventario</th>
                        <th>ID Medicamento</th>
                        <th>Tipo</th>
                        <th>Nombre</th>
                        <th>ID Laboratorio</th>
                        <th>Cantidad</th>
                        <th>Precio Compra</th>
                        <th>Precio Venta</th>
                        <th>Fecha Compra</th>
                        <th>Caducidad</th>
                        <th>Acciones</th>
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Agregar Nuevo Medicamento</h5>
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
                                        value={newItem.tipo}
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
                                        value={newItem.idLaboratorio}
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
                                        value={newItem.cantidad}
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
                                        value={newItem.precioCompra}
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
                                        value={newItem.precioVenta}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Fecha de Compra</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fechaCompra"
                                        value={newItem.fechaCompra}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Caducidad</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="caducidad"
                                        value={newItem.caducidad}
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

const EditableRow = ({ item, setEditingItem, handleUpdate }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingItem({ ...item, [name]: value });
    };

    return (
        <>
            <td><input type="text" className="form-control" name="idInventario" value={item.idInventario} onChange={handleChange} /></td>
            <td><input type="text" className="form-control" name="idMedicamento" value={item.idMedicamento} onChange={handleChange} /></td>
            <td><input type="text" className="form-control" name="tipo" value={item.tipo} onChange={handleChange} /></td>
            <td><input type="text" className="form-control" name="nombreMedicamento" value={item.nombreMedicamento} onChange={handleChange} /></td>
            <td><input type="text" className="form-control" name="idLaboratorio" value={item.idLaboratorio} onChange={handleChange} /></td>
            <td><input type="number" className="form-control" name="cantidad" value={item.cantidad} onChange={handleChange} /></td>
            <td><input type="number" step="0.01" className="form-control" name="precioCompra" value={item.precioCompra} onChange={handleChange} /></td>
            <td><input type="number" step="0.01" className="form-control" name="precioVenta" value={item.precioVenta} onChange={handleChange} /></td>
            <td><input type="date" className="form-control" name="fechaCompra" value={item.fechaCompra} onChange={handleChange} /></td>
            <td><input type="date" className="form-control" name="caducidad" value={item.caducidad} onChange={handleChange} /></td>
            <td>
                <button className="btn btn-success m-1" onClick={() => handleUpdate(item)}>
                    <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="btn btn-danger m-1" onClick={() => setEditingItem(null)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </td>
        </>
    );
};

const ReadOnlyRow = ({ item, setEditingItem, handleDelete }) => (
    <>
        <td>{item.idInventario}</td>
        <td>{item.idMedicamento}</td>
        <td>{item.tipo}</td>
        <td>{item.nombreMedicamento}</td>
        <td>{item.idLaboratorio}</td>
        <td>{item.cantidad}</td>
        <td>{item.precioCompra}</td>
        <td>{item.precioVenta}</td>
        <td>{item.fechaCompra}</td>
        <td>{item.caducidad}</td>
        <td>
            <button className="btn btn-warning m-1" onClick={() => setEditingItem(item)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-danger m-1" onClick={() => handleDelete(item.idInventario)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </td>
    </>
);
