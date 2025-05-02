const { withExpo } = require("@expo/next-adapter");
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: false,
  transpilePackages: [
    "react-native",
    "react-native-web",
    "expo",
    "react-native-vector-icons",
    "react-native-paper",
    "react-native-safe-area-context",
    "react-native-gesture-handler",
    'react-native-reanimated',
    "react-native-responsive-screen",
    // Add more React Native / Expo packages here...
  ],
  experimental: {
    forceSwcTransforms: true,
  },
});

module.exports = nextConfig;
