import { useState } from "react";
import { login } from "../../services/usuarioService";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

async function handleLogin(e) {
    e.preventDefault();
    try {
        const response = await login({email,senha});
        const usuario = response.data.usuario;
        //redirecionamentos baseados na ROLE
        if(usuario.role === "ADMIN"){
            navigate("/admin");
        }else{
            navigate("/filmes");
        }
    } catch (error) {
        alert("Erro no login");
        console.error(error)
    }
}






    return(
        <>
            <main>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input 
                    type="email"
                    placeholder="Informe seu e-mail"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="Informe sua senha"
                    value={senha}
                    onChange={(e)=> setSenha(e.target.value)}
                    />
                    <button type="submit">Entrar</button>
                </form>
            </main>
        </>
    )


}