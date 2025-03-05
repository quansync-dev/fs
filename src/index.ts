import fs, {
  type symlink as _symlink,
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
  type TimeLike,
  type WriteFileOptions,
} from 'node:fs'
import { quansync, type QuansyncFn } from 'quansync'
import type { Buffer } from 'node:buffer'

/**
 * @link https://nodejs.org/api/fs.html#fspromisesreadfilepath-options
 */
export const readFile = quansync({
  sync: fs.readFileSync,
  async: fs.promises.readFile as any,
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
  sync: fs.writeFileSync,
  async: fs.promises.writeFile as any,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesunlinkpath
 */
export const unlink: QuansyncFn<void, [path: PathLike]> = quansync({
  sync: fs.unlinkSync,
  async: fs.promises.unlink,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesaccesspath-mode
 */
export const access: QuansyncFn<
  void,
  [path: PathLike, mode?: number | undefined]
> = quansync({
  sync: fs.accessSync,
  async: fs.promises.access,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesstatpath-options
 */
export const stat = quansync({
  sync: fs.statSync,
  async: fs.promises.stat,
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
  sync: fs.lstatSync,
  async: fs.promises.lstat,
}) as typeof stat

/**
 * @link https://nodejs.org/api/fs.html#fspromisescpsrc-dest-options
 */
export const cp: QuansyncFn<
  void,
  [src: PathLike, dest: PathLike, mode?: number | undefined]
> = quansync({
  sync: fs.copyFileSync,
  async: fs.promises.copyFile,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesrmpath-options
 */
export const rm: QuansyncFn<
  void,
  [path: PathLike, options?: RmOptions | undefined]
> = quansync({
  sync: fs.rmSync,
  async: fs.promises.rm,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesmkdirpath-options
 */
export const mkdir = quansync({
  sync: fs.mkdirSync,
  async: fs.promises.mkdir,
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
    sync: fs.renameSync,
    async: fs.promises.rename,
  })

/**
 * @link https://nodejs.org/api/fs.html#fspromisesreaddirpath-options
 */
export const readdir = quansync({
  sync: fs.readdirSync,
  async: fs.promises.readdir,
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
  sync: fs.realpathSync,
  async: fs.promises.realpath,
}) as QuansyncFn<
  string,
  [path: PathLike, options?: ObjectEncodingOptions | BufferEncoding | null]
> &
  QuansyncFn<Buffer, [path: PathLike, options: BufferEncodingOption]> &
  QuansyncFn<
    string | Buffer,
    [path: PathLike, options?: ObjectEncodingOptions | BufferEncoding | null]
  >

/**
 * @link https://nodejs.org/api/fs.html#fspromisesreadlinkpath-options
 */
export const readlink = quansync({
  sync: fs.readlinkSync,
  async: fs.promises.readlink,
}) as QuansyncFn<
  string,
  [path: PathLike, options?: ObjectEncodingOptions | BufferEncoding | null]
> &
  QuansyncFn<Buffer, [path: PathLike, options: BufferEncodingOption]> &
  QuansyncFn<
    string | Buffer,
    [path: PathLike, options?: ObjectEncodingOptions | BufferEncoding | null]
  >

/**
 * @link https://nodejs.org/api/fs.html#fspromisessymlinktarget-path-type
 */
export const symlink: QuansyncFn<
  void,
  [target: PathLike, path: PathLike, type?: _symlink.Type | null]
> = quansync({
  sync: fs.symlinkSync,
  async: fs.promises.symlink,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromiseschownpath-uid-gid
 */
export const chown: QuansyncFn<
  void,
  [path: PathLike, uid: number, gid: number]
> = quansync({
  sync: fs.chownSync,
  async: fs.promises.chown,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromiseslchownpath-uid-gid
 */
export const lchown: QuansyncFn<
  void,
  [path: PathLike, uid: number, gid: number]
> = quansync({
  sync: fs.lchownSync,
  async: fs.promises.lchown,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromiseschmodpath-mode
 */
export const chmod: QuansyncFn<void, [path: PathLike, mode: Mode]> = quansync({
  sync: fs.chmodSync,
  async: fs.promises.chmod,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesutimespath-atime-mtime
 */
export const utimes: QuansyncFn<
  void,
  [path: PathLike, atime: TimeLike, mtime: TimeLike]
> = quansync({
  sync: fs.utimesSync,
  async: fs.promises.utimes,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromiseslutimespath-atime-mtime
 */
export const lutimes: QuansyncFn<
  void,
  [path: PathLike, atime: TimeLike, mtime: TimeLike]
> = quansync({
  sync: fs.lutimesSync,
  async: fs.promises.lutimes,
})

/**
 * @link https://nodejs.org/api/fs.html#fspromisesmkdtempprefix-options
 */
export const mkdtemp = quansync({
  sync: fs.mkdtempSync,
  async: fs.promises.mkdtemp,
}) as QuansyncFn<
  string,
  [prefix: string, options?: ObjectEncodingOptions | BufferEncoding | null]
> &
  QuansyncFn<Buffer, [prefix: string, options: BufferEncodingOption]> &
  QuansyncFn<
    string | Buffer,
    [prefix: string, options?: ObjectEncodingOptions | BufferEncoding | null]
  >
