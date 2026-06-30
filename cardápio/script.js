
const enderecoServidor = "localhost";
const porta = "3001";


// função para buscar salgados
async function listarS(){

    try {

        const resposta = await fetch(
            `http://${enderecoServidor}:${porta}/api/salgados`
        );


        const dados = await resposta.json();


        mostrarCardapio(dados);


    } catch(erro){

        console.log("Erro:", erro);

        document.getElementById("resultadoCardapio").innerHTML =
        "❌ Erro ao conectar com servidor";

    }

}



// função para buscar doces
async function listarD(){

    try {

        const resposta = await fetch(
            `http://${enderecoServidor}:${porta}/api/doces`
        );


        const dados = await resposta.json();


        mostrarCardapio(dados);


    } catch(erro){

        console.log("Erro:", erro);

        document.getElementById("resultadoCardapio").innerHTML =
        "❌ Erro ao conectar com servidor";

    }

}



// função para buscar bebidas
async function listarB(){

    try {

        const resposta = await fetch(
            `http://${enderecoServidor}:${porta}/api/bebidas`
        );


        const dados = await resposta.json();


        mostrarCardapio(dados);


    } catch(erro){

        console.log("Erro:", erro);

        document.getElementById("resultadoCardapio").innerHTML =
        "❌ Erro ao conectar com servidor";

    }

}



// mostrar os produtos na tela
function mostrarCardapio(produtos){


    let texto = "";


    produtos.forEach(item => {


        texto += `

        <div class="produto">

            <h3>${item.nome_item}</h3>

            <p>${item.descricao}</p>

            <p>R$ ${item.preco}</p>

        </div>

        `;


    });


    document.getElementById("resultadoCardapio").innerHTML = texto;


}





