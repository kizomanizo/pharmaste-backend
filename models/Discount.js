'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Discount extends Model {
            static associate(models) {
                Discount.belongsTo(models.OrderItem, { as: 'order_item', foreignKey: 'order_item_id' })
            }
    }
    Discount.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        amount: DataTypes.INTEGER,
        order_item_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Discount',
        tableName: 'discounts',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return Discount
}