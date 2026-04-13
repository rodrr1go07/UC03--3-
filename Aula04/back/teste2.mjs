import pkg from 'pg';
const {Pool} = pkg;

const senhas = ['postgres', 'password', '123456', '1234', '12345', 'admin', 'root', 'localhost'];

async function testar() {
    for (const senha of senhas) {
        try {
            const db = new Pool({
                host: 'localhost',
                user: 'postgres',
                password: senha,
                database: 'postgres',
                port: 5432,
                statement_timeout: 5000
            });
            
            const result = await db.query('SELECT NOW()');
            console.log(✓ SUCESSO! Senha: '${senha}');
            console.log('Use no .env: DB_PASSWORD=');
            await db.end();
            process.exit(0);
        } catch (e) {
            // silent
        }
    }
    console.log('Nenhuma senha funcionou');
    process.exit(1);
}

testar();
