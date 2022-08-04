import CodeArtifact from 'aws-sdk/clients/codeartifact'
import {execSync} from 'child_process'
import {awsCodeArtifactConfig, packageTypes} from './types'

function errorHandler(msg: string): void {
  console.error(msg)
  process.exit(1)
}

// eslint-disable-next-line complexity
function parseConfig(config: awsCodeArtifactConfig): awsCodeArtifactConfig {
  if (!config?.domain)
    errorHandler('Domain does not exist in package.json')

  if (!config?.accountId)
    errorHandler('accountId does not exist in package.json')

  if (!config?.repository)
    errorHandler('repository does not exist in package.json')

  if (!config?.region)
    errorHandler('region does not exist in package.json')

  if (!config?.scope)
    errorHandler('scope does not exist in package.json')

  if (!config?.packageType)
    errorHandler('scope does not exist in package.json')

  return {
    domain: config.domain,
    accountId: config.accountId,
    repository: config.repository,
    region: config.region,
    scope: config.scope,
    packageType: config.packageType
  }
}

async function getAuthorizationToken(domain: string, accountId: string): Promise<string> {
  const codeArtifact = new CodeArtifact()
  const params = {
    domain,
    domainOwner: accountId,
  }
  const token = await codeArtifact.getAuthorizationToken(params).promise().catch(e => errorHandler(e))
  if (token?.authorizationToken === undefined)
    throw errorHandler('Failed to retrieve auth token')
  return token.authorizationToken
}

function validateAWSConfigVariables(): void {
  if (!process.env.AWS_REGION)
    errorHandler('Missing AWS region environment variable. Please make sure that you assume a role!')
  if (!process.env.AWS_SESSION_TOKEN)
    errorHandler('Missing AWS session token environment variable. Please make sure that you assume a role!')
  if (!process.env.AWS_SECRET_ACCESS_KEY)
    errorHandler('Missing AWS serect access key environment variable. Please make sure that you assume a role!')
  if (!process.env.AWS_ACCESS_KEY_ID)
    errorHandler('Missing AWS access key id environment variable. Please make sure that you assume a role!')
}

async function setNpmConfig(config: awsCodeArtifactConfig): Promise<void> {
  const {domain, accountId, region, repository, scope} = parseConfig(config)

  const token = await getAuthorizationToken(domain, accountId)

  const endpoint = `//${domain}-${accountId}.d.codeartifact.${region}.amazonaws.com/npm/${repository}/`

  execSync(`npm config set ${scope}:registry https://${domain}-${accountId}.d.codeartifact.${region}.amazonaws.com/npm/${repository}/`)
  execSync(`npm config set ${endpoint}:_authToken=${token}`)
  execSync(`npm config set ${endpoint}:always-auth=true`)

  console.log(`Set npm credentials for ${scope}`)

}

async function setPoetryConfig(config: awsCodeArtifactConfig): Promise<void> {
  const {domain, accountId} = parseConfig(config)

  const token = await getAuthorizationToken(domain, accountId)

  execSync(`poetry config http-basic.mondo "aws" "${token}"`)

  console.log('Set npm credentials for poetry')

}

export async function main(config: awsCodeArtifactConfig): Promise<void> {
  validateAWSConfigVariables()

  console.log('__insideMain__')
  console.log(config.packageType)
  console.log(typeof config.packageType)
  console.log((config.packageType.trim() == packageTypes.npm.trim()))
  console.log(packageTypes.npm)
  console.log(typeof packageTypes.npm)

  if (config.packageType.trim() == packageTypes.npm.trim()) {
    console.log('main npm case')
    await setNpmConfig(config)
  }
  else if (config.packageType.trim() == packageTypes.poetry.trim()) {
    await setPoetryConfig(config)
  }
  else {
    console.log('main fail case')
    throw new Error(`invalid package type: ${config.packageType}, supported types: ${JSON.stringify(packageTypes)}`)
  }
}
