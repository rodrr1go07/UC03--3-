import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import filmeRoutes from "./src/routes/filmeRoutes.js";
import usuarioRoutes from "./src/routes/usuarioRoutes.js";
import db from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
    cors(
        {
            origin: process.env.API_URL_FRONT,
            credentials: true
        }

    )
);
app.use(cookieParser());
app.use("/filmes", filmeRoutes);
app.use("/usuarios", usuarioRoutes);

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Hello World!"});
});

async function inicializarTabelas() {
    await db.query(`
        create table if not exists filmes(
            id serial primary key,
            titulo varchar(150) not null,
            genero varchar(100) not null,
            ano int not null,
            imagem_url text
        );
    `);

    await db.query(`
        create table if not exists usuarios(
            id uuid primary key,
            nome varchar(100) not null,
            email varchar(150) unique not null,
            senha text not null,
            role varchar(20) not null default 'USER',
            criado_em timestamp default current_timestamp
        );
    `);
}

async function iniciarServidor() {
    try {
        await inicializarTabelas();
        app.listen(PORT, ()=>{
            console.log(`http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao inicializar as tabelas do banco:", error.message);
        process.exit(1);
    }
}

iniciarServidor();