module.exports = function(sequelize, DataTypes) {
    var Park = sequelize.define("Park", {
        park_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        park_name: {
            type: DataTypes.STRING,
            allowNull: false

        },
        description: {
            type: DataTypes.TEXT,

        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false           

        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false

        },
        state: {
            type: DataTypes.STRING,
            allowNull: false       

        },
        directions_info:{
          type:DataTypes.TEXT
        },       
        url:{
          type:DataTypes.STRING
        },
        directions_url:{
            type:DataTypes.STRING
        },
        weather_info:{
            type: DataTypes.TEXT,
        }

    }, {
        timestamps: false
    });
    return Park;
}
