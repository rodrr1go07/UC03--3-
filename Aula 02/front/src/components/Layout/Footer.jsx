export default function Footer(){

    return(
        <>
            <footer className="footer">
                <div className="container footer-content">
                    <p>&copy; {new Date().getFullYear()} - Projeto FullStack Filmes</p>
                    <p>React | Node.js | PostgreSQL</p>
                </div>
            </footer>
         </>
    )
}