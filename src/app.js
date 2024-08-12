/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');
const [source, destination] = process.argv.slice(2);

function mv(from, to) {
  if (!from || !to) {
    console.error('Usage: node yourScript.js <source> <destination>');
  }

  const fullFromPath = path.resolve(from);
  const fullDestinationPath = path.resolve(to);

  let newPath = fullDestinationPath;

  try {
    const destStat = fs.statSync(fullDestinationPath);

    if (destStat.isDirectory()) {
      newPath = path.join(fullDestinationPath, path.basename(from));
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('Destination path does not exist.');
    } else {
      console.error('Failed to check destination path:', err);
    }
  }

  try {
    fs.renameSync(fullFromPath, newPath);
    console.log('File moved successfully');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('Source path does not exist.');
    } else {
      console.error('Failed to move file:', err);
    }
  }
}

mv(source, destination);

module.exports = {
  mv,
};
