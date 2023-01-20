module.exports = (sequelize, DataTypes) => {
    return sequelize.define('travelplan', {
        destination: DataTypes.STRING,
        departure_date: DataTypes.DATE,
        arrival_date: DataTypes.DATE,
        city: DataTypes.STRING,
        country: DataTypes.STRING,
        type: DataTypes.STRING,
        origin: DataTypes.STRING,
    });
}