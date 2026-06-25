const express = require("express");

const cors = require("cors");


const app = express();



app.use(cors());

app.use(express.json());



app.post("/pedido", (req,res)=>{


    const pedido = req.body;



    console.log("Novo pedido:");

    console.log(pedido);



    res.json({

        mensagem:
        "Pedido recebido com sucesso 🌷"

    });



});



app.listen(3000, ()=>{


    console.log(
    "Servidor rodando na porta 3000"
    );


});