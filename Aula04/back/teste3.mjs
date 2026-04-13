import pkg from "pg";
const {Pool} = pkg;

const senhas = ['postgres', 'password', '123456', '1234', '12345', 'admin', 'root'];

async function testar() {
    for (const senha of senhas) {
        try {
            const db = new Pool({
                host: 'localhost',
                user: 'postgres',
                password: senha,
                database: 'postgres',
                port: 5432
            });
            
            const result = await db.query('SELECT NOW()');
            console.log('SUCESSO! Senha encontrada: ' + senha);
            await db.end();
            return senha;
        } catch (e) {
            // falhou, próxima
        }
    }
    console.log('Nenhuma senha funcionou');
    return null;
}

testar().then(s => process.exit(s ? 0 : 1));
