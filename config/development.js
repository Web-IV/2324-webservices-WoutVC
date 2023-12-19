module.exports = {
	log: {
		level: 'silly',
		disabled: false,
	},
	
	cors: {
		origins: ['http://localhost:3000'],
		maxAge: 3 * 60 * 60,
	},

	 database: {
		client: 'mysql2',
		host: 'vichogent.be',
		port: 40043,
		name: '181098wv',
		username: '181098wv',
		password: 'NM36BKtbGTtzQJMTwO6l',
	},

    /*database: {
		client: 'mysql2',
		host: 'localhost',
		port: 3306,
		name: 'frontweb',
		username: 'root',
		password: 'root123',
	},*/
};