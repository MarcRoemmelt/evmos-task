module.exports = {
  'package.json': ['fixpack'],
  '**/*.{json,ts,tsx,js,jsx,css,scss}': () => {
    return ['nx format:write', `nx affected --target=lint --fix`, 'nx affected --targets=test,e2e'];
  },
};
