import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faUser
} from '@fortawesome/free-solid-svg-icons';

export default function Medicamento() {
    const [paciente, setPacientes] = useState([]);
    const [isLoading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const { id } = router.query
        if (!id) return;
        fetch(`/api/pacientes/${id}`)
            .then(res => res.json())
            .then(data => {
              setPacientes(data)
                setLoading(false)
            })
    }, [router.query])

    if (isLoading || !paciente) return (
      <>
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </>
    )
    return (
      <>
        <div className="row">
          <div className="col"/>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"><FontAwesomeIcon icon={faUser} /> {paciente.nombre} {paciente.apellido}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{paciente.rut}</h6>
                <p className="card-text">Fono: {paciente.fono}</p>
                <p className="card-text">Edad: {paciente.edad}</p>
                <p className="card-text">Diagnostico: {paciente.diagnostico}</p>
              </div>
            </div>
            <hr/>
          </div>
          <div className="col"/>
        </div>
        
      </>
    )
}