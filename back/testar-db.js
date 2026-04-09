import pkg from "pg";
const {Pool} = pkg;

// Tentar sem password
const config = {
    host: "localhost",
    user: "postgres",
    database: "postgres",
    port: 5432
};

// Se não conseguir, adiciona options
const db = new Pool(config);

try {
    const result = await db.query("SELECT NOW()");
    console.log("✓ Conexão bem-sucedida SEM senha (trust auth)");
    console.log("✓ Use no .env: DB_PASSWORD= (deixe em branco)");
    
    // Agora criar database aulas
    try {
        await db.query("CREATE DATABASE aulas");
        console.log("✓ Database 'aulas' criado");
    } catch (e) {
        if (e.message.includes("already exists")) {
            console.log("✓ Database 'aulas' já existe");
        } else {
            throw e;
        }
    }
    
    // Conectar na database aulas e criar tabelas
    const db2 = new Pool({
        host: "localhost",
        user: "postgres",
        database: "aulas",
        port: 5432
    });
    
    await db2.query(`
        CREATE TABLE IF NOT EXISTS usuarios(
            id uuid primary key,
            nome varchar(100) not null,
            email varchar(150) unique not null,
            senha text not null,
            role varchar(20) not null default 'USER',
            criado_em timestamp default current_timestamp
        );
    `);
    console.log("✓ Tabela 'usuarios' criada");
    
    await db2.query(`
        CREATE TABLE IF NOT EXISTS filmes(
            id serial primary key,
            titulo varchar(150) not null,
            genero varchar(100) not null,
            ano int not null,
            imagem_url text
        );
    `);
    console.log("✓ Tabela 'filmes' criada");
    
    await db2.end();
    await db.end();
    
    console.log("\n✓ TUDO PRONTO! Banco de dados configurado com sucesso!");
    process.exit(0);
} catch (error) {
    console.error("✗ Erro:", error.message);
    process.exit(1);
}
