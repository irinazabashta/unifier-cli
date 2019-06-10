import * as path from 'path';

interface FsExtra {
  __setMockFiles: (newMockFiles: any) => void;
  readdirSync: (directoryPath: any) => void;
}

const fs: FsExtra = jest.genMockFromModule('fs-extra');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    if (newMockFiles.hasOwnProperty(file)) {
      const dir = path.dirname(file);

      if (!mockFiles[dir]) {
        mockFiles[dir] = [];
      }
      mockFiles[dir].push(path.basename(file));
    }
  }
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;

module.exports = fs;