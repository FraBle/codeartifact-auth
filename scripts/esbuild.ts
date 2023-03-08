import {build} from 'esbuild'

const argument = process.argv[2]

switch (argument) {
case 'action':
  transpile('action', 'action')
  break
case 'cli':
  transpile('cli', 'dist')
  break
default:
  console.error('Invalid argument try action or cli')
  process.exit(1)
}

async function transpile(target: string, outdir: string): Promise<void> {
  await build({
    entryPoints: [`src/${target}.ts`],
    bundle: true,
    outdir: outdir,
    minify: true,
    platform: 'node',
    target: 'node12.20',
    sourcemap: true
  })
    .then(() => {
      console.log('Pack completed')
    })
    .catch((e) => {
      console.log(e)
      console.error('failed to pack')
      process.exit(1)
    })

}

