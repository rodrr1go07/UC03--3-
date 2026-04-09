export function autorizarPapeis(...papeisPermitidos){
    return(req, res, next) =>{
        const usuario = req.usuario; // veio do autenticarToken(authMiddleware.js)
        if(!usuario?.role){
            res.status(403).json({msg: "Acesso negado"});
            return;
        }
        const permitido = papeisPermitidos.includes(usuario.role); //(true ou false)
        if(!permitido){
            res.status(403).json({msg: "Acesso negado, você não tem permissão suficiente"});
            return;
        }
        return next();
    }
}