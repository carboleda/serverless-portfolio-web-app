/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    reactStrictMode: true,
    env: {
        API: isProd ? null : 'http://localhost:3000/api',
    },
}
