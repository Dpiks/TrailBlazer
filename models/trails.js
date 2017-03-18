module.exports = function(sequelize, DataTypes) {
    var Trail = sequelize.define("Trail", {
        trail_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trail_name: {
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
        park_name: {
            type: DataTypes.STRING
           

        },
        distance:{
          type:DataTypes.FLOAT
        },       
        url:{
          type:DataTypes.STRING
        }

    }, {
        timestamps: false
    });
    return Trail;
}
