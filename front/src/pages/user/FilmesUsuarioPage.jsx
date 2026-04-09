import { useEffect, useState } from "react";
import FilmeList from "../../components/FilmeList/FilmeList";
import { listarFilmes } from "../../services/filmeService";
import "./FilmesUsuarioPage.css";


export default function FilmesUsuarioPage() {
    const [filmes, setFilmes] = useState([]);
    const [busca, setBusca] = useState("");
    const [ordenacao, setOrdenacao] = useState("");
    const [novaOrdenacao, setNovaOrdenacao] = useState({ campo: "", direcao: "asc" });

    async function carregarFilmes() {
        try {
            const response = await listarFilmes();
            setFilmes(response.data.filmes);
        } catch (error) {
            console.error("Erro interno ao carregar filmes:", error);
        }
    }
    useEffect(() => {
        carregarFilmes();
    }, []);
    //Filtro de busca
    const filmesFiltrados = filmes.filter((filme) =>
        filme.titulo.toLowerCase().includes(busca.toLowerCase())
    );
    const filmesOrdenados = [...filmesFiltrados].sort((a, b) => {
        if (ordenacao === "titulo-asc") {
            return a.titulo.localeCompare(b.titulo);
        }
        if (ordenacao === "titulo-desc") {
            return b.titulo.localeCompare(a.titulo);
        }
        if (ordenacao === "genero-asc") {
            return a.genero.localeCompare(b.genero);
        }
        if (ordenacao === "genero-desc") {
            return b.genero.localeCompare(a.genero);
        }
        if (ordenacao === "ano-asc") {
            return a.ano - b.ano;
        }
        if (ordenacao === "ano-desc") {
            return b.ano - a.ano;
        }
        return 0;
    })

    function alternarOrdenacao(campo) {
        setNovaOrdenacao((prev) => {
            if (prev.campo === campo) {
                return {
                    campo,
                    direcao: prev.direcao === "asc" ? "desc" : "asc"
                }
            }
            return {
                campo,
                direcao: "asc"
            }
        })
    }

    const filmesOrdenados2 = [...filmesFiltrados].sort((a, b) => {
        if (novaOrdenacao.campo === "titulo") {
            return novaOrdenacao.direcao === "asc" ?
                a.titulo.localeCompare(b.titulo) :
                b.titulo.localeCompare(a.titulo)
        }
        if (novaOrdenacao.campo === "genero") {
            return novaOrdenacao.direcao === "asc" ?
                a.genero.localeCompare(b.genero) :
                b.genero.localeCompare(a.genero)
        }
        if (novaOrdenacao.campo === "ano") {
            return novaOrdenacao.direcao === "asc" ?
                a.ano - b.ano :
                b.ano - a.ano
        }
        return 0;
    })

    return (
        <>
            <main className="usuario-container">
                <section className="cabecalho-usuario">
                    <h1>Catálogo de Filmes</h1>
                    <p>Confira os filmes disponíveis no catálogo.</p>
                    <div className="filtros-container">
                        <div className="busca-box">
                            <input
                                type="text"
                                value={busca}
                                placeholder="Buscar filme..."
                                onChange={(e) => setBusca(e.target.value)}
                            />
                        </div>
                        <div className="ordenacao-botoes">
                            {/* <button className={ordenacao === "titulo-asc" ? "ativo" : ""} onClick={() => setOrdenacao("titulo-asc")}>
                                Título A-Z
                            </button>
                            <button className={ordenacao === "titulo-desc" ? "ativo" : ""} onClick={() => setOrdenacao("titulo-desc")}>
                                Título Z-A
                            </button>
                            <button className={ordenacao === "genero-asc" ? "ativo" : ""} onClick={() => setOrdenacao("genero-asc")}>
                                Gênero A-Z
                            </button>
                            <button className={ordenacao === "genero-desc" ? "ativo" : ""} onClick={() => setOrdenacao("genero-desc")}>
                                Gênero Z-A
                            </button>
                            <button className={ordenacao === "ano-asc" ? "ativo" : ""} onClick={() => setOrdenacao("ano-asc")}>
                                Ano ↑
                            </button>
                            <button className={ordenacao === "ano-desc" ? "ativo" : ""} onClick={() => setOrdenacao("ano-desc")}>
                                Ano ↓
                            </button>
                             <button className="" onClick={() => setOrdenacao("")}>
                                Limpar
                            </button> */}
                            {/* novos botões dinâmicos */}
                            <button className={novaOrdenacao.campo === "titulo" ? "ativo" : ""} onClick={() => alternarOrdenacao("titulo")}>
                                Título{" "}
                                {
                                    novaOrdenacao.campo === "titulo" &&
                                    (novaOrdenacao.direcao === "asc" ? "↑" : "↓")
                                }
                            </button>
                            <button className={novaOrdenacao.campo === "genero" ? "ativo" : ""} onClick={() => alternarOrdenacao("genero")}>
                                Gênero{" "}
                                {
                                    novaOrdenacao.campo === "genero" &&
                                    (novaOrdenacao.direcao === "asc" ? "↑" : "↓")
                                }
                            </button>
                            <button className={novaOrdenacao.campo === "ano" ? "ativo" : ""} onClick={() => alternarOrdenacao("ano")}>
                                Ano{" "}
                                {
                                    novaOrdenacao.campo === "ano" &&
                                    (novaOrdenacao.direcao === "asc" ? "↑" : "↓")
                                }
                            </button>
                            <button className="" onClick={() => setNovaOrdenacao({ campo: "", direcao: "asc" })}>
                                Limpar
                            </button>
                        </div>
                    </div>
                </section>
                <FilmeList filmes={filmesOrdenados2} />
            </main>
        </>
    )


}