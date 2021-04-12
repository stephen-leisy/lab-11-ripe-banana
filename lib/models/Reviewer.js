const { DataTypes, Model } = require('sequelize');
const db = require('../utils/database');

class Reviewer extends Model {}

Reviewer.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { sequelize: db, timestamps: false}
);

module.exports = Reviewer;