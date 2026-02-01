const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

const ghostRoot = path.resolve(__dirname, "..");
const previewNodeModules = path.resolve(__dirname, "node_modules");

// Watch the parent ghost library
config.watchFolders = [ghostRoot];

// Resolve node_modules - prioritize preview's node_modules
config.resolver.nodeModulesPaths = [
  previewNodeModules,
  path.resolve(ghostRoot, "node_modules"),
];

// Add extra node modules for the ghost library
config.resolver.extraNodeModules = {
  ghost: path.resolve(ghostRoot, "src"),
  // Force all React-related imports to use preview's versions
  react: path.resolve(previewNodeModules, "react"),
  "react-native": path.resolve(previewNodeModules, "react-native"),
  "react-dom": path.resolve(previewNodeModules, "react-dom"),
};

// Block the parent's node_modules from being resolved for react packages
config.resolver.blockList = [
  new RegExp(`${ghostRoot}/node_modules/react/.*`),
  new RegExp(`${ghostRoot}/node_modules/react-native/.*`),
  new RegExp(`${ghostRoot}/node_modules/react-dom/.*`),
];

module.exports = config;
