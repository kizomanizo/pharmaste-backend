var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
const winston = require('winston')

var usersRouter = require('./routes/users')
var levelsRouter = require('./routes/levels')
var categoriesRouter = require('./routes/categories')
var itemsRouter = require('./routes/items.js')
var clientsRouter = require('./routes/clients.js')
var insurancesRouter = require('./routes/insurances.js')
var ordersRouter = require('./routes/orders.js')

const cors = require('cors')
const { handleError } = require('./helpers/error')
// winston.add(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),)
// winston.add(new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),)

winston.add(
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        json: false,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(i => i.level === 'error' ? `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}` : '')
        )
    })
)

winston.add(
    new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info',
        json: false,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(i => i.level === 'info' ? `${i.level.toUpperCase()}: ${i.timestamp} ${i.message}` : '')
        )
    })
)

var app = express()

// Remove 'X-Powered-By' header from HTTP response headers - Kz
app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors({exposedHeaders: ['x-auth-token']}))
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/levels', levelsRouter)
app.use('/api/v1/categories', categoriesRouter)
app.use('/api/v1/items', itemsRouter)
app.use('/api/v1/clients', clientsRouter)
app.use('/api/v1/insurances', insurancesRouter)
app.use('/api/v1/orders', ordersRouter)
app.use((err, req, res, next) => { handleError(err, res) })

module.exports = app