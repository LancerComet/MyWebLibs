/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testURL: 'http://localhost?name=LancerComet&age=28',
  coverageDirectory: '<rootDir>/.coverage-report'
}
