import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function Medicamentos() {
    // get medicamentos and display them as table
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
                    </tr>
                </thead>
                <tbody>
                    {medicamentos.map(medicamento => (
                        <tr key={medicamento.cod_medicamento}>
                            <th scope="row">{medicamento.cod_medicamento}</th>
                            <td>{medicamento.descripcion}</td>
                            <td>{medicamento.formato}</td>
                            <td>{medicamento.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}