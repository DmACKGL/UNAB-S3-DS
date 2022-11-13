import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Medicamentos() {
    const [medicamentos, setMedicamentos] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/medicamentos')
            .then(res => res.json())
            .then(data => {
                setMedicamentos(data)
                setLoading(false)
            })
    }); 

    if (isLoading || !medicamentos) return (
        <>
            <div className="text-center">
                <FontAwesomeIcon icon={faSpinner} spin />
            </div>
        </>
    )

    return (
        <>
            <h1>Medicamentos</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Formato</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.map(medicamento => (
                        <tr key={medicamento.cod_medicamento}>
                            <th scope="row">{medicamento.cod_medicamento}</th>
                            <td>{medicamento.descripcion}</td>
                            <td>{medicamento.formato}</td>
                            <td>{medicamento.stock}</td>
                            <td>
                                <Link href={`/medicamentos/${medicamento.cod_medicamento}`} className="btn btn-primary">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}