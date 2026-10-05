CREATE TABLE produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    fragrancia VARCHAR(100)
);

CREATE TABLE reservas (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    quantidade INT NOT NULL,
    fragrancia VARCHAR(255),
    data_reserva DATE,
    id_produto INT NOT NULL
);


SHOW tables;

DESCRIBE produtos;

DELETE FROM produtos;

SELECT * FROM produtos;

DELETE FROM produtos
WHERE id_produto = 2;

UPDATE produtos
SET nome = 'Vela Aromática - Perséfone'
WHERE id_produto = 12;

USE luz_aroma;

ALTER TABLE produtos
ADD COLUMN imagem VARCHAR(255);

DESCRIBE produtos;

USE luz_aroma;

INSERT INTO produtos (nome, preco, quantidade, fragrancia) VALUES
('Vela Aromática - Cristais', 123.41, 10, 'Româ'),
('Vela Aromática - Pumpkin Spice', 123.41, 8, 'Abóbora e Noz Moscada'),
('Vela Aromática - Orange Blossom', 123.41, 12, 'Laranja'),
('Vela Aromática - Bourbon', 123.41, 7, 'Baunilha e Gengibre'),
('Vela Aromática - Apple White', 89.90, 15, 'Maçã e Canela'),
('Vela Perfumada - Lavander Haze', 79.90, 10, 'Lavanda'),
('Vela Perfumada - Strawberry Shortcake', 239.90, 20, 'Morango e Chantilly'),
('Vela Perfumada - Jasmine', 99.90, 9, 'Jasmim'),
('Vela Aromática - Vanilla', 59.90, 18, 'Baunilha'),
('Vela Aromática - LiLis', 59.90, 14, 'Lírios'),
('Vela Aromática Roses', 64.90, 11, 'Rosas'),
('Vela Aromática - Gardenia', 69.90, 13, 'Gardênia');

INSERT INTO produtos (nome, preco, quantidade, fragrancia)
VALUES ('Vela Personalizável', 149.90, 20, 'Personalizada');

UPDATE produtos SET imagem = 'vela1.jpg' WHERE id_produto = 3;
UPDATE produtos SET imagem = 'vela2.jpg' WHERE id_produto = 4;

SELECT id_produto, nome, imagem
FROM produtos;