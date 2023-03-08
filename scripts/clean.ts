import fs from 'fs'
import path from 'path'

const argument = process.argv[2]

switch (argument) {
case 'action':
  removeBuildFolder('action')
  break
case 'cli':
  removeBuildFolder('dist')
  break
default:
  console.error('Invalid argument try action or cli')
  process.exit(1)
}

async function removeBuildFolder(target: string): Promise<void> {
  const filePath = path.resolve(`./${target}`)
  if (fs.existsSync(filePath)) {
    console.log(`Cleaning ${target}`)
    fs.rmdirSync(filePath, {recursive: true})
  }
}
