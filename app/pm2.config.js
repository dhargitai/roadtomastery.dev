module.exports = {
  apps: [
    {
      name: "Remix",
      script: "remix watch",
      ignore_watch: ["."]
    },
    {
      name: "Postcss",
      script: "postcss styles/**/*.css --base styles --dir app/styles",
      autorestart: false,
      watch: [
        "./tailwind.config.js",
        "./app/**/*.ts",
        "./app/**/*.tsx",
        "./styles/**/*.css",
      ],
      env: {
        NODE_ENV: process.env.NODE_ENV ?? "development",
        FORCE_COLOR: "1",
      },
    },
  ],
};
