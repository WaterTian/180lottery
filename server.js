var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);


server.listen(8000);
console.log('Server listening on port 8000');
console.log('Point your browser to http://localhost:8000');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname));



io.sockets.on('connection', function (socket){

    socket.on('buildSound', function(txt){
        console.log("buildSound");
        createVoice(txt,txt);
    });

});















var fs = require("fs");
var AipSpeechClient = require("./voice/src/AipSpeech.js");

// 设置APPID/AK/SK
var APP_ID = "10197969";
var API_KEY = "6RrY713GwphErqP9t2h1m4Ne";
var SECRET_KEY = "BrOAZ8yztMLW1en0VWXFYB486cZCHVB9";

var voiceClient = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);

var soundNum=0;

function createVoice(txt, name) {
	console.log(txt);
	// 语音合成, 附带合成参数
	voiceClient.text2audio(txt, {
		spd: 3,
		pit: 4,
		per: 3
	}).then(function(result) {
		// console.log('<text2audio>: ' + JSON.stringify(result));
		// 把data数据写入到文件
		fs.writeFileSync('./'+ name + '.mp3', result.data);
		io.sockets.emit('playSound',name);
		
	});
}


