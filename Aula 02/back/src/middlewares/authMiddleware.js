import jwt from "jsonwebtoken";

export function autenticarToken(req, res, next){
    //Pegar o header Authorization (formato esperado: "Bearer <token>")
    const autHeader = req.headers["authorization"];
    //Extrair o token do header (reamover "Bearer")
    const tokenHeader = autHeader && autHeader.split(" ")[1];
    // Se não houver token, retorna erro 401 (não autorizado)
    //Tenta pegar do cookie: token = <token>
    const tokenCookie = req.cookies?.token;
    //Usa o que existir
    const token = tokenHeader || tokenCookie;
    if(!token){
        res.status(401).json({msg: "Acesso negado - Token não fornecido."});
        return;
    }
    try {
        //verificar se o token é válido
        const usuario = jwt.verify(token, process.env.JWT_SECRET);
        //adiciona os dados do usuário à requisição
        req.usuario = usuario;
        //continua para a próxima função da rota
        next();
    } catch (error) {
        //se o token for inválido ou está expirado, retorna erro 403(proibido)
        res.status(403).json({msg: "Erro interno autorização", erro: error.message});
    }
}

export function verficarAcesso(req, res, next){
    const usuario = req.usuario;
    const {id} = req.params;
    if(usuario.role === "ADMIN" || usuario.id === id){
        next();
        return 
    }
    return res.status(403).json({msg:"Acesso Negado"});
}
