// import modules and packages
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// database selection
if (process.env.CYCLIC_DB) {
	sequelize = new Sequelize(process.env.CYCLIC_DB);
} else {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
		host: 'localhost',
		dialect: 'mysql',
		port: 3306
	});
}

// export
module.exports = sequelize;
