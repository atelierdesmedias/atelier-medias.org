const path = require('path');
const paths = require('../global.paths');
const {Files} = require('@zouloux/files');
const {QuickTemplate} = require('../helpers/helper-template');
const colors = require('colors');
const fileTabs = '\t\t\t';
const fileTabRegex = new RegExp(`(\n${fileTabs})`, 'gmi');


// ----------------------------------------------------------------------------- PRIVATE

// define message
const _compileMessage = (pMessage, pDest) => {
  console.log(
    [``, `${pMessage}`.cyan, `→ folder path: ${pDest}`.grey].join('\n')
  );
};

// ----------------------------------------------------------------------------- PULBIC

module.exports = {
  /**
   * Prebuild atoms ts file
   */
  preBuildAtoms: () => {
    const atomsTemplate = atoms =>
      `
			/**
			 * WARNING
			 * Auto-generated file, do not edit !
			 * Data are extracted from all scss files inside atoms/ directory.
			 */
			export const Atoms =
			{\n${atoms}
			};`.replace(fileTabRegex, '\n');

    // Get scss files
    const atomsLessFiles = Files.getFiles(
      `${paths.src}${paths.atomsFolder}*.scss`
    );

    // Generated atoms list
    let atomList = [];

    // Browse less files
    atomsLessFiles.all(lessFile => {
      // Read less file
      const lessContent = Files.getFiles(lessFile).read();

      // Browse lines
      lessContent.split('\n').map(split => {
        // Trim line
        split = split.trim();
        // Get @ index (starting of a new less var)
        const atIndex = split.indexOf('$');
        // If @ is not at first index (we are trimmed), next
        if (atIndex !== 0) return;
        // Get colon index (starting of a value in less)
        const colonIndex = split.indexOf(':');
        // If there is no value on this line, next
        if (colonIndex === -1) return;
        // Get optionnal semi colon index
        const semiIndex = split.indexOf(';');
        // Extract var name and trim it
        const varName = split.substring(atIndex + 1, colonIndex).trim();
        // Extract value and trim it
        const value = split
          .substring(colonIndex + 1, Math.min(split.length, semiIndex))
          .trim();
        // Add this atom
        atomList.push({
          // Var name
          name: varName,
          // Var value add quotes of not already there
          value:
            value.charAt(0) === "'" || value.charAt(0) === '"'
              ? value
              : "'" + value + "'"
        });
      });
    });

    // le path
    let pathFile = `${paths.src}${paths.atomsFolder}${paths.atomsTypescriptFile}`;

    // Write atoms typescript files
    Files.new(pathFile).write(
      atomsTemplate(
        // Add each atom as a new var
        atomList
          .map(atom => {
            return `    "${atom.name}": ${atom.value},`;
          })
          .join('\n')
      )
    );

    _compileMessage('Pre-build atoms file', `${paths.src}${paths.atomsFolder}`);
  }
};
