const express = require('express');
const os = require('os');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS (Verificação de origem da Servidorina)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota Única: Enviar e Receber Mensagens (POST)
app.post('/api/mensagens', async (req, res) => {
    try {
        const mensagemRecebida = req.body.mensagem;

        if (!mensagemRecebida) {
            return res.status(400).json({ status: "erro", mensagem: "Bilhete vazio!" });
        }

        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`Bilhete recebido da Clientina: ${mensagemRecebida} - ${dataHora}`);

        // REGRA 1: Se for "vacinas"
        if (mensagemRecebida === "vacinas") {

    const result = await pool.query(
        "SELECT * FROM vacina"
    );

    let mensagemResposta = "Histórico de vacinas:\n\n";

    result.rows.forEach(vacina => {
        mensagemResposta +=
            `${vacina.nome_crianca} - ${vacina.nome_vacina}\n`;
    });

    return res.status(200).json({
        status: "sucesso",
        mensagem: mensagemResposta
    });
}

        // REGRA 2: Se for "agendadas"
        else if (mensagemRecebida === "agendadas") {

    const result = await pool.query(
        "SELECT * FROM vacina WHERE status = 'agendada'"
    );

    let mensagemResposta = "Vacinas agendadas:\n\n";

    result.rows.forEach(vacina => {
        mensagemResposta +=
            `${vacina.nome_crianca} - ${vacina.nome_vacina}\n`;
    });

    return res.status(200).json({
        status: "sucesso",
        mensagem: mensagemResposta
    });
}
        // REGRA 3: Se for "atrasadas"
        else if (mensagemRecebida === "atrasadas") {

    const result = await pool.query(`
        SELECT *
        FROM vacina
        WHERE status = 'pendente'
        AND data_vacinacao < CURRENT_DATE
    `);

    let mensagemResposta = "Vacinas atrasadas:\n\n";

    if (result.rows.length === 0) {
        mensagemResposta = "Nenhuma vacina está atrasada.";
    } else {

        result.rows.forEach(vacina => {
            mensagemResposta +=
                `${vacina.nome_crianca} - ${vacina.nome_vacina}\n`;
        });
    }

    return res.status(200).json({
        status: "sucesso",
        mensagem: mensagemResposta
    });
}

            else if (mensagemRecebida === "proxima") {

    const result = await pool.query(`
        SELECT *
        FROM vacina
        WHERE data_vacinacao >= CURRENT_DATE
        ORDER BY data_vacinacao ASC
        LIMIT 1
    `);

    if (result.rows.length === 0) {
        return res.status(200).json({
            status: "sucesso",
            mensagem: "Nenhuma vacinação futura encontrada."
        });
    }

    const vacina = result.rows[0];

    return res.status(200).json({
        status: "sucesso",
        mensagem:
            `Próxima vacinação:\n${vacina.nome_crianca} - ${vacina.nome_vacina} em ${vacina.data_vacinacao}`
    });
}

        // REGRA 4: Qualquer outra palavra
        else {
            return res.status(200).json({
                status: "sucesso",
                mensagem: "mensagem não entendida"
            });
        }

    } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        res.status(500).json({ status: "erro", mensagem: 'Erro interno da Servidorina' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidorina atenta na porta ${port}`);
    console.log(`Rota disponível:`);
    console.log(`  POST http://localhost:${port}/api/mensagens - Enviar Bilhetes`);
    console.log(`\nMensagens disponíveis (possíveis)`);
    console.log(`  "vacinas"    -> Histórico de vacinas`);
    console.log(`  "agendadas"  -> Vacinas agendadas`);
    console.log(`  "atrasadas"  -> Vacinas pendentes`);
    console.log(`  "proxima"    -> Próxima vacinação`);
});

