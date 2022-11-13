import Link from "next/link"

export default function StatsCard({ title, text, link, linkText }) {
    return (
        <>
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{text}</p>
                        <Link href={link} className="btn btn-primary">{linkText}</Link>
                    </div>
                </div>
            </div>
        </>
    )
}