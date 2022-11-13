import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Medicamentos() {
    const [pacientes, setPacientes] = useState([]);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/pacientes')
            .then(res => res.json())
            .then(data => {
                setPacientes(data)
                setLoading(false)
            })
    });
    
    const convertToRut = (rut) => {
        let rutWithDash = rut.slice(0, -1) + '-' + rut.slice(-1);
        return rutWithDash;
    }

    if (isLoading || !pacientes) return (
        <>
            <div className="text-center">
                <FontAwesomeIcon icon={faSpinner} spin />
            </div>
        </>
    )

    return (
        <>
            <h1>Pacientes</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">RUT</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fono</th>
                        <th scope="col">Edad</th>
                        <th scope="col">Diagnostico</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pacientes.map(paciente => (
                        <tr key={paciente.rut}>
                            <th scope="row">{convertToRut(paciente.rut)}</th>
                            <td>{paciente.nombre}</td>
                            <td>{paciente.fono}</td>
                            <td>{paciente.edad}</td>
                            <td>{paciente.diagnostico}</td>
                            <td>
                                <Link href={`/pacientes/${paciente.rut}`} className="btn btn-primary">Ver</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}