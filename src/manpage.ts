export const manPage = `
CodeArtifact Command Line Arguments

-a --accountId                  AWS AccountId associated with codeartifact repo
-d --domain                     The name of the domain that is in scope for the generated authorization token
-r --repository                 The name of the repository e.g. OrganisationNamePackages
-s --scope                      The npm scope for the private package e.g. @OrganisationName
-p --region                     The region the codeArtifact repository is hosted in e.g. us-east-1
-m --packageType                The package type to set. Currently supports npm or poetry
-h --help                       display help page

Long options may be passed with a single dash.
`

export default manPage
