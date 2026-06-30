CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome_categoria VARCHAR(50) NOT NULL
);


INSERT INTO categoria (nome_categoria)
VALUES ('Salgados');

INSERT INTO categoria (nome_categoria)
VALUES ('Doces');

INSERT INTO categoria (nome_categoria)
VALUES ('Bebidas');

CREATE TABLE item_cardapio (
    id_item SERIAL PRIMARY KEY,
    nome_item VARCHAR(100) NOT NULL,
    descricao VARCHAR(200),
    preco DECIMAL(10,2) NOT NULL,

    id_categoria INT,

    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

INSERT INTO item_cardapio (nome_item, descricao, preco, id_categoria)
VALUES ('Coxinha', 'Frango com catupiry', 7.50, 1);

INSERT INTO item_cardapio (nome_item, descricao, preco, id_categoria)
VALUES ('Empada', 'Empada de frango', 6.00, 1);


INSERT INTO item_cardapio (nome_item, descricao, preco, id_categoria)
VALUES ('Brigadeiro', 'Brigadeiro tradicional', 3.50, 2);

INSERT INTO item_cardapio (nome_item, descricao, preco, id_categoria)
VALUES ('Bolo de chocolate', 'Fatia de bolo', 8.00, 2);


INSERT INTO item_cardapio (nome_item, descricao, preco, id_categoria)
VALUES ('Café', 'Café preto', 4.00, 3);

INSERT INTO item_cardapio (nome_item, descricao, preco, id_categoria)
VALUES ('Suco de laranja', 'Suco natural', 6.00, 3);

