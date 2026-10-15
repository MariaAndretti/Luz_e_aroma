
const { Reservas, Produtos } = require("../models");

class reservaController {

    async index(req, res) {
        try {
            const registros = await Reservas.findAll();
            return res.json(registros);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                mensagem: "Erro ao buscar reservas"
            });
        }
    }

    async store(req, res) {
        try {
            const { id_produto, quantidade, data_reserva } = req.body;

            const produto = await Produtos.findByPk(id_produto);

            if (!produto) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            const qtd = Number(quantidade);

            if (!Number.isInteger(qtd) || qtd < 1) {
                return res.status(400).json({
                    mensagem: "Quantidade inválida"
                });
            }

            if (qtd > Number(produto.quantidade)) {
                return res.status(400).json({
                    mensagem: "Quantidade indisponível em estoque"
                });
            }

            const valor_total = Number(
                (Number(produto.preco) * qtd).toFixed(2)
            );

            const reserva = await Reservas.create({
                id_produto,
                quantidade: qtd,
                fragrancia: produto.fragrancia,
                data_reserva,
                valor_total
            });

            return res.status(201).json(reserva);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                mensagem: "Erro ao realizar reserva"
            });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { id_produto, quantidade, data_reserva } = req.body;

            const produto = await Produtos.findByPk(id_produto);

            if (!produto) {
                return res.status(404).json({
                    mensagem: "Produto não encontrado"
                });
            }

            const qtd = Number(quantidade);

            if (!Number.isInteger(qtd) || qtd < 1) {
                return res.status(400).json({
                    mensagem: "Quantidade inválida"
                });
            }

            if (qtd > Number(produto.quantidade)) {
                return res.status(400).json({
                    mensagem: "Quantidade indisponível em estoque"
                });
            }

            const valor_total = Number(
                (Number(produto.preco) * qtd).toFixed(2)
            );

            await Reservas.update(
                {
                    id_produto,
                    quantidade: qtd,
                    fragrancia: produto.fragrancia,
                    data_reserva,
                    valor_total
                },
                {
                    where: { id_reserva: id }
                }
            );

            return res.status(200).json({
                mensagem: "Reserva atualizada com sucesso"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                mensagem: "Erro ao atualizar reserva"
            });
        }
    }

    async destroy(req, res) {
        try {
            const { id } = req.params;

            const reserva = await Reservas.destroy({
                where: { id_reserva: id }
            });

            if (!reserva) {
                return res.status(404).json({
                    mensagem: "Reserva não encontrada"
                });
            }

            return res.status(200).json({
                mensagem: "Reserva excluída com sucesso"
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                mensagem: "Erro ao excluir reserva"
            });
        }
    }
}

module.exports = new reservaController();
