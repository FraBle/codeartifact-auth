export enum packageTypes {
    npm = 'npm',
    poetry = 'poetry'
}

export interface awsCodeArtifactConfig {
    domain: string;
    accountId: string;
    repository: string;
    region: string;
    scope: string | undefined;
    packageType: string;
}
