import { spawn } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const projectDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const children = [
  spawn(process.execPath, [path.join(projectDirectory, 'node_modules', 'vite', 'bin', 'vite.js')], { cwd: projectDirectory, stdio: 'inherit' }),
  spawn(process.execPath, ['--watch', path.join(projectDirectory, 'server', 'index.js')], { cwd: projectDirectory, stdio: 'inherit' }),
]
let stopping = false

function stop(code = 0) {
  if (stopping) return
  stopping = true
  for (const child of children) child.kill()
  process.exitCode = code
}

for (const child of children) {
  child.once('error', (error) => {
    console.error('Could not start a development process:', error.message)
    stop(1)
  })
  child.once('exit', (code) => {
    if (!stopping) stop(code ?? 0)
  })
}

process.once('SIGINT', () => stop())
process.once('SIGTERM', () => stop())