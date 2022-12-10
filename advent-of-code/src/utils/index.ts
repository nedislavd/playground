/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.ts,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib.ts'
 *     import { myUtil } from '../utils/index.ts'
 *
 *   also incorrect:
 *
 *     import _ from 'lodash'
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 *
 */
export const chunkArray = (arr: string[], n: number) => {
  const chunkLength: number = Math.max(arr.length / n, 1);
  let chunks: string[] = [];
  for (let i = 0; i < n; i++) {
    if (chunkLength * (i + 1) <= arr.length)
      chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
  }
  return chunks;
};

type _Chunk_ = <T>(chunkSize: number, arr: T[]) => T[][]

export const _chunk_: _Chunk_ = (chunkSize, arr) => {
  if (chunkSize <= 0) {
    throw new Error("Chunk size has to be greater than 0.");
  }

  const chunks = new Array(Math.ceil(arr.length / chunkSize));

  for (let i = 0, j = 0; i < arr.length; i = i + chunkSize, j++) {
    chunks[j] = arr.slice(i, i + chunkSize);
  }

  return chunks;
};