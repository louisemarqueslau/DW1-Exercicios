const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());


// conexão com PostgreSQL
const banco = new Pool({

    user: "postgres",
    password: "SUA_SENHA",
    host: "localhost",
    port: 3001,
    database: "NOME_DO_SEU_BANCO"

});


// listar salgados
app.get("/api/salgados", async (req,res)=>{

    try{

        const resultado = await banco.query(
            "SELECT * FROM item_cardapio WHERE id_categoria = 1"
        );


        res.json(resultado.rows);


    }catch(erro){

        console.log(erro);

        res.status(500).json({
            erro:"Erro no banco"
        });

    }

});



// listar doces
app.get("/api/doces", async (req,res)=>{

    try{

        const resultado = await banco.query(
            "SELECT * FROM item_cardapio WHERE id_categoria = 2"
        );


        res.json(resultado.rows);


    }catch(erro){

        console.log(erro);

    }

});



// listar bebidas
app.get("/api/bebidas", async (req,res)=>{

    try{

        const resultado = await banco.query(
            "SELECT * FROM item_cardapio WHERE id_categoria = 3"
        );


        res.json(resultado.rows);


    }catch(erro){

        console.log(erro);

    }

});




app.listen(3001, ()=>{

    console.log("Servidor rodando na porta 3001");

});