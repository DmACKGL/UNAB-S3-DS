import Link from "next/link";

export default function Nav() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mt-1 mb-4 shadow">
                <div className="container-fluid">
                    <Link href={`/`} className="navbar-brand">
                        Farmacia
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href={`/`} className="nav-link active" aria-current="page">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href={`/dashboard`} className="nav-link active" aria-current="page">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}