var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var abi = JSON.parse('[{"constant":false,"inputs":[],"name":"SignCustomer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sign_expert","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sign_customer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"ApproveContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"sign_authority","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"state","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"SignExpert","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"SignAuthority","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"expert","type":"address"},{"name":"customer","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[],"name":"Approve","type":"event"}]');
var SigningContract = web3.eth.contract(abi);
var contractInstance = SigningContract.at('0xb875a44d7f3aa1a33826fd59422567f0648074f5');

var signSpans = ["AuthSignSpan", "ExprSignSpan", "CustSignSpan"];
var addresses = ["addressAuth", "addressExpr", "addressCust"];
var states = ["Created", "Approved", "Executed"];

var a_authority = "0x5e679b12da935c9e65ce57da7285513345774153";
var a_expert = "0x68490c20dfecd72a0e6d5f7346ec3d938d3181b4";
var a_customer = "0xdd29ee1edc96ecf1d9ed4ac086a0403047b6a451";

function signAuthority(address) {
    alert(address + ' tried to sign as Authority.');
	/*contractInstance.SignAuthority.call({from: address}, function(error, value) {
		if(error){
			alert('erreur');
		}
		else{
			alert(value);
		}
	});*/
    if (contractInstance.SignAuthority({from: address})) { switchGlyph("AuthSignSpan"); }
	else{alert('Permission denied');}
	refreshState();
}

function signExpert(address) {
    alert(address + ' tried to sign as Expert.');
    if (contractInstance.SignExpert({from: address})) { switchGlyph("ExprSignSpan"); }
    else { alert('Permission denied'); }
	refreshState();
}

function signCustomer(address) {
    alert(address + ' tried to sign as Customer.');
    if (contractInstance.SignCustomer({from: address})) { switchGlyph("CustSignSpan"); }
    else { alert('Permission denied'); }
	refreshState();
}

function switchGlyph(idSpan) {
    $("#" + idSpan).removeClass("glyphicon-remove text-danger");
    $("#" + idSpan).addClass("glyphicon-ok text-success");
}

function refreshState(){
	var s = contractInstance.state.call(function(error, value) {
			if(value){
				$("#tdState").html(states[value]);
			}
	});
}

function newContract(){alert('new contract on its way');}

var event = contractInstance.Approve();


$(document).ready(function () {
	
	var a = contractInstance.sign_authority.call(function(error, value) {
		if(value) {$("#AuthSignSpan").addClass("glyphicon-ok text-success");}
		else {$("#AuthSignSpan").addClass("glyphicon-remove text-danger");}
	});
	
	var e = contractInstance.sign_expert.call(function(error, value) {
		if(value) {$("#ExprSignSpan").addClass("glyphicon-ok text-success");}
		else {$("#ExprSignSpan").addClass("glyphicon-remove text-danger");}
	});
	
	var c = contractInstance.sign_customer.call(function(error, value) {
		if(value) {$("#CustSignSpan").addClass("glyphicon-ok text-success");}
		else {$("#CustSignSpan").addClass("glyphicon-remove text-danger");}
	});
	
	var s = contractInstance.state.call(function(error, value) {
			if(value){
				$("#tdState").html(states[value]);
			}
	});
	
	event.watch(function(error, result){
	if(!error){
		console.log(result);
		alert(result);
	}
});
	
});