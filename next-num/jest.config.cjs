// jest.config.js
module.exports = async () => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: false,
    moduleFileExtensions: ["js", "ts", "json"],
    transform: {
      "^.+\\.ts$": "ts-jest",
    },
  };
};