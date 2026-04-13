import { Link } from "react-router-dom";
export default function FilmeCard({filme}){
    return(
        <>
            <article className="filme-card">
                    <img
                    src={filme.imagem_url} 
                    alt={filme.titulo}
                    className="filme-card-imagem"
                    />
                    <div className="filme-card-conteudo">
                        <h2>{filme.titulo}</h2>
                        <p>Gênero: {filme.genero}</p>
                        <p>Ano: {filme.ano}</p>
                    </div>
                    <Link className="filme-card-link" to={`/filmes/${filme.id}`}>
                        Ver detalhes
                    </Link>
            </article>
        </>
    )
}