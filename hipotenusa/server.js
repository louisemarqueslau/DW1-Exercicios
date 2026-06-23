const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota POST para receber os catetos, calcular a hipotenusa e retornar o resultado ao cliente
app.post('/calcular-hipotenusa', (req, res) => {
    // req = requisição do cliente, res = resposta do servidor. 
    // O corpo da requisição (req.body) deve conter os catetos x e y em formato JSON.
    // O servidor extrai esses valores, calcula a hipotenusa e retorna o resultado.

    // Utilizando destructuring para capturar os dados do corpo da requisição de forma limpa
    const { x, y } = req.body;

    // Ajustado de "coordenadas" para "catetos" para manter a consistência do termo
    console.log(`Os catetos recebidos foram: (${x}, ${y})`);

    // Realiza o cálculo de Pitágoras usando os valores de x e y recebidos
    const h = Math.hypot(x, y);
    console.log(`O valor da hipotenusa calculada é: ${h}`);

    // Criar o objeto de resposta contendo o resultado do cálculo
    const pacoteComResposta = {
        hipotenusa: h
    };

    // Envia o objeto pacoteComResposta de volta para o cliente em formato JSON
    res.json(pacoteComResposta);
});
// Função para obter o endereço IP local da máquina (ip onde está rodando o servidor)
const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Neste terminal está rodando o Servidor:  http://${ip}:${port}`);
    console.log(`Aqui aparecem mensagens printadas pelo servidor`);
    console.log("");
});