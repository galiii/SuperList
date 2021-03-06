var fs 		= require('fs');

var querystring 	= require("querystring");

var passwords = null;
var i = 0;
var lists = []; // for list of task
var itemsLists = [];//for items  list of task
var properitess = {};
var userName=null; //
var sessions 	= {};
var AUTH_KEY 	= "auth";


fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file auth line 14: ' + err);
		return;
	}
	passwords = JSON.parse(data);
	//console.log('read passwords auth line 21: ' +  ++i );   
});


function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}

//first i work with this for understend Json
function propertiesFS(){
console.log("welcome to propertiesFS line 32 in auth.js");
fs.readFile('db/'+ userName +'/properites.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file 29: ' + err);
		return;
	}
	properitess = data;//JSON.parse(data);
	console.log('auth line 40: ' +  ++i );
	});
}
	
function getPropertiesFS(){
propertiesFS();
return properitess;
}
	
//reading what we have in list.json	
function readListFS(){
console.log("welcome to listFS line 54 in auth.js");
//userName = getLoggedIn(cookies);
var data = fs.readFileSync('db/'+ userName +'/lists/list.json', "utf8"); //it's more fast for write and will return null
	lists = JSON.parse(data); //an Object
	console.log("line 54 auth "+   ++i);
}

function getListFS(){
readListFS();
//console.log('auth line 80: ' + lists);
return lists;
}
	
function login(response, parsedUrl, postData){
	//console.log("welcome to login 72 in auth.js "+postData);
	var parsedData = querystring.parse(postData);
	if (isRegistered(parsedData.user, parsedData.password)){
		//here the data base
		userName = parsedData.user; // i need the name of the user for read what inside list and for other thing
		//readListFS(); //we have to much exception so if we we need to login read for security
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*4); //4 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;

		sessions[parsedData.user] = "" + token;
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(AUTH_KEY + "=" + token);	
		
	} 

	else {
		response.writeHead(401, {"Content-Type": "text/plain"});	
	}
	response.end();
}


//i add some problom with him when somthing with the cookie so i change it
function isLoggedIn (cookies){
	var token = cookies[AUTH_KEY];
	var user = cookies["user"];
	//because i don't know how you will run the progrm and you did the cookie four days
	//when i run the program (not in a hidden window we will not get either the name ) 
	//and will not read the file of the list
	userName = user; 
	return (token && user && sessions[user] == token);  //
}


//i have problom with the cookies
function getLoggedIn(cookies){
return cookies["user"];
}

/**

**/

function getAllItems(name){
	for(var i = 0 ; i<lists.length; i++){
	if(lists[i]["name"] === name){
	 //console.log("in auth.js line 179 ",lists[i]["task"]);
	// items = lists[i]["task"];
 //console.log("in auth.js line 181 ",typeof items);	 
		return lists[i]["task"];
	}
	}
	console.log("in auth.js line 185");
	return {};
}




exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn;
exports.getLoggedIn = getLoggedIn;
exports.getListFS = getListFS;
//exports.getPropertiesFS = getPropertiesFS;

exports.getAllItems = getAllItems;


/***
var fs 						= require('fs');
var querystring 	= require("querystring");

var passwords = null;
var sessions 	= {};
var AUTH_KEY 	= "auth";

fs.readFile('db/passwords.json', 'utf8' ,function(err, data){
	if(err){
		console.log('error reading file: ' + err);
		return;
	}
	passwords = JSON.parse(data);
});

function isRegistered(id, password){
	return (id && password && passwords[id] === password);
}


function login(response, parsedUrl, postData){
	
	var parsedData = querystring.parse(postData);

	if (isRegistered(parsedData.user, parsedData.password)){
		var token 	= Math.random();
		var expires = new Date(new Date().getTime() + 1000*60*60*24*4); //4 days 
		var authCookie = AUTH_KEY + "=" + token + "; Path=/; Expires=" + expires;
		var userCookie = "user=" + parsedData.user + "; Path=/; Expires=" + expires;
		sessions[parsedData.user] = "" + token;
		response.setHeader("Set-Cookie", [userCookie, authCookie]);
		response.writeHead(200, {
			"Content-Type": "text/plain"
		});
		response.write(AUTH_KEY + "=" + token);	
	} else {
		response.writeHead(401, {
			"Content-Type": "text/plain"
		});	
	}
	response.end();
}

function isLoggedIn (cookies){
	var token = cookies[AUTH_KEY];
	var user = cookies["user"];
	return (token && user && sessions[user] == token); 
}

function createUser (user, password){
	if (passwords[user]){
		return false;
	}
	passwords[user] = password;
	fs.writeFile('db/passwords.json', JSON.stringify(passwords), 'utf8');
	return true;
}

function getLoggedIn(cookies){
    return cookies["user"];
}

exports.login 			= login;
exports.isLoggedIn 	= isLoggedIn; 
exports.createUser 	= createUser;
exports.getLoggedIn = getLoggedIn;




**/
