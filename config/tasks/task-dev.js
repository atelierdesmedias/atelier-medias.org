

const dev = () => {

  // PreBuild config
  // require('./task-prebuild').preBuildPhpConfig("dev");
  // Prebuild dot env
  // require('./task-prebuild').preBuildDotEnvConfig();
  // Prebuild Atoms
  require('./task-prebuild').preBuildAtoms();
};

module.exports = dev();
