module.exports = {
	option:{
		separator: '\n'
	},
	dist:{
		src:['app/**/*.js', 'models/**/*.js', 'routes/**/*.js', 'controllers/**/*.js', 'helpers/**/*.js'],
		dest: 'dist/<%= pkg.name %>.js'
	}
}