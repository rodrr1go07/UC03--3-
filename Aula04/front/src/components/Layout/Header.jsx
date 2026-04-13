import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe, logout } from "../../services/usuarioService";

export default function Header() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const response = await getMe();
                setUsuario(response.data.usuario);
            } catch (error) {
                setUsuario(null);
                console.error(error);
            }
        }
        carregarUsuario();
    }, [location.pathname]);

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        }
        setUsuario(null);
        navigate("/");
    }
    // if(loading) return null;
    return (
        <>
            <header className="header">
                <div className="container header-content">
                    <h1>🎬 Filmes</h1>
                    <nav>
                        <ul className="menu">
                            {/* NÃO LOGADO */}
                            {!usuario && (
                                <li>
                                    <Link to="/"> Login </Link>
                                </li>
                            )}
                            {/* USUÁRIO COMUM */}
                            {usuario && (
                                <>
                                    <li>
                                        <Link to="/filmes">Início</Link>
                                    </li>
                                    <li>
                                        <Link to="/perfil">Perfil</Link>
                                    </li>
                                </>
                            )}
                            {/* ADMIN */}
                            {usuario?.role === "ADMIN" && (
                                <>
                                    <li>
                                        <Link to="/admin">Gerenciar Filmes</Link>
                                    </li>

                                </>
                            )}
                            {/* NOME DO USUÁRIO  */}
                            {usuario && (
                                <li>
                                    👤 {usuario.nome}
                                </li>
                            )}
                            {/* LOGOUT */}
                            {usuario && (
                                <li>
                                    <button onClick={handleLogout}>Sair</button>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )


}