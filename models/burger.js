module.exports = function(sequelize, DataTypes){
	var Trails = sequelize.define("trail", {
		burger_name: DataTypes.STRING, 
		devoured: DataTypes.BOOLEAN,
	});
	return Burger;
}