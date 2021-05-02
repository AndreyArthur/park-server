import {pathsToModuleNameMapper} from 'ts-jest/utils'
import {compilerOptions} from './tsconfig.json';


export default {
  roots: ["<rootDir>/src"],
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageProvider: "v8",
  testEnvironment: "node",
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths, {prefix: '<rootDir>'}
  )
};
