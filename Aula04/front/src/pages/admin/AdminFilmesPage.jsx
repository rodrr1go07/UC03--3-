import { useEffect, useState } from "react";
import FilmeTable from "../../components/FilmeTable/FilmeTable";
import FilmeForm from "../../components/FilmeForm/FilmeForm";
import {
    listarFilmes, criarFilme,
    atualizarFilme, deletarFilme,
    buscarFilmeId
} from "../../services/filmeService";
import "./AdminFilmesPage.css";

export default function AdminFilmesPage() {
    const [filmes, setFilmes] = useState([]);
    const [filmeEmEdicao, setFilmeEmEdicao] = useState(null);

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
    }, [])
    async function salvarFilme(dados) {
        try {
            if (filmeEmEdicao) {
                await atualizarFilme(filmeEmEdicao.id, dados);
                setFilmeEmEdicao(null);
            } else {
                await criarFilme(dados);
            }
            await carregarFilmes();
        } catch (error) {
            console.error("Erro ao salvar o filme", error);
        }
    }
    async function excluirFilme(id) {
        try {
            await deletarFilme(id);
            await carregarFilmes();
        } catch (error) {
            console.error("Erro ao deletar o filme", error);
        }
    }
    function editarFilme(filme) {
        setFilmeEmEdicao(filme);
    }
    function cancelarEdicao() {
        setFilmeEmEdicao(null);
    }
    return (
        <>
            <main className="container">
                <section className="cabecalho-admin">
                    <h1> Admistração de Filmes</h1>
                    <p>Cadastre, edite e exclua filme do catálogo.</p>
                </section>
                <FilmeForm
                    onSalvar={salvarFilme}
                    filmeEmEdicao={filmeEmEdicao}
                    onCancelar={cancelarEdicao}
                />
                <FilmeTable
                    filmes={filmes}
                    onEditar={editarFilme}
                    onExcluir={excluirFilme}
                />
            </main>

        </>

    )

}