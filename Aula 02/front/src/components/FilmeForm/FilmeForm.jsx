import { useState, useEffect } from "react";

export default function FilmeForm({ onSalvar, filmeEmEdicao, onCancelar }) {
    //definindo as variáveis de estado
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");
    const [ano, setAno] = useState("");
    const [imagemUrl, setImagemUrl] = useState("");

    useEffect(() => {
        if (filmeEmEdicao) {
            setTitulo(filmeEmEdicao.titulo);
            setGenero(filmeEmEdicao.genero);
            setAno(filmeEmEdicao.ano);
            setImagemUrl(filmeEmEdicao.imagem_url);
        } else {
            setTitulo("");
            setGenero("");
            setAno("");
            setImagemUrl("");
        }
    }, [filmeEmEdicao]);

    function handleSubmit(e) {
        e.preventDefault();
        onSalvar({ titulo, genero, ano, imagem_url: imagemUrl });
        setTitulo("");
        setGenero("");
        setAno("");
        setImagemUrl("");
    }

    return (
        <>
            <section className="form-section">
                <h2>{filmeEmEdicao ? "Editar Filme" : "Cadastrar Filme"}</h2>
                <form onSubmit={handleSubmit} className="filme-form">
                    <div className="campo">
                        <label htmlFor="titulo">Título</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="genero">Gênero:</label>
                        <input
                            type="text"
                            value={genero}
                            onChange={(e) => setGenero(e.target.value)}
                            required
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="ano">Ano:</label>
                        <input
                            type="number"
                            value={ano}
                            onChange={(e) => setAno(e.target.value)}
                            required
                        />
                    </div>
                    <div className="campo">
                        <label htmlFor="imagemUrl">URL da imagem:</label>
                        <input
                            type="url"
                            value={imagemUrl}
                            onChange={(e) => setImagemUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="acoes-form">
                        <button type="submit">
                            {filmeEmEdicao ? "Atualizar" : "Cadastrar"}
                        </button>
                        {filmeEmEdicao && (
                            <button onClick={onCancelar} type="button">Cancelar</button>
                        )}
                    </div>
                </form>
            </section>
        </>

    )



}