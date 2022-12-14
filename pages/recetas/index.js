import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Recetas() {
    const [recetas, setRecetas] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [isLoading, setLoading] = useState(true)

    const transformMedIdToName = (id) => {
        const medicamento = medicamentos.find(medicamento => medicamento.cod_medicamento === id);
        return medicamento.descripcion;
    }

    const convertToRut = (rut) => {
        rut = rut.toString();
        let rutWithDash = rut.slice(0, -1) + '-' + rut.slice(-1);
        return rutWithDash;
    }

    const convertToDate = (date) => {
        const day = date.slice(8, 10);
        const month = date.slice(5, 7);
        const year = date.slice(0, 4);
        return `${day}-${month}-${year}`;
    }

    useEffect(() => {
        fetch('/api/recetas')
            .then(res => res.json())
            .then(data => {
                setRecetas(data);
                setMedicamentos(data.map(receta => receta.medicamento));
                setLoading(false);
            }
        );

    }, []); 

    if (isLoading || !medicamentos) return (
        <>
            <div className="text-center">
                <FontAwesomeIcon icon={faSpinner} spin />
            </div>
        </>
    )

    return (
        <>
            <h1>Recetas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">RUT</th>
                        <th scope="col">Medicamento</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Fecha Receta</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recetas.map(receta => (
                        <tr key={receta.cod_receta}>
                            <th scope="row">{receta.cod_receta}</th>
                            <td>{convertToRut(receta.rut_paciente)}</td>
                            <td>{transformMedIdToName(receta.cod_medicamento)}</td>
                            <td>{receta.cantidad}</td>
                            <td>{convertToDate(receta.fecha_receta)}</td>
                            <td>
                                <Link href={`/recetas/${receta.cod_receta}`} className="btn btn-primary">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}