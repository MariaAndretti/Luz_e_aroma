const { Reservas } = require("../models")

class reservaController {
    
    async index(req, res) {
        const registros = await Reservas.findAll();
        
        return res.json(registros);
    }
    
    async store(req, res) {
        const { id_produto, quantidade, fragrancia, data_reserva } = req.body;
        
        const createdReserva = await Reservas.create({
            id_produto,
            quantidade,
            fragrancia,
            data_reserva
        });
        
        return res.status(200).json(createdReserva);
    }
    
    async update(req, res) {
        const { id } = req.params;
        const { id_produto, quantidade, fragrancia, data_reserva } = req.body;
        
        await Reservas.update(
            {
                id_produto,
                quantidade,
                fragrancia,
                data_reserva
            },
            {
                where: { id_reserva: id }
            }
        );
        
        return res.status(200).json({
            mensagem: "Reserva atualizada com sucesso"
        });
    }
    
    async destroy(req, res) {
        const { id } = req.params;
        
        await Reservas.destroy({
            where: { id_reserva: id }
        });
        
        return res.status(200).json({
            mensagem: "Reserva excluída com sucesso"
        });
    }
}

module.exports = new reservaController();