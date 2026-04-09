import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buscarFilmeId } from "../../services/filmeService";
import "./FilmeDetalhePage.css";
export default function FilmeDetalhePage() {
    const { id } = useParams();
    const [filme, setFilme] = useState(null);
    async function carregarFilme() {
        try {
            const response = await buscarFilmeId(id);
            setFilme(response.data.filme);
        } catch (error) {
            console.error("Erro ao buscar o filme", error);
        }
    }
    useEffect(() => {
        carregarFilme();
    }, [id]);

    return (
        <>
            {!filme ?
                <>
                    <main className="detalhe-page">
                        <h2> Não foi possível exibir os dados do filme </h2>
                        <Link to="/" className="botao-voltar">Voltar para Filmes</Link>
                    </main>
                </>
                : (
                    <main className="detalhe-page">
                        <section className="detalhe-filme-section">
                            <article className="detalhe-filme-card">
                                <div className="detalhe-filme-imagem">
                                    <img
                                        src={filme.imagem_url}
                                        alt={filme.titulo}
                                    />
                                </div>
                                <div className="detalhe-filme-conteudo">
                                    <h1>{filme.titulo}</h1>
                                    <p> Gênero: {filme.genero}</p>
                                    <p> Ano: {filme.ano}</p>
                                </div>
                                <Link to="/" className="botao-voltar">Voltar para Filmes</Link>
                            </article>
                        </section>
                    </main>
                )
            }
        </>
    )
}
