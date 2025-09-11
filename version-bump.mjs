import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'process';

// Get new version from command line arguments
const newVersion = process.argv[2];

if (!newVersion) {
  console.error('Please provide a version number');
  exit(1);
}

// Update manifest.json
const manifestPath = './manifest.json';
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
manifest.version = newVersion;
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

// Update package.json
const packagePath = './package.json';
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
packageJson.version = newVersion;
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

// Update versions.json (create if doesn't exist)
const versionsPath = './versions.json';
let versions = {};
try {
  versions = JSON.parse(readFileSync(versionsPath, 'utf8'));
} catch (err) {
  // File doesn't exist, will create new one
}
versions[newVersion] = manifest.minAppVersion;
writeFileSync(versionsPath, JSON.stringify(versions, null, 2));

console.log(`Updated to version ${newVersion}`);