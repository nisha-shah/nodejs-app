var mysql= require("mysql");
var util = require("util");
 
exports.index = function(req, res){
  res.render('index');
};

exports.register = function(req, res){
  res.render('registration');
};

exports.authUser = function(req, res){
  res.render('successLogin');
};

/*  Register New User */
exports.registerUser = function(req, res) {
	// set the connection string 
	var connection = mysql.createConnection({
		host : "127.0.0.1",
		user : 'root',
		password : 'root',
		database : 'webdesignassignments',
	});
	
	// Get form values from request param 
	var fname = req.param("fname");
	var lname = req.param("lname");
	var email = req.param("email") ;
	var uname = req.param("uname") ;
	var password = req.param("pwd") ;

	connection.connect(function(err){
		if(err){
			console.log("Error "+err);
		}
	});
	var stringQuery = util.format('insert into user values(null,"%s","%s","%s","%s","%s")',fname,lname,email,uname,password);
	connection.query(stringQuery,function(err,result){
		if(err){
		console.log(err);
		}else {
			res.render('successLogin');
		}
		 connection.destroy();
	});	
};


/* Authenticate User */
exports.authenticateUser = function(req, res) {
	// set the connection string 
	var connection = mysql.createConnection({
		host : "127.0.0.1",
		user : 'root',
		password : 'root',
		database : 'webdesignassignments',
	});
	// Get form values from request param
	var uname = req.param("uname");
	var pwd = req.param("pwd");

	//Submit to the DB
	connection.connect(function(err){
		if(err){
			console.log("Error "+err);
		}
	});

	var stringQuery = util.format("select * from user where uname='%s' and password='%s'",uname,pwd);
	connection.query(stringQuery,function(err,result){
		if(err){
		console.log("Error is : "+err);
		}else{
			//console.log("Result user id is "+result[0]['userId']);
			if(result[0]!=null){
				res.render("successLogin");
			}else{
				res.render("index");
			}
		}
		 connection.destroy();
	});		
};

