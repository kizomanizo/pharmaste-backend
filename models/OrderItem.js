'use strict'
const { Model, DatabaseError } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Order, { as: 'order', foreignKey: 'order_id' })
            OrderItem.belongsTo(models.Item, { as: 'item', foreignKey: 'item_id' })
            OrderItem.hasOne(models.Discount, { as: 'discount', foreignKey: 'order_item_id', onDelete: 'CASCADE', hooks: true })
            OrderItem.hasOne(models.Debt, { as: 'debt', foreignKey: 'order_item_id', onDelete: 'CASCADE', hooks: true })
        }
    }
    OrderItem.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        quantity: DataTypes.INTEGER,
        paid_price: DataTypes.INTEGER,
        order_id: DataTypes.UUID,
        item_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'order_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return OrderItem
}