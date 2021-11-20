/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};

// module.exports = {
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   testRegex: "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
//   testPathIgnorePatterns: ["/out/", "/node_modules/"],
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
//   collectCoverage: true,
// };
