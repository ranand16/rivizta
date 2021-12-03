/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {  SERVER_BASE_URL: process.env.SERVER_BASE_URL  },
  reactStrictMode: true,
}
