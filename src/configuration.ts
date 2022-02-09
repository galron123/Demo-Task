import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';
import { flatten } from 'flat';
import { resolve } from 'path';
import { statSync, readdirSync } from 'fs';

const CONFIG_FILENAME = process.env.CONFIG_FILE || 'config';

export default (): Record<string, any> => {
  return readConfigFiles(CONFIG_FILENAME);
};

function isJsonFile(filePath) {
  return _.endsWith(filePath, '.json');
}

function isYamlFile(filePath) {
  return _.endsWith(filePath, '.yaml') || _.endsWith(filePath, '.yml');
}

function readJson(filePath) {
  const jsonFile = readFile(filePath);
  return JSON.parse(jsonFile);
}

function readYaml(filePath) {
  return yaml.load(readFile(filePath));
}

function readFile(filePath) {
  return readFileSync(filePath, 'utf8');
}

function readConfigFiles(filePaths: string) {
  const paths = detectMultipleConfigFiles(filePaths);

  const configs = [];
  for (const filePath of paths) {
    configs.push(readSingleConfigFile(filePath));
  }
  const mergedConfigJson = mergeConfigs(configs);

  return overrideWithEnvVars(mergedConfigJson);
}

function overrideWithEnvVars(configJson): Record<string, any> {
  const flatJson = flatten(configJson);
  _.entries(flatJson).forEach(([key, value]) => {
    const transformed = _.toUpper(_.snakeCase(key));
    let envValue = value;
    if (transformed in process.env) {
      envValue = process.env[transformed];
      flatJson[key] = envValue;
    } else {
      process.env[transformed] = envValue;
    }
  });

  const newJson = flatten.unflatten(flatJson);
  console.log(newJson);

  return newJson;
}
function detectMultipleConfigFiles(filePaths: string): string[] {
  let detectedPaths;
  if (filePaths.includes(';')) {
    detectedPaths = filePaths.split(';');
  } else if (filePaths.includes('|')) {
    detectedPaths = filePaths.split('|');
  } else {
    detectedPaths = [filePaths];
  }
  detectedPaths = detectedPaths
    .map((path) => (isFolder(path) ? getFilePathsInFolder(path) : path))
    .flat();

  return convertPathsToAbsolute(detectedPaths);
}

function readSingleConfigFile(filePath: any) {
  console.log(`Reading config file from: ${filePath}`);
  let configJson;
  if (isJsonFile(filePath)) {
    configJson = readJson(filePath);
  } else if (isYamlFile(filePath)) {
    configJson = readYaml(filePath);
  }
  return configJson;
}
function mergeConfigs(configs: any[]) {
  let mergedConfig = {};
  for (const config of configs) {
    mergedConfig = {
      ...mergedConfig,
      ...config,
    };
  }
  return mergedConfig;
}
function convertPathsToAbsolute(detectedPaths: string[]): string[] {
  return detectedPaths.map((path) => resolve(path));
}
function isFolder(filePaths: string): boolean {
  const stats = statSync(filePaths);
  return stats.isDirectory();
}
function getFilePathsInFolder(folder: string): string[] {
  const folderPath = resolve(folder);
  console.log(`Reading config files from folder ${folderPath}`);
  const filePaths = readdirSync(folderPath).map((file) => join(folder, file));
  return filePaths;
}
