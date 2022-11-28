import { useRouter } from "next/router"
import Link from 'next/link';
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function Receta() {


  const [receta, setReceta] = useState([]);
  const [paciente, setPaciente] = useState([]);
  const [medicamento, setMedicamento] = useState([]);
  const [isLoading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const { id } = router.query
    if (!id) return;
    fetch(`/api/recetas/${id}`)
      .then(res => res.json())
      .then(data => {
        setPaciente(data.paciente)
        setMedicamento(data.medicamento)
        delete data.paciente
        delete data.medicamento
        setReceta(data)
        setLoading(false)
      })
  }, [router.query])

  if (isLoading || !receta || !paciente || !medicamento) return (
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
              <h5 className="card-title">Codigo: {receta.cod_receta}</h5>
              <h5 className="card-subtitle">Paciente: {paciente.nombre}</h5>
              <h5 className="card-subtitle">Diagnostico: {paciente.diagnostico}</h5>
            </div>
          </div>
          <hr/>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Medicamentos</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item" key={medicamento.cod_medicamento}>
                  <h5 className="card-subtitle">{medicamento.descripcion}</h5>
                  <Link href={`/medicamentos/${medicamento.cod_medicamento}`}>
                    Ver medicamento
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col"/>
      </div>
    </>
  )
}