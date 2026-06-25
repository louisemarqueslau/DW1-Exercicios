let carrinho = [];

let total = 0;

let hoje = new Date();

let ano = hoje.getFullYear();

let mes = String(hoje.getMonth() + 1).padStart(2, "0");

let dia = String(hoje.getDate()).padStart(2, "0");


let dataAtual = `${ano}-${mes}-${dia}`;


document.getElementById("data").min = dataAtual;

function adicionarCarrinho(nome, preco) {


    carrinho.push({

        nome: nome,

        preco: preco

    });



    total += preco;


    mostrarCarrinho();

}



function mostrarCarrinho(){


    let lista = document.getElementById("listaCarrinho");


    lista.innerHTML = "";


    carrinho.forEach(function(item, index){


        let li = document.createElement("li");


        li.innerHTML = 
        item.nome + 
        " - R$ " + item.preco +
        ` <button onclick="removerCarrinho(${index})">
            ❌ Remover
          </button>`;


        lista.appendChild(li);


    });



    document.getElementById("total").innerHTML = total;


}

function removerCarrinho(index){


    total -= carrinho[index].preco;


    carrinho.splice(index, 1);


    mostrarCarrinho();


}

document
.getElementById("formPedido")
.addEventListener("submit", function(event){


    event.preventDefault();
    let botao = document.getElementById("botaoEnviar");

botao.disabled = true;

botao.innerHTML = "Enviando...";


    let pedido = {


        nome:
        document.getElementById("nome").value,


        email:
        document.getElementById("email").value,


        telefone:
        document.getElementById("telefone").value,


        data:
        document.getElementById("data").value,


        produtos:carrinho


    };



    fetch("http://localhost:3000/pedido", {


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify(pedido)


    })



    .then(resposta => resposta.json())


    .then(dados=>{


        document.getElementById("resposta").innerHTML =
        dados.mensagem;


    });


});

function finalizarPedido(){

    if(carrinho.length === 0){

        alert("Seu carrinho está vazio!");

        return;

    }


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    localStorage.setItem(
        "total",
        total
    );


    window.location.href = "finalizar.html";

}