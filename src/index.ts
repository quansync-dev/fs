import fs, {
  type BigIntStats,
  type BufferEncodingOption,
  type Dirent,
  type MakeDirectoryOptions,
  type Mode,
  type ObjectEncodingOptions,
  type PathLike,
  type RmOptions,
  type StatOptions,
  type Stats,
  type WriteFileOptions,
} from 'node:fs'
import { quansync } from 'quansync/macro'
import type { Buffer } from 'node:buffer'
import type { QuansyncFn } from 'quansync'

/**
 * @link https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
 */
export const readFile = quansync({
  sync: (path, options) => fs.readFileSync(path, options),
  async: (path, options) => fs.promises.readFile(path, options),
}) as QuansyncFn<
  Buffer,
  [
    path: PathLike,
    options?: {
      encoding?: null | undefined
      flag?: string | undefined
    } | null,
  ]
> &
  QuansyncFn<
    string,
    [
      path: PathLike,
      options:
        | { encoding: BufferEncoding; flag?: string | undefined }
        | BufferEncoding,
    ]
  >

/**
 * @link https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options
 */
export const writeFile: QuansyncFn<
  void,
  [
    file: PathLike,
    data: string | NodeJS.ArrayBufferView<ArrayBufferLike>,
    options?: WriteFileOptions | undefined,
  ]
> = quansync({
  sync: (
    file: PathLike,
    data: string | NodeJS.ArrayBufferView,
    options?: WriteFileOptions,
  ) => fs.writeFileSync(file, data, options),
  async: (file, data, options) => fs.promises.writeFile(file, data, options),
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesunlinkpath
 */
export const unlink: QuansyncFn<void, [path: PathLike]> = quansync({
  sync: (path: PathLike) => fs.unlinkSync(path),
  async: (path) => fs.promises.unlink(path),
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesaccesspath-mode
 */
export const access: QuansyncFn<
  void,
  [path: PathLike, mode?: number | undefined]
> = quansync({
  sync: (path: PathLike, mode?: number) => fs.accessSync(path, mode),
  async: (path, mode) => fs.promises.access(path, mode),
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesstatpath-options
 */
export const stat = quansync({
  sync: (path: PathLike, options) => fs.statSync(path, options),
  async: (path, options) => fs.promises.stat(path, options),
}) as QuansyncFn<
  Stats,
  [path: PathLike, opts?: StatOptions & { bigint?: false | undefined }]
> &
  QuansyncFn<
    BigIntStats,
    [path: PathLike, opts: StatOptions & { bigint: true }]
  > &
  QuansyncFn<Stats | BigIntStats, [path: PathLike, opts?: StatOptions]>

export const lstat = quansync({
  sync: (path: PathLike, options) => fs.lstatSync(path, options),
  async: (path, options) => fs.promises.lstat(path, options),
}) as typeof stat

/**
 * @link https://nodejs.org/api/fs.html#fspromisescpsrc-dest-options
 */
export const cp: QuansyncFn<
  void,
  [src: PathLike, dest: PathLike, mode?: number | undefined]
> = quansync({
  sync: (src: PathLike, dest: PathLike, mode?: number) =>
    fs.copyFileSync(src, dest, mode),
  async: (src, dest, mode) => fs.promises.copyFile(src, dest, mode),
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesrmpath-options
 */
export const rm: QuansyncFn<
  void,
  [path: PathLike, options?: RmOptions | undefined]
> = quansync({
  sync: (path: PathLike, options?: RmOptions) => fs.rmSync(path, options),
  async: (path, options) => fs.promises.rm(path, options),
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesmkdirpath-options
 */
export const mkdir = quansync({
  sync: (path: PathLike, options) => fs.mkdirSync(path, options),
  async: (path, options) => fs.promises.mkdir(path, options),
}) as QuansyncFn<
  string | undefined,
  [path: PathLike, options: MakeDirectoryOptions & { recursive: true }]
> &
  QuansyncFn<
    void,
    [
      path: PathLike,
      options?:
        | Mode
        | (MakeDirectoryOptions & { recursive?: false | undefined })
        | null,
    ]
  >

/**
 * @link https://nodejs.org/api/fs.html#fspromisesrenameoldpath-newpath
 */
export const rename: QuansyncFn<void, [oldPath: PathLike, newPath: PathLike]> =
  quansync({
    sync: (oldPath: PathLike, newPath: PathLike) =>
      fs.renameSync(oldPath, newPath),
    async: (oldPath, newPath) => fs.promises.rename(oldPath, newPath),
  })

/**
 * @link https://nodejs.org/api/fs.html#fspromisesreaddirpath-options
 */
export const readdir = quansync({
  sync: (path: PathLike, options) => fs.readdirSync(path, options),
  async: (path, options) => fs.promises.readdir(path, options),
}) as QuansyncFn<
  string[],
  [
    path: PathLike,
    options?:
      | (ObjectEncodingOptions & {
          withFileTypes?: false | undefined
          recursive?: boolean | undefined
        })
      | BufferEncoding
      | null,
  ]
> &
  QuansyncFn<
    Buffer[],
    [
      path: PathLike,
      options:
        | {
            encoding: 'buffer'
            withFileTypes?: false | undefined
            recursive?: boolean | undefined
          }
        | 'buffer',
    ]
  > &
  QuansyncFn<
    string[] | Buffer[],
    [
      path: PathLike,
      options?:
        | (ObjectEncodingOptions & {
            withFileTypes?: false | undefined
            recursive?: boolean | undefined
          })
        | BufferEncoding
        | null,
    ]
  > &
  QuansyncFn<
    Dirent[],
    [
      path: PathLike,
      options: ObjectEncodingOptions & {
        withFileTypes: true
        recursive?: boolean | undefined
      },
    ]
  >

/**
 * @link https://nodejs.org/api/fs.html#fspromisesrealpathpath-options
 */
export const realpath = quansync({
  sync: (path: PathLike, options) => fs.realpathSync(path, options),
  async: (path, options) => fs.promises.realpath(path, options),
}) as QuansyncFn<
  string,
  [path: PathLike, options?: ObjectEncodingOptions | BufferEncoding | null]
> &
  QuansyncFn<Buffer, [path: PathLike, options: BufferEncodingOption]> &
  QuansyncFn<
    string | Buffer,
    [path: PathLike, options?: ObjectEncodingOptions | BufferEncoding | null]
  >
