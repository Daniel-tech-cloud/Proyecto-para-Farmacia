import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../../../style.css';

export const EditableRow = ({ item, setEditingItem, handleUpdate }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingItem({ ...item, [name]: value });
    };

    return (
        <>
            <td>{item.idInventario} </td>
            <td><input type="text" className="form-control" name="tipo" value={item.tipo} onChange={handleChange} /></td>
            <td><input type="text" className="form-control" name="nombreMedicamento" value={item.nombreMedicamento} onChange={handleChange} /></td>
            <td><input type="text" className="form-control" name="idLaboratorio" value={item.Laboratorio.nombre} onChange={handleChange} /></td>
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


