module.exports = {
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "testPathIgnorePatterns": [
        "<rootDir>/(build|docs|node_modules)/"
    ],
    "collectCoverage": true,
    "setupTestFrameworkScriptFile": "./src/tests/setup.ts"
}