import { useEffect, useState } from "react";
import {Navigate}  from "react-router-dom"
import { getMe } from "../services/usuarioService";

export default function PrivateRoute({children, role}){
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(null);
    
    async function verificar() {
        try {
            const response = await getMe();
            setUsuario(response.data.usuario);
        } catch (error) {
             console.error("Erro ao buscar os dados do user", error);   
             setUsuario(null); 
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        verificar();
    },[]);

    if(loading) return <p>Carregando...</p>
    if(!usuario) return <Navigate to="/" />
    if(role && usuario.role !== role) return <Navigate to="/filmes" replace />

    return children;
    
}