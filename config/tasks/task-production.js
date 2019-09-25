const production = () => {
  // PreBuild config
  require('./task-prebuild').preBuildPhpConfig('production');
  // Prebuild dot env
  require('./task-prebuild').preBuildDotEnvConfig();
  // Prebuild Atoms
  require('./task-prebuild').preBuildAtoms();
};

module.exports = production();
