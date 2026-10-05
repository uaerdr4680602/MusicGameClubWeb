import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'

const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const imageRoot = path.join(projectRoot, 'public/img')
const sourceExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif'])
const textExtensions = new Set(['.js', '.jsx', '.css', '.json', '.md', '.html'])

function findFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filePath = path.join(directory, entry.name)
    return entry.isDirectory() ? findFiles(filePath) : [filePath]
  })
}

function updateReferences() {
  findFiles(projectRoot)
    .filter(filePath => {
      const relativePath = path.relative(projectRoot, filePath)
      return !relativePath.startsWith('node_modules/') &&
        !relativePath.startsWith('dist/') &&
        textExtensions.has(path.extname(filePath).toLowerCase())
    })
    .forEach(filePath => {
      const original = fs.readFileSync(filePath, 'utf8')
      const updated = original.replace(
        /((?:\/|['"(])[^'"\s)]+)\.(jpe?g|png|gif)(?=['")\s])/gi,
        '$1.webp',
      )
      if (updated !== original) fs.writeFileSync(filePath, updated)
    })
}

const imageFiles = findFiles(imageRoot).filter(filePath =>
  sourceExtensions.has(path.extname(filePath).toLowerCase()),
)

if (imageFiles.length === 0) {
  console.log('No JPG, PNG, or GIF files found.')
  process.exit(0)
}

if (spawnSync('magick', ['-version'], { stdio: 'ignore' }).status !== 0) {
  console.error('ImageMagick is required. Install it with: brew install imagemagick')
  process.exit(1)
}

if (imageFiles.some(filePath => path.extname(filePath).toLowerCase() === '.gif') &&
  spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status !== 0) {
  console.error('FFmpeg is required for GIFs. Install it with: brew install ffmpeg')
  process.exit(1)
}

const convertedFiles = []
for (const source of imageFiles) {
  const output = `${source.slice(0, source.lastIndexOf('.'))}.webp`
  const isGif = path.extname(source).toLowerCase() === '.gif'
  const command = isGif ? 'ffmpeg' : 'magick'
  const args = isGif
    ? ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-c:v', 'libwebp_anim', '-q:v', '70', '-loop', '0', output]
    : [source, '-strip', '-quality', '82', output]
  const result = spawnSync(command, args, { stdio: 'inherit' })

  if (result.status !== 0) {
    console.error(`Failed to convert ${path.relative(projectRoot, source)}`)
    process.exit(1)
  }
  convertedFiles.push({ source, output })
}

updateReferences()
convertedFiles.forEach(({ source }) => fs.rmSync(source))
console.log(`Converted ${convertedFiles.length} image(s) to WebP.`)
