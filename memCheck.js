module.exports = async function () {
  const currentPath = process.cwd();
  const dependencies = getDepencies(currentPath);

  for(const dependency of dependencies) {
    gc();
    await sleep(1000);
    const memoryBefore = process.memoryUsage();
    let mod;

    try {
      mod = require(`${currentPath}/node_modules/${dependency.name}`);
    } catch (err) {
      console.log('\x1b[36m', `${dependency.name}`, '\x1b[0m',`${dependency.version}`);
      console.log('\x1b[31m'  ,'\tNot found in node_modules\n', '\x1b[0m');
      continue;
    }

    const memoryAfter = process.memoryUsage();
    console.log('\x1b[36m', `${dependency.name}`, '\x1b[0m' ,`${dependency.version}`);
    console.log('\x1b[35m', `  Resident Set Size:`, '\x1b[33m',`${(memoryAfter.rss - memoryBefore.rss)/1000}`, '\x1b[0m', 'KB');
    console.log('\x1b[35m', `  Heap Total:       `, '\x1b[33m',`${(memoryAfter.heapTotal - memoryBefore.heapTotal)/1000}`, '\x1b[0m', 'KB');
    console.log('\x1b[35m', `  Heap Used:        `, '\x1b[33m',`${(memoryAfter.heapUsed - memoryBefore.heapUsed)/1000}`, '\x1b[0m', 'KB');
    console.log('\x1b[35m', `  External:         `, '\x1b[33m',`${(memoryAfter.external - memoryBefore.external)/1000}`, '\x1b[0m', 'KB');
    console.log('\x1b[35m', `  Array Buffers:    `, '\x1b[33m',`${(memoryAfter.arrayBuffers - memoryBefore.arrayBuffers)/1000}`, '\x1b[0m', 'KB');
    console.log(`\n`);
    mod = null;
    gc();
  }
  

};

function getDepencies(path) {
  const dependencies = [];
  let packageJson;

  try {
    packageJson = require(`${path}/package.json`);
  } catch (err) {
    console.error('Package.json not found');
    return dependencies;
  }

  for(const dependency_name in packageJson.dependencies) {
    dependencies.push({
      name: dependency_name,
      version: packageJson.dependencies[dependency_name]
    });
  }

  return dependencies;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   