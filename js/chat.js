 window.onload = function() {
 	CargarMsjs();
 	UltimoMsj();
};

var dv_txts = document.getElementById('id_textos');
var id_mio = 'grcl01';
var token = '';

 
function btn_prueba(){	
	UltimoMsj();
}


function UltimoMsj(){
	dv_txts.scrollTo(0,999999);
}



function CargarMsjs(){

	if(dbjson){
		var textos = document.getElementById('id_textos');	
		textos.innerHTML= '';	
		var Msjs = dbjson[0].Msjs;
		var ls_msjs = '',ls_clss='';
		for(var i = 0; i< Msjs.length ; i++){
			if (Msjs[i][1] == id_mio) { ls_clss = 'msjr'; }
			else{ ls_clss='msjl';}
			var str = '<div id="'+Msjs[i][0]+'" class="'+ls_clss+'"> <i>'+Msjs[i][7]+'</i> </div>';
			ls_msjs = ls_msjs + str;
		}
		textos.innerHTML=ls_msjs;
	}
	else{
		alert("No llegaron los msjs!");
	}
}




function Enviar(){
	var txt_send = document.getElementById('id_txt_send');
	
	/*   Agregamos a la lista */
	if (dbjson) {
		var Msjs = dbjson[0].Msjs;
		var msjt = [];			
		msjt[1] = id_mio;		
		msjt[1] = id_mio;
		msjt[7] = txt_send.value;
		dbjson[0].Msjs.push(msjt);
		CargarMsjs();
		UltimoMsj()
		txt_send.value='';
	}
}


function pulsar(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
    	Enviar();
    	/*
        e.preventDefault();
        var boton = document.getElementById("boton");
        angular.element(boton).triggerHandler('click');
        */
    }
}



function GetTkn(){

	var cad = 'http://192.168.1.40:3003/api_generate_token/';
	var xhr = new XMLHttpRequest();
	xhr.open('POST',cad,true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var myObj = JSON.parse(xhr.response)
			token  = myObj['token'];
			console.log("     >>:.Token: "+token);
		}
	}
	xhr.send(JSON.stringify({ "username":"grcl", "password":"caminando@"}));
}

