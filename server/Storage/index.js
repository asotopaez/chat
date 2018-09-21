var fs = require("fs"),
path = require("path")


var saveData = function(dataType,newData,data){

	var dataPath = dataType == 'users' ? __dirname + path.join('/data/user.json'):
				   __dirname + path.join('/data/messages.json')
	data.current.push(newData)
	return new promise(function(resolver,reject){
		fs.writeFile(dataPath, JSON.stringfy(data), function(err){
			if(err) reject(err)
			resolver("saved")
		})

	})

}


var getData = function(dataType){
	var dataPath = dataType == 'users' ? 
	               __dirname + path.join('/data/user.json'):
				   __dirname + path.join('/data/messages.json')


	return new promise(function(resolver,reject){
		fs.readFile(dataPath, 'utf-8', function(err,readData){
			if(err) reject(err)
			resolver(JSON.parse(readData))
		})

	})	
}


module.exports = {
	saveData: saveData,
	getData : getData
}