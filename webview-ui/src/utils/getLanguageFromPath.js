"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.getLanguageFromPath = getLanguageFromPath
var extensionToLanguage = {
	// Web technologies
	html: "html",
	htm: "html",
	css: "css",
	js: "javascript",
	jsx: "jsx",
	ts: "typescript",
	tsx: "tsx",
	// Backend languages
	py: "python",
	rb: "ruby",
	php: "php",
	java: "java",
	cs: "csharp",
	go: "go",
	rs: "rust",
	scala: "scala",
	kt: "kotlin",
	swift: "swift",
	// Markup and data
	json: "json",
	xml: "xml",
	yaml: "yaml",
	yml: "yaml",
	md: "markdown",
	csv: "csv",
	// Shell and scripting
	sh: "bash",
	bash: "bash",
	zsh: "bash",
	ps1: "powershell",
	// Configuration
	toml: "toml",
	ini: "ini",
	cfg: "ini",
	conf: "ini",
	// Other
	sql: "sql",
	graphql: "graphql",
	gql: "graphql",
	tex: "latex",
	svg: "svg",
	txt: "text",
	// C-family languages
	c: "c",
	cpp: "cpp",
	h: "c",
	hpp: "cpp",
	// Functional languages
	hs: "haskell",
	lhs: "haskell",
	elm: "elm",
	clj: "clojure",
	cljs: "clojure",
	erl: "erlang",
	ex: "elixir",
	exs: "elixir",
	// Mobile development
	dart: "dart",
	m: "objectivec",
	mm: "objectivec",
	// Game development
	lua: "lua",
	gd: "gdscript", // Godot
	unity: "csharp", // Unity (using C#)
	// Data science and ML
	r: "r",
	jl: "julia",
	ipynb: "jupyter", // Jupyter notebooks
}
// Example usage:
// console.log(getLanguageFromPath('/path/to/file.js')); // Output: javascript
function getLanguageFromPath(path) {
	var _a
	var extension = ((_a = path.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ""
	return extensionToLanguage[extension]
}
