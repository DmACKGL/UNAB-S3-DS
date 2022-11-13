export default function Home() {
  return (
    <>
      <div className='row'>
        <div className='col'/>
        <div className='col'>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ingresar</h5>
              <form>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Email</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Clave</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
              </form>
            </div>
          </div>
        </div>
        <div className='col'/>
      </div>
    </>
  )
}
