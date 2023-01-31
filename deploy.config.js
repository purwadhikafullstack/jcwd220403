module.exports = {
  apps: [
    {
      name: "JCWD-2204-03", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8403,
      },
      time: true,
    },
  ],
};
