const Item = require('../models').Item
const { ErrorHandler } = require("../helpers/error")
const logsHelper = require('../helpers/logger')

async function list() {
    const allItems = await Item.findAll({include: 'category'})
        if (!allItems.length) { throw new ErrorHandler (404, 'Lolz; No items found!.') }
    return allItems
}

async function create(req, _res) {
    const newItem = new Item(req.body);
        newItem.name = req.body.name
        newItem.description = req.body.description
        newItem.purchase_date = req.body.purchase_date
        newItem.expiry_date = req.body.expiry_date
        newItem.buying_price = req.body.buying_price
        newItem.selling_price = req.body.selling_price
        newItem.category_id = req.body.category_id
        newItem.status = true
        newItem.created_by = req.decoded.id
        newItem.updated_by = null
    return newItem.save()
}

async function find(id) {
    const foundItem = await Item.findOne({ where:{id:id}, include: 'category' })
        if(!foundItem) { throw new ErrorHandler(404, 'Yikes, Item not found!') }
    return foundItem
}

async function update(req, id) {
    const updatedItem = await Item.findOne({where:{ id:req.params.id}, include: 'category' })
    if(!updatedItem) { throw new ErrorHandler(404, 'Error: Item not found!') }
    else {
        if  (req.body.name != null ) { updatedItem.name = req.body.name }
        if ( req.body.description != null ) { updatedItem.description = req.body.description }
        if ( req.body.purchase_date != null ) { updatedItem.purchase_date = req.body.purchase_date }
        if ( req.body.expiry_date != null ) { updatedItem.expiry_date = req.body.expiry_date }
        if ( req.body.buying_price != null ) { updatedItem.buying_price = req.body.buying_price }
        if ( req.body.selling_price != null ) { updatedItem.selling_price = req.body.selling_price }
        if ( req.body.category_id != null ) { updatedItem.category_id = req.body.category_id }
        if ( req.body.status != null ) { updatedItem.status = req.body.status }
        updatedItem.updated_by = req.decoded.id
        updatedItem.updated_at = Date()
        await updatedItem.save()
        logsHelper.infoLogger(updatedItem.id, ' item has been updated')
        return updatedItem
    }   
}

 async function remove(id) {
    const itemToRemove = await Item.findOne({where:{id:id}})
    if (!itemToRemove) { throw new ErrorHandler(404, 'Humpty dumpty, Item not Found!.') }
    else {
        logsHelper.infoLogger(itemToRemove.id, ' item has been deleted.')
        return Item.destroy({where:{id:id}})
    }      
}
module.exports = { list, create, find, update, remove, }