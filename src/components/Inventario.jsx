import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import '../style.css';
import { useNavigate } from 'react-router-dom';

export const Inventario = () => {
    const navigate = useNavigate();
    const [inventario, setInventario] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        nombreMedicamento: '',
        idMedicamento: '', 
        idLaboratorio: '',
        cantidad: '',
        precioCompra: '',
        precioVenta: '',
        fechaCompra: '',
        caducidad: ''
    });

    useEffect(() => {
        fetchInventario();
        fetchMedicamentos();
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

    const fetchMedicamentos = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/events/search/medicamentos/');
            const data = await response.json();
            // Asegúrate de que data.medicamentos es un arreglo
            if (data.ok && Array.isArray(data.medicamentos)) {
                setMedicamentos(data.medicamentos);
            } else {
                setMedicamentos([]);
            }
        } catch (error) {
            console.error('Error fetching medicamentos:', error);
            setMedicamentos([]);
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


    const handleNewMedicament = () =>{
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
                idLaboratorio: selectedMedicamento.laboratorios.id
            });
        } else {
            setNewItem({
                ...newItem,
                nombreMedicamento: selectedNombre,
                idMedicamento: '',  // Manejo del caso cuando no se encuentra el medicamento
                idLaboratorio: ''
            });
        }
        console.log(newItem);
    };
    return (
        <div className="container mt-5">
            <h2 className="mb-4">Inventario</h2>
            <button className="btn btn-primary m-3" onClick={ handleNewMedicament }>
                <FontAwesomeIcon icon={faPlus} /> Agregar nuevo medicamento
            </button>

            <button className="btn btn-primary m-3" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPlus} /> Agregar al inventario
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
                                    <select
                                        className="form-control"
                                        name="nombreMedicamento"
                                        value={newItem.nombreMedicamento}
                                        onChange={handleSelectChange}
                                    >
                                        {medicamentos.map(med => (
                                            <option key={med.id} value={med.nombre}>
                                                {med.nombre}
                                            </option>
                                        ))}

                                    </select>
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
                                        readOnly
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

const ReadOnlyRow = ({ item, setEditingItem, handleDelete }) => (
    <>
        <td>{item.idMedicamento}</td>
        <td>{item.nombreMedicamento}</td>
        <td>{item.idLaboratorio}</td>
        <td>{item.cantidad}</td>
        <td>{item.precioCompra}</td>
        <td>{item.precioVenta}</td>
        <td>{item.fechaCompra}</td>
        <td>{item.caducidad}</td>
        <td>
            <button className="btn btn-primary btn-sm mr-2" onClick={() => setEditingItem(item)}>
                <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.idMedicamento)}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </td>
    </>
);

const EditableRow = ({ item, setEditingItem, handleUpdate }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingItem({ ...item, [name]: value });
    };

    return (
        <>
            <td>{item.idMedicamento}</td>
            <td>
                <input
                    type="text"
                    className="form-control"
                    name="nombreMedicamento"
                    value={item.nombreMedicamento}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="form-control"
                    name="idLaboratorio"
                    value={item.idLaboratorio}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="form-control"
                    name="cantidad"
                    value={item.cantidad}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="form-control"
                    name="precioCompra"
                    value={item.precioCompra}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    className="form-control"
                    name="precioVenta"
                    value={item.precioVenta}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="date"
                    className="form-control"
                    name="fechaCompra"
                    value={item.fechaCompra}
                    onChange={handleChange}
                />
            </td>
            <td>
                <input
                    type="date"
                    className="form-control"
                    name="caducidad"
                    value={item.caducidad}
                    onChange={handleChange}
                />
            </td>
            <td>
                <button className="btn btn-success btn-sm mr-2" onClick={() => handleUpdate(item)}>
                    <FontAwesomeIcon icon={faSave} />
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingItem(null)}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </td>
        </>
    );
};
