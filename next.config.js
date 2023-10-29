/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  env: {
    BASE_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "ace",
    FIREBASE_APIKEY: "AIzaSyAOwUgDnE1JE9iP5YySXNl4M1bwxM9GvWQ",
    FIREBASE_AUTHDOMAIN:"aceofdiamonds-ec0f2.firebaseapp.com",
    FIREBASE_DATABASEURL: "https://aceofdiamonds-ec0f2-default-rtdb.europe-west1.firebasedatabase.app",
    FIREBASE_PROJECTID: "aceofdiamonds-ec0f2",
    FIREBASE_STORAGEBUCKET: "aceofdiamonds-ec0f2.appspot.com",
    FIREBASE_MESSAGINGSENDERID: "144721420934",
    FIREBASE_APPID: "1:144721420934:web:66e7d46205886a27ace707",
    FIREBASE_MEASURMENTID: "G-W80B9296GZ",
    GOOGLE_ID: "1088102179028-louqth4g6ml4q354pg6odos3v0risivh.apps.googleusercontent.com",
    GOOGLE_SECRET:"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",
 },
};

module.exports = nextConfig;
