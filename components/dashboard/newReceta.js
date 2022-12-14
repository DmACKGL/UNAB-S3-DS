import { useEffect, useState } from "react";

export default function NewReceta({ medicamentos }) {
    const [medId, setMedId] = useState(0);
    const [stock, setStock] = useState(0);

    const handleMedChange = (e) => {
        setMedId(e.target.value);
        setStock(e.target.options[e.target.selectedIndex].getAttribute('data-stock'));
        document.getElementById('qty').value = 1;
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Nueva Receta</h5>
                    <form action="/api/recetas" method="post">
                        <div className="mb-3">
                            <label htmlFor="rut" className="form-label">RUT</label>
                            <input
                                type="text"
                                className="form-control" 
                                id="rut"
                                aria-describedby="rut"
                                required={true}
                                name="rut_paciente"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Medicamento</label>
                            <select className="form-select" aria-label="Medicamento" name="cod_medicamento" onChange={handleMedChange} defaultValue={'Selecciona un medicamento'} required={true}>
                                {medicamentos.map((medicamento)  => (
                                    medicamento.stock > 0 ? <option key={medicamento.cod_medicamento} value={medicamento.cod_medicamento} data-stock={medicamento.stock}>{medicamento.descripcion}</option> : null
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="qty" className="form-label">Cantidad</label>
                            <input defaultValue={1} name="cantidad" type="number" className="form-control" id="qty" aria-describedby="qty" min={1} max={stock}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Fecha Receta</label>
                            <input type="date" className="form-control" id="date" aria-describedby="date" name="fecha_receta" required={true}/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </form>
                </div>
            </div>
        </>
    )
}