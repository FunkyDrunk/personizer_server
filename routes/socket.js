const io = require('../bin/www')


module.exports = io;


const users = require('./userList/sendUsers')
const usersStatus = require('./userList/usersStatus')
const chatUser = require('./chat/getUser')
const sendMessage = require('./chat/sendMessage')
const getMessages = require('./chat/getMessages')
