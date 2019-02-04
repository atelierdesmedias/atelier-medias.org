// Node path utils
const path = require('path');
// File manager
const { Files } = require('@zouloux/files');
// Bundler
const Bundler = require('parcel-bundler');
// Load solid constants
const solidConstants = require('../solid-constants.config');

// ----------------------------------------------------------------------------- OPTIONS

// entry compilation files
// get list of bundle of pre-build bundles file
//const entryFiles = require('../src/*.ts');
const entryFiles = 'src/*.ts';

// parcel Options
const _options = (pEnv) =>
{
	return {

		// Le répertoire out pour mettre les fichiers construits, par défaut dist
		outDir: solidConstants.assetsPath,

		// Le nom du fichier en sortie
		//outFile: '',

		// L'URL du serveur, par défaut 'dist'
		publicUrl: '/',

		// Surveiller les fichiers et les reconstruire lors d'un changement
		// par défaut pour process.env.NODE_ENV !== 'production'
		watch: (pEnv === 'dev'),

		// Active ou non la mise en cache, la valeur par défaut est true
		cache: (pEnv === 'dev'),

		// Le répertoire où le cache est placé, par défaut .cache
		cacheDir: '.cache',

		// Désactive l'inclusion du hachage de contenu sur le nom du fichier
		contentHash: false,

		// Minifie les fichiers, activé par défaut si process.env.NODE_ENV === 'production'
		minify: !(pEnv === 'dev'),

		// Active le flag expérimental de scope hoisting/tree shaking, pour des paquets plus petits en production
		scopeHoist: false,

		// la cible de compilation : browser/node/electron, par défaut browser
		target: 'browser',

		// 3 = Tout consigner,
		// 2 = Consigner les erreurs et les avertissements,
		// 1 = Consigner uniquement les erreurs
		logLevel: 3,

		// Active ou désactive le HMR lors de la surveillance (watch)
		hmr: true,

		// Le port sur lequel la socket HMR (Hot Module Reload) fonctionne,
		// par défaut à un port libre aléatoire (0 dans node.js se traduit en un port libre aléatoire)
		hmrPort: 0,

		// Un nom d'hôte pour le rechargement de module à chaud, par défaut à ''
		hmrHostname: '',

		// Active ou désactive les sourcemaps, par défaut activé (pas encore pris en charge dans les versions minifiées)
		sourceMaps: (pEnv === 'dev'),

		// Afficher un rapport détaillé des paquets, ressources, tailles des fichiers
		// et durées de build, par défaut à false, les rapports ne sont affichés que si le mode watch est désactivé
		detailedReport: false
	}
};

// ----------------------------------------------------------------------------- PUBLIC SCOPE

/**
 * Public API
 */
module.exports = {

	/**
	 * Init & Run parcel bundler
	 */
	run: (pEnv) => new Promise( async resolve =>
	{
		// Clean step
		await require('./task-clean').cleanBundles();

		// Pre-build step
		await require('./task-prebuild').preBuildPhpConfig();
		await require('./task-prebuild').preBuildAtoms();
		// await require('./task-prebuild').preBuildBundleList();
		// await require('./task-prebuild').preBuildFonts();

		// init bundler with entry point & options
		const bundler = new Bundler(entryFiles, _options(pEnv));

		// Deploy step
		// Get properties
		await require('./task-deploy').getPropertiesFromCurrentEnv();
		// Deploy and stop if there is an issue
		await require('./task-deploy').deploy();

		// if dev environnement
		(pEnv === "dev")
			// start dev server
			? await bundler.serve()
			// start bundle without dev server
			: await bundler.bundle();

		// All good
		resolve();
	}),

	/**
	 * Start parcel bundling with dev mode.
	 */
	dev: async () =>
	{
		// Init and run
		await module.exports.run('dev');
		// if no return, make-runnable return "undefined"
		return ''
	},

	/**
	 * Start parcel bundling with production mode.
	 */
	production: async () =>
	{
		// Init with prod overrides
		await module.exports.run('production');
		// if no return, make-runnable return "undefined"
		return ''
	},
};
