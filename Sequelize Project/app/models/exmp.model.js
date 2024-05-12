module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('students', {
        name: {
            type: DataTypes.STRING
        },
        roll_num: {
            type: DataTypes.INTEGER
        },
        age: {
            type: DataTypes.INTEGER
        },
        address: {
            type: DataTypes.STRING
        }
    }, {
        timestamps:false
    }); 

    return Student;
};