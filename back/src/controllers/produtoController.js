const { Produtos } = require("../models")

class produtoController {

    async index(req, res) {
        const registros = await Produtos.findAll();

        return res.json(registros);
    }

    async store(req, res) {
        const { nome, preco, quantidade, fragrancia } = req.body;

        const createdProduto = await Produtos.create({
            nome,
            preco,
            quantidade,
            fragrancia
        });

        return res.status(200).json(createdProduto);
    }

    async update(req, res) {
    const { id } = req.params;
    const { nome, preco, quantidade, fragrancia } = req.body;

    await Produtos.update(
        {
            nome,
            preco,
            quantidade,
            fragrancia
        },
        {
            where: { id_produto: id }
        }
    );

    return res.status(200).json({
        mensagem: "Produto atualizado com sucesso"
    });
}

    async destroy(req, res) {
    const { id } = req.params;

    await Produtos.destroy({
        where: { id_produto: id }
    });

    return res.status(200).json({
        mensagem: "Produto excluido com sucesso"
    });
}
}

module.exports = new produtoController();