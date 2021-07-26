module.exports = {
	presets: [
		"@babel/preset-env"
	],
	plugins: [
		"@babel/plugin-transform-runtime",
		"@babel/plugin-proposal-class-properties",
		'@babel/plugin-proposal-optional-chaining',// 可选链
		'@babel/plugin-proposal-nullish-coalescing-operator'//双问号
	],
	sourceType: 'unambiguous'
}