#!/usr/bin/env zx
// FROM: https://github.com/vitest-dev/vitest/blob/a9d36c719f8ce5551f61da20181490d3673bdf99/scripts/release.ts
import { versionBump } from 'bumpp'
import { glob } from 'tinyglobby'
import { $ } from 'zx'

try {
  console.log('Running tests')
  const testResult = await $`pnpm -w run test`;
  console.log(testResult.stdout)
  const packages = await glob(['package.json', './packages/*/package.json'], { expandDirectories: false })

  console.log('Bumping versions in packages:', packages.join(', '), '\n')

  const result = await versionBump({
    files: packages,
    commit: true,
    push: true,
    tag: true,
  })

  if (!result.newVersion.includes('beta')) {
    console.log('Pushing to release branch')
    await $`git update-ref refs/heads/release refs/heads/main`
    await $`git push origin release`
  }
  console.log('New release is ready, waiting for conformation at https://github.com/iceprosurface/vueireact/actions')
}
catch (err) {
  console.error(err)
}