import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

export default function Medicamento() {

    const [medicamento, setMedicamento] = useState([]);
    const [isLoading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const { id } = router.query
        fetch(`/api/recetas/${id}`)
            .then(res => res.json())
            .then(data => {
                setMedicamento(data)
                setLoading(false)
            })
    }, [router.query])

    if (isLoading || !medicamento) return (
      <>
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      </>
    )
    return (
      <>
        <h1>{medicamento.descripcion}</h1>
        <p>Formato: {medicamento.formato}</p>
        <p>Stock: {medicamento.stock}</p>
      </>
    )
}