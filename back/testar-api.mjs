// Teste dos endpoints de login e criar usuário
const BASE_URL = "http://localhost:3000";

async function testarAPi() {
    console.log("🧪 Testando API de Usuários...\n");
    
    try {
        // 1. Criar usuário
        console.log("1️⃣ Criando usuário...");
        const criarResp = await fetch(`${BASE_URL}/usuarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: "João Silva",
                email: "joao@email.com",
                senha: "123456"
            })
        });
        const criarData = await criarResp.json();
        console.log(`Status: ${criarResp.status}`);
        console.log(`Resposta:`, criarData);
        console.log();
        
        // 2. Login
        console.log("2️⃣ Fazendo login...");
        const loginResp = await fetch(`${BASE_URL}/usuarios/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "joao@email.com",
                senha: "123456"
            })
        });
        const loginData = await loginResp.json();
        console.log(`Status: ${loginResp.status}`);
        console.log(`Resposta:`, loginData);
        console.log();
        
        // 3. Obter dados do usuário logado
        if (loginData.token) {
            console.log("3️⃣ Obtendo dados do usuário logado...");
            const meResp = await fetch(`${BASE_URL}/usuarios/me`, {
                headers: { "Authorization": `Bearer ${loginData.token}` }
            });
            const meData = await meResp.json();
            console.log(`Status: ${meResp.status}`);
            console.log(`Resposta:`, meData);
            console.log();
        }
        
        // 4. Logout
        console.log("4️⃣ Fazendo logout...");
        const logoutResp = await fetch(`${BASE_URL}/usuarios/logout`, {
            method: "POST"
        });
        const logoutData = await logoutResp.json();
        console.log(`Status: ${logoutResp.status}`);
        console.log(`Resposta:`, logoutData);
        console.log();
        
        console.log("✅ Testes concluídos!");
    } catch (error) {
        console.error("❌ Erro:", error.message);
    }
}

testarAPi();
