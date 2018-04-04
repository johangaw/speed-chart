const { execSync } = require('child_process')

console.log('Running postinstall.js...')
if (process.env.NODE_ENV) {
  const output = execSync('npm run build')
  console.log(output.toString('utf8'))
}
