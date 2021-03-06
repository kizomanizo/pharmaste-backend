'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.Client, { as: 'client', foreignKey: 'client_id' })
            Order.belongsTo(models.Insurance, { as: 'insurance', foreignKey: 'insurance_id' })
            Order.hasMany(models.OrderItem, { as: 'order_items', foreignKey: 'order_id', onDelete: 'CASCADE', hooks: true })
        }
    }
    Order.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        order_date: DataTypes.DATE,
        client_id: DataTypes.UUID,
        is_insured: DataTypes.BOOLEAN,
        insurance_number: DataTypes.STRING,
        insurance_id: DataTypes.UUID,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Order
}     