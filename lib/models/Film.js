const { DataTypes, Model } = require('sequelize');
const db = require('../utils/database');

class Film extends Model {}

Film.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        studio: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        released: {
            type: DataTypes.NUMBER,
            allowNull: false
        },
        cast: [{
            role: {
                type: DataTypes.STRING,
            },
            actor: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }],
    },
    { sequelize: db, timestamps: false }
);

module.exports = Film;