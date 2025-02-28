import { expect, test } from 'vitest'
import { access, readdir, readFile } from '../src'

test('readFile', async () => {
  const resultAsync = readFile(import.meta.filename, 'utf8')
  const resultSync = readFile.sync(import.meta.filename, 'utf8')
  await expect(resultAsync).resolves.toBe(resultSync)
})

test('readdir', async () => {
  const resultAsync = readdir(import.meta.dirname)
  const resultSync = readdir.sync(import.meta.dirname)
  await expect(resultAsync).resolves.toEqual(resultSync)
  expect(resultSync).toMatchInlineSnapshot(`
    [
      "index.test.ts",
    ]
  `)
})

test('access', async () => {
  const resultAsync = access(import.meta.filename)
  const resultSync = access.sync(import.meta.filename)
  await expect(resultAsync).resolves.toBe(undefined)
  expect(resultSync).toBe(undefined)
})
