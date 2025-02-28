import { defineConfig } from 'tsdown'
import Quansync from 'unplugin-quansync/rolldown'

export default defineConfig({
  entry: ['./src/index.ts'],
  format: 'esm',
  target: 'node20.18',
  clean: true,
  dts: { transformer: 'oxc' },
  platform: 'node',
  plugins: [Quansync()],
})
