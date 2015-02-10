function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}
var codeEditor;
$(function() {
	
	
	var setTheme = function(selectedTheme) {
		$("#theme-selector li").removeClass("active");
		$('#theme-selector li[data-theme="'+ selectedTheme +'"]').addClass("active");
		
		theme = selectedTheme;
		localStorage.setItem("theme", selectedTheme);
		if(codeEditor)
		codeEditor.setOption("theme", theme);
	}

	var port = "";
	var rate = 19200;

	var setPort = function(selectedPort) {
		$("#port-selector li").removeClass("active");
		$('#port-selector li[data-port="'+ selectedPort +'"]').addClass("active");
		
		port = selectedPort;
	}

	var theme = localStorage.getItem("theme");
	if(!theme) theme = "solarized light";
	setTheme(theme);

	//$.get("misc/default_code.txt", function(data) {
		codeEditor = CodeMirror($("#code > div")[0], {
		  //value: data,
		  value: "(accesskey \"u access key\")",
		  mode:  "scheme",
		  theme: theme,
		  indentWithTabs: true,
		  indentUnit: 4,
		  lineNumbers: true
		});
	//});
	$("#connect").click(function(){
		try{
			window.client.end();window.client.destroy();
		}catch(e){}
		try{
			connection($("#iphost").val(),parseInt($("#port").val()))
		}catch(e){}	
		console.log($("#iphost").val() + ":" + $("#port").val() );
	});

	$("#run").click(function(){
		try{
			window.client.write(codeEditor.getValue()+"\n");
		}catch(e){}
		console.log( codeEditor.getValue() );
	});

	$("#theme-selector li").click(function() {
		setTheme($(this).data("theme"));
	});

	$("#port-selector").on('click', 'li', function(){
		setPort($(this).data("port"));
	});

	$("#rate-selector").on('click', 'li', function(){
		$("#rate-selector li").removeClass('active');
		$(this).addClass("active");
		rate = $(this).data("rate");
	});

	$("#serial-terminal .toggle").click(function(){
		$("#serial-terminal").toggleClass("active");
		if($("#serial-terminal").is(".active")) {
			//socket.emit('serial-connect', { rate: 19200, port: port });
		} else {
			//socket.emit('serial-disconnect');
		}
	});
	/*
	socket.on('serial-output', function(data) {
		console.log(data);
		$("#serial-terminal .output").append(data.data + "<i></i>");
	});
	*/

	$("#serial-terminal .input").keydown(function(e) {
		if(e.keyCode == 13) {
			$("#serial-terminal .output").append( $(this).text() + "\n<i></i>");
			try{
				window.client.write($(this).text()+"\n");
			}catch(e){
				console.log(e);
			}
			$(this).text("");
			return false;
		}
	});
});
