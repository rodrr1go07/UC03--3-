export default function FilmeTable({ filmes, onEditar, onExcluir }) {
    return (
        <>
        <section className="table-section">
            <h2>Filmes Cadastrados</h2>
            {filmes.length === 0 ?
                (
                    <p> Nenhum filme cadastrado.</p>
                ) :
                (
                    <table className="filme-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Gênero</th>
                                <th>Ano</th>
                                <th>Imagem</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filmes.map((filme) => (
                                    <tr key={filme.id}>
                                        <td>{filme.id}</td>
                                        <td>{filme.titulo}</td>
                                        <td>{filme.genero}</td>
                                        <td>{filme.ano}</td>
                                        <td>
                                            <img src={filme.imagem_url} alt={filme.titulo} className="thumb-filme"/>
                                            </td>
                                        <td>
                                            <div className="acoes-tabela">
                                                <button onClick={() => onEditar(filme)}>Editar</button>
                                                <button onClick={() => onExcluir(filme.id)}>Excluir</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                )}
     </section>
        </>
    )
}