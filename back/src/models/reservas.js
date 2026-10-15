
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Reservas extends Model {
        static associate(models) {
        }
    }

    Reservas.init({
        id_reserva: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantidade: DataTypes.INTEGER,
        fragrancia: DataTypes.STRING,
        data_reserva: DataTypes.DATE,
        id_produto: DataTypes.INTEGER,
        valor_total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Reservas',
        tableName: 'reservas',
        timestamps: false
    });

    return Reservas;
};
