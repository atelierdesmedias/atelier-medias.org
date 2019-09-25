

const dev = () => {

  // PreBuild config
  require('./task-prebuild').preBuildPhpConfig("dev");
  // Prebuild dot env
  require('./task-prebuild').preBuildDotEnvConfig();
  // Prebuild Atoms
  require('./task-prebuild').preBuildAtoms();

  // start webpack
  //logHelper('🚚 Start webpack dev-server');
};

module.exports = dev();
