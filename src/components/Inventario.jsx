import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../style.css';

export const Inventario = () => {
    const [inventario, setInventario] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        nombreMedicamento: '',
        idLaboratorio: '',
        cantidad: '',
        precioCompra: '',
        precioVenta: '',
        fechaCompra: '',
        caducidad: ''
    });

    useEffect(() => {
        fetchInventario();
    }, []);

    const fetchInventario = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/events/inventory/');
            const data = await response.json();
            setInventario(data);
        } catch (error) {
            console.error('Error fetching inventario:', error);
        }
    };

    const handleUpdate = async (item) => {
        try {
            await fetch(`http://localhost:3001/api/events/inventory/${item.idMedicamento}`, {
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
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/api/events/inventory/${id}`, {
                method: 'DELETE',
            });
            fetchInventario();
        } catch (error) {
            console.error('Error deleting inventario:', error);
        }
    };

    const handleAdd = async () => {
        try {
            await fetch('http://localhost:3001/api/events/inventory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            fetchInventario();
            setShowModal(false);
            setNewItem({
                nombreMedicamento: '',
                idLaboratorio: '',
                cantidad: '',
                precioCompra: '',
                precioVenta: '',
                fechaCompra: '',
                caducidad: ''
            });
        } catch (error) {
            console.error('Error adding inventario:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Inventario</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Agregar Medicamento
            </button>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID Medicamento</th>
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
                        <tr key={item.idMedicamento}>
                            {editingItem?.idMedicamento === item.idMedicamento ? (
                                <EditableRow item={editingItem} setEditingItem={setEditingItem} handleUpdate={handleUpdate} />
                            ) : (
                                <ReadOnlyRow item={item} setEditingItem={setEditingItem} handleDelete={handleDelete} />
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
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
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese el nombre del medicamento"
                                        name="nombreMedicamento"
                                        value={newItem.nombreMedicamento}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>ID Laboratorio</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Ingrese el ID del laboratorio"
                                        name="idLaboratorio"
                                        value={newItem.idLaboratorio}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cantidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Ingrese la cantidad"
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
                                        placeholder="Ingrese el precio de compra"
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
                                        placeholder="Ingrese el precio de venta"
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
                                    <label>Fecha de Caducidad</label>
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
                                <FontAwesomeIcon icon={faTimes} /> Cancelar
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>
                                <FontAwesomeIcon icon={faSave} /> Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const EditableRow = ({ item, setEditingItem, handleUpdate }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        handleUpdate(formData);
    };

    return (
        <>
            <td>{item.idMedicamento}</td>
            <td>{item.nombreMedicamento}</td>
            <td>{item.idLaboratorio}</td>
            <td><input name="cantidad" value={formData.cantidad} onChange={handleChange} type="number" className="form-control" /></td>
            <td><input name="precioCompra" value={formData.precioCompra} onChange={handleChange} type="number" step="0.01" className="form-control" /></td>
            <td><input name="precioVenta" value={formData.precioVenta} onChange={handleChange} type="number" step="0.01" className="form-control" /></td>
            <td><input name="fechaCompra" value={formData.fechaCompra.slice(0, 10)} onChange={handleChange} type="date" className="form-control" /></td>
            <td><input name="caducidad" value={formData.caducidad.slice(0, 10)} onChange={handleChange} type="date" className="form-control" /></td>
            <td>
                <button className="btn btn-success me-2" onClick={handleSave}>
                    <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="btn btn-secondary" onClick={() => setEditingItem(null)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </td>
        </>
    );
};

const ReadOnlyRow = ({ item, setEditingItem, handleDelete }) => {
    return (
        <>
            <td>{item.idMedicamento}</td>
            <td>{item.nombreMedicamento}</td>
            <td>{item.idLaboratorio}</td>
            <td>{item.cantidad}</td>
            <td>{item.precioCompra.toFixed(2)}</td>
            <td>{item.precioVenta.toFixed(2)}</td>
            <td>{item.fechaCompra.slice(0, 10)}</td>
            <td>{item.caducidad.slice(0, 10)}</td>
            <td>
                <button className="btn btn-warning me-2" onClick={() => setEditingItem(item)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(item.idMedicamento)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </td>
        </>
    );
};