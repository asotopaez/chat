const bodyParser = require('body-parser'),
	http	   = require('http'),
	express	   = require('express'),

	//Router
	chat = require('./Chat'),
	socketio = require('socket.io'),
	deleteUser = require('./lib')

const port 	   = process.env.PORT || 3000,
	app 	   = express(),
	Server	   = http.createServer(app),
	io		   = socketio(Server)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/chat',chat)
app.use(express.static('public'))


Server.listen(port, () =>{ console.log("Server is running on port:",port) })



//Funcionalidad del chat con socket
io.on('connection', socket =>{
	console.log('new user connected, socket '+ socket.id)

	socket.on('userJoin', user => {
		var userarre = []
		userarre.push(user)
		socket.user = user
		socket.broadcast.emit('userJoin',userarre)
	})

	socket.on('message', message => {
		socket.broadcast.emit('message',message)

	})

	socket.on('disconnect',() =>{
		if(socket.hasOwnProperty('user')){
			deleteUser(socket.user, err, confirm => {
				if(err) throw err
			})
		}
	})
})