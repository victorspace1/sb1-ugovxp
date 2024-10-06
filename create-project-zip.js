const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.join(__dirname, 'project.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('Project has been zipped successfully.');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

// Add files and directories to the zip
archive.glob('**/*', {
  ignore: [
    'node_modules/**',
    '.svelte-kit/**',
    'build/**',
    '.env',
    '.env.*',
    '!.env.example',
    'vite.config.js.timestamp-*',
    'vite.config.ts.timestamp-*',
    'project.zip'
  ]
});

archive.finalize();