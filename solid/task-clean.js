// Get Files helper for easy Files/Folder manipulating
const { Files } = require('@zouloux/files');

// Load solid constants and parcel config
const solidConstants = require('../solid-constants.config');

module.exports = {

	/**
	 * Clean all caches
	 */
	cleanCaches: () =>
	{
		// Clear cache before each command
		Files.getFolders('.cache').delete();
	},

	/**
	 * Clean compiled bundles and maps
	 */
	cleanBundles: () =>
	{
		// If there is no bundle folder
		if ( solidConstants.assetsPath === '')
		{
			// Then remove only generated bundles securely
			Files.getFiles(`${ solidConstants.assetsPath }*.@(js|map|css)`).delete();
		}

		// Otherwise we can wipe the entire folder
		else Files.getFolders(`${ solidConstants.assetsPath }`).delete();
	},

	/**
	 * Clean compiled resources
	 */
	cleanResources: () =>
	{
		// If there is no resource folder
		( solidConstants.assetsPath === '' )

		// Then remove only generated resources securely
		? Files.getFiles(`${ solidConstants.assetsPath }*.@(woff|woff|eot|ttf|png|jpg|gif)`).delete()

		// Otherwise we can wipe the entire folder
		: Files.getFolders(`$${ solidConstants.assetsPath }`).delete()
	},

	/**
	 * Clean web index if parcel is configured to create an index file
	 */
	cleanWebIndex: () =>
	{
		// Remove compiled html if we have one
		Files.getFiles(`${ solidConstants.distPath }index.html`).delete();
	},

	/**
	 * Remove all FuseBox caches and clean output directories.
	 */
	clean: () =>
	{
		console.log('  → Cleaning ...'.cyan);

		module.exports.cleanCaches();
		module.exports.cleanBundles();
		module.exports.cleanResources();
		module.exports.cleanWebIndex();

		console.log('  → Done !'.green);
	},

}
