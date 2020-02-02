const production = () => {
  // Prebuild Atoms
  require('./task-prebuild').preBuildAtoms();
};

module.exports = production();
