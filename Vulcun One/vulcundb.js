var Sequelize = require("sequelize");
var sequelize = new Sequelize("test", "root", "", {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql'
});
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

var user = sequelize.define("user", {
	id: {type: Sequelize.STRING, primaryKey: true},
	full_name: Sequelize.STRING,
	email: Sequelize.STRING, 
	city: Sequelize.STRING
}, {timestamps: false})

sequelize
  .sync({force: true})
  .then(function() {
		var firstNames = ["Fred", "Lisa", "Tim", "John", "Elizabeth", "Mary", "Esteban", "Luke", "Johnny", "Sam", "Jean", "Kimberly", "Steve"];
		var lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson"];
		var cities = ["Tokyo", "Los Angeles", "New York", "Paris", "Vancouver", "Austin", "San Francisco"];
		for(var i = 0; i < 10000000; i++){
			var newUser = user.build({
				id: i,
				full_name: firstNames[Math.floor(Math.random()*firstNames.length)] + " " + lastNames[Math.floor(Math.random()*lastNames.length)],
				email: i + "@email.com",
				city: cities[Math.floor(Math.random()*cities.length)] 
			})
		.save()
		}
  }).then(function(){
 		sequelize.query("select * from users where full_name like '%john%'").then(function(user){
 			for(var i = 0; i < user.length; i++){
 				console.log("user id :"+user[i].id + " " + "name :" + user[i].full_name)
 			}
 		})
  })