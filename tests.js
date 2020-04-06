const fetch = require('node-fetch');

const requestSite = (site) => {
  const start = new Date().getTime();
  return fetch(site).then((res) => {
    const end = new Date().getTime();
    return end - start;
  });
}

const testSingleSite = (i, pkg) => {
  const tasks = [];
  for (let j = 0; j < pkg.iter; j++) {
    tasks.push(requestSite(pkg.data[i]));
  }
  return Promise.all(tasks)
  .then((res) => {
    const maxRes = Math.max(...res);
    const minRes = Math.min(...res);
    const sum = res.reduce((previous, current) => current += previous);
    const avg = sum / res.length;
    return {
      site: pkg.data[i],
      iter: pkg.iter,
      maxRes: maxRes,
      minRes: minRes,
      avg: avg,
    };
  });
}

const processTest = (pkg) => {
  const testStart = new Date().getTime();
  const tasks = [];
  for (let i = 0; i < pkg.data.length; i++) {
    tasks.push(testSingleSite(i, pkg));
  }
  return Promise.all(tasks)
  .then((res) => {
    const testEnd = new Date().getTime();
    res.testStart = testStart;
    res.testEnd = testEnd;
    return res;
  });
}

exports.processTest = processTest;