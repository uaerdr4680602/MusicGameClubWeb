import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexFile = path.join(projectRoot, 'dist', 'index.html')
const fallbackFile = path.join(projectRoot, 'dist', '404.html')

await copyFile(indexFile, fallbackFile)
console.log('Created dist/404.html for SPA route fallback')