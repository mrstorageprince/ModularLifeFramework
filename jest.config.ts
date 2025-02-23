export default {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.ts?$": ["ts-jest", { isolatedModules: true }]
    },
    moduleFileExtensions: ["ts", "js"],
    testMatch: ["**/tests/**/*.test.ts"],
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ["core/**/*.ts", "server/**/*.ts"],
    coverageDirectory: "coverage",
    clearMocks: true
};
