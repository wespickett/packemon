import { PackageStructure } from '@boost/common';
import type { CompilerOptions } from 'typescript';

export type Platform = 'node' | 'browser'; // electron

export type Target =
  // Oldest target still supported
  | 'legacy'
  // Latest target
  | 'modern'
  // Experimental future target
  | 'future';

export type CommonFormat =
  // CommonJS modules with ".js" file extension
  'lib';

export type BrowserFormat =
  | CommonFormat
  // ECMAScript modules with ".js" file extension
  | 'esm'
  // Universal Module Definition with ".js" file extension
  | 'umd';

export type NodeFormat =
  | CommonFormat
  // CommonJS modules with ".cjs" file extension (node)
  | 'cjs'
  // ECMAScript modules with ".mjs" file extension (node)
  | 'mjs';

export type Format = NodeFormat | BrowserFormat;

export interface PackemonPackageConfig {
  format?: Format | Format[];
  inputs?: Record<string, string>;
  namespace?: string;
  platform?: Platform | Platform[];
  target?: Target;
}

export interface PackemonPackage extends PackageStructure {
  packemon: PackemonPackageConfig;
}

export interface PackemonOptions {
  addEngines: boolean;
  addExports: boolean;
  checkLicenses: boolean;
  concurrency: number;
  generateDeclaration: boolean;
  skipPrivate: boolean;
  timeout: number;
}

export interface PackageConfig {
  formats: Format[];
  inputs: Record<string, string>;
  namespace: string;
  platforms: Platform[];
  target: Target;
}

// ARTIFACTS

export interface ArtifactFlags {
  requiresSharedLib?: boolean;
}

export type ArtifactState = 'pending' | 'booting' | 'building' | 'packing' | 'passed' | 'failed';

export interface BuildResult<T> {
  [key: string]: unknown;
  stats: Record<string, T>;
  time: number;
}

export interface BuildUnit {
  format: Format;
  platform: Platform;
  target: Target;
}

// CONFIG

export interface FeatureFlags {
  decorators?: boolean;
  flow?: boolean;
  react?: boolean;
  typescript?: boolean;
  workspaces?: string[];
}

declare module 'rollup' {
  interface OutputOptions {
    originalFormat?: Format;
  }
}

// OTHER

export type Awaitable = void | Promise<void>;

export interface TSConfigStructure {
  compilerOptions?: CompilerOptions;
  extends?: string;
}

export interface APIExtractorStructure {
  projectFolder: string;
  mainEntryPointFilePath: string;
  dtsRollup: {
    untrimmedFilePath: string;
  };
}
