import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./src/i18n/requests.tsx");
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN,
    DB_APP_ID: process.env.DB_APP_ID,
  },
};
module.exports = withNextIntl(nextConfig);
