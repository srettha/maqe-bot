module.exports = {
    rootDir: './',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/',
    ],
    moduleFileExtensions: [
        'js',
        'ts',
    ],
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
