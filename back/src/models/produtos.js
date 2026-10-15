'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Produtos extends Model {
        static associate(models) {
        }
    }

    Produtos.init({
        id_produto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: DataTypes.STRING,
        preco: DataTypes.DECIMAL(10, 2),
        quantidade: DataTypes.INTEGER,
        fragrancia: DataTypes.STRING,
        imagem: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Produtos',
        tableName: 'produtos',
        timestamps: false
    });

    return Produtos;
};