
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';

// Define directories and files to scan
const SRC_DIR = path.join(process.cwd(), 'src');
const APP_DIR = path.join(SRC_DIR, 'app');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');
const CONFIG_FILE = path.join(SRC_DIR, 'config', 'site.ts');

// Regex to find image paths assigned to src, imageUrl, logoUrl, or in an array of strings
// It looks for paths starting with / and ending with common image extensions.
// Example matches: src="/foo.png", imageUrl: "/bar.jpg", logoUrl: "/baz.svg", "/an/image.webp"
const IMAGE_PATH_REGEX = /(?:src|imageUrl|logoUrl)\s*[:=]\s*["'](\/[^"']+\.(?:png|jpg|jpeg|gif|svg|webp))["']|["'](\/[^"']+\.(?:png|jpg|jpeg|gif|svg|webp))["']/g;

async function findImagePathsInFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    const paths = new Set();
    let match;
    while ((match = IMAGE_PATH_REGEX.exec(content)) !== null) {
      // The actual path could be in capture group 1 or 2
      if (match[1]) paths.add(match[1]);
      if (match[2]) paths.add(match[2]);
    }
    return Array.from(paths);
  } catch (error) {
    console.warn(`Warning: Could not read or parse ${filePath}: ${error.message}`);
    return [];
  }
}

async function main() {
  const allImagePaths = new Set();

  // Scan .tsx files in src/app and src/components
  const tsxFiles = await glob([
    `${APP_DIR}/**/*.tsx`,
    `${COMPONENTS_DIR}/**/*.tsx`
  ], { nodir: true, cwd: process.cwd(), absolute: true });

  for (const file of tsxFiles) {
    const paths = await findImagePathsInFile(file);
    paths.forEach(p => allImagePaths.add(p));
  }

  // Scan config file
  const configPaths = await findImagePathsInFile(CONFIG_FILE);
  configPaths.forEach(p => allImagePaths.add(p));

  if (allImagePaths.size === 0) {
    console.log("No local image paths (starting with '/') found in the specified files.");
    return;
  }

  console.log("Found the following expected local image paths (relative to the 'public' directory):");
  const sortedPaths = Array.from(allImagePaths).sort();
  sortedPaths.forEach(p => console.log(p));

  console.log(`\nTotal unique image paths found: ${sortedPaths.length}`);
  console.log("\nPlease ensure these files exist in your 'public' directory structure.");
}

main().catch(error => {
  console.error("Error running script:", error);
  process.exit(1);
});
