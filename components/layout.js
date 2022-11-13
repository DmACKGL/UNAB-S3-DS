export default function Layout({ children }) {
    return (
        <>
            <main>
                <div className="container">
                    {children}
                </div>
            </main>
        </>
    )
}