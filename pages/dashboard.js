import NewReceta from "../components/dashboard/newReceta"
import StatsCard from "../components/dashboard/statsCard"
import { useState, useEffect } from "react"
import Link from "next/link";

export default function Dashboard() {
    // GET /api/medicamentos and pass it to newReceta component

    const [medicamentos, setMedicamentos] = useState([]);

    useEffect(() => {
        fetch('/api/medicamentos')
            .then(res => res.json())
            .then(data => setMedicamentos(data))
    }, []);
    
    return (
        <>
            <div className='row'>
                <div className='col'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Estadisticas</h5>
                            <div className="row">
                                <StatsCard title="Top Medicamento" text="CLONAZEPAM 2 MG" link="/medicamentos/2" linkText="Ver Medicamento" />
                            </div>
                            <div className="row mt-2">
                                <StatsCard title="Top Paciente consumo" text="Juan Perez" link="/client/102002" linkText="Ver Cliente" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-center">Dashboard</h5>
                            <p className="card-text text-center">Bienvenido al dashboard</p>
                            <hr/>
                            <p>Botones de acciones rapidas</p>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button">Recetas</button>
                                <Link href="/pacientes" className="btn btn-primary">Pacientes</Link>
                                <Link href="/medicamentos" className="btn btn-primary">Medicamentos</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    {medicamentos.length > 0 ? <NewReceta medicamentos={medicamentos} /> : <p>Cargando...</p>}
                </div>
            </div>
        </>
    )
}