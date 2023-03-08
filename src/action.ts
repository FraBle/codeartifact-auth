import {getInput, setFailed} from '@actions/core'
import {main} from './index'
import {parsePackageType} from './helpers'

async function codeArtifactGithubAction(): Promise<void> {
  try {
    const domain = getInput('domain')
    const accountId = getInput('accountId')
    const region = getInput('region')
    const repository = getInput('repository')
    const scope = getInput('scope')
    const packageTypeRaw = getInput('packageType')
    const packageType = parsePackageType(packageTypeRaw)
    console.log('Input Config Details:')
    console.log(
      domain,
      accountId,
      region,
      repository,
      scope,
      packageType
    )
    main({domain, accountId, region, repository, scope, packageType})
  } catch (error) {
    if (error instanceof Error)
      setFailed(error.message)
    else {
      console.error(error)
      setFailed('Unknown error')
    }
  }
}

codeArtifactGithubAction()

