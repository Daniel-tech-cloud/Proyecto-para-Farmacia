import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../../../style.css';

// Function to format date to YYYY-MM-DD
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
};

export const ReadOnlyRow = ({ item, setEditingItem, handleDelete }) => (
    <>
        <td className="text-center">{item.idInventario}</td>
        <td>{item.tipo}</td>
        <td>{item.nombreMedicamento}</td>
        <td>{item.Laboratorio.nombre}</td>
        <td className="text-center">{item.cantidad}</td>
        <td className="text-center">{item.precioCompra}</td>
        <td className="text-center">{item.precioVenta}</td>
        <td className="text-center">{formatDate(item.fechaCompra)}</td>
        <td className="text-center">{formatDate(item.caducidad)}</td>
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

