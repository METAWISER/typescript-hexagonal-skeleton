const common = [
  "--require-module ts-node/register", // Load TypeScript module
];

const backend = [
  ...common,
  "tests/api/features/**/*.feature", // Specify our feature files
  "--require tests/api/features/steps/**/*steps.ts", // Load step definitions
  "--publish-quiet", // Hide step definition snippets on the console
  "format progress-bar",
].join(" ");

module.exports = {
  backend,
};
