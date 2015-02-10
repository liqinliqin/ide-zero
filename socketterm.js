
window.client="";
function connection(HOST,PORT){
	var net = require('net');
	var readline = require('readline');

	window.client = new net.Socket();

	client.connect(PORT, HOST, function() {
	    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	    // 建立连接后立即向服务器发送数据，服务器将收到这些数据 
	});

	client.setNoDelay(true);
	// 为客户端添加“data”事件处理函数
	// data是服务器发回的数据
	client.on('data', function(data) {
		try{
			$("#serial-terminal .output").append(data + "<i></i>");
		}catch(e){}
	});

	// 为客户端添加“close”事件处理函数
	client.on('close', function() {
	    console.log('Connection closed');
	});
}
//connection("127.0.0.1",9999);

