const dev = () => {
  // Prebuild Atoms
  require('./task-prebuild').preBuildAtoms();
};

module.exports = dev();
