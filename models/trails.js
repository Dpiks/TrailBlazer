module.exports = function(sequelize, DataTypes) {
        var Trails = sequelize.define("Trails", {
            trail_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            trail_name: {
                type: DataTypes.STRING,

            }
            description: {
                type: DataTypes.STRING,

            }
            latitude: {
                type: DataTypes.FLOAT,

            }
            longitude: {
                type: DataTypes.FLOAT,

            }
            park_name: {
                type: DataTypes.STRING,

            }

        });
