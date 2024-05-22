
import { useParams } from 'react-router-dom';

export const Indicaciones = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Indicaciones</h1>
        Detalles de la medicina {id}
    </div>
  );
};
