// eslint-disable-next-line import/no-extraneous-dependencies
const AWS_SERVICE_NAMES = require('./aws-service-official-names.json'); // eslint-disable-line @typescript-eslint/no-require-imports

export interface LibraryReadmeOptions {
  /**
   * CloudFormation namespace for this CFN-only module
   */
  readonly cfnNamespace: string;

  /**
   * The name under which we publish this NPM package
   */
  readonly packageName: string;
}

/**
 * Define what the contents of the module README should look like.
 *
 * It lives in pkglint because these all need it:
 *
 * - pkglint, in order to be able to rewrite READMEs to their desired content
 * - cfnspec, in order to generate new library directories on-the-fly when new modules
 *   appear in the CloudFormation specification
 * - ubergen, to rewrite the README of an experimental package back to its 'cfn-only' state
 *
 * And 'pkglint' is the only package that is shared in the dependency tree between all
 * of them.
 */
export function cfnOnlyReadmeContents(options: LibraryReadmeOptions) {
  const title = `${AWS_SERVICE_NAMES[options.cfnNamespace] ?? options.cfnNamespace} Construct Library`;

  const cfnLink = `https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/${options.cfnNamespace.replace('::', '_')}.html`;

  const moduleName = options.cfnNamespace.replace('::', '-').replace(/V\d+$/, '').toLocaleLowerCase();
  const importName = moduleName.replace(/[^a-z0-9_]/g, '_').replace(/^aws_/, '');

  return [
    `# ${title}`,
    '<!--BEGIN STABILITY BANNER-->',
    '',
    '---',
    '',
    '![cfn-resources: Stable](https://img.shields.io/badge/cfn--resources-stable-success.svg?style=for-the-badge)',
    '',
    '> All classes with the `Cfn` prefix in this module ([CFN Resources]) are always stable and safe to use.',
    '>',
    '> [CFN Resources]: https://docs.aws.amazon.com/cdk/latest/guide/constructs.html#constructs_lib',
    '',
    '---',
    '',
    '<!--END STABILITY BANNER-->',
    '',
    'This module is part of the [AWS Cloud Development Kit](https://github.com/aws/aws-cdk) project.',
    '',
    '```ts nofixture',
    `import * as ${importName} from '${options.packageName}';`,
    '```',
    '',
    '<!--BEGIN CFNONLY DISCLAIMER-->',
    '',
    'There are no hand-written ([L2](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html#constructs_lib)) constructs for this service yet. ',
    'However, you can still use the automatically generated [L1](https://docs.aws.amazon.com/cdk/latest/guide/constructs.html#constructs_l1_using) constructs, and use this service exactly as you would using CloudFormation directly.',
    '',
    `For more information on the resources and properties available for this service, see the [CloudFormation documentation for ${options.cfnNamespace}](${cfnLink}).`,
    '',
    '(Read the [CDK Contributing Guide](https://github.com/aws/aws-cdk/blob/master/CONTRIBUTING.md) if you are interested in contributing to this construct library.)',
    '',
    '<!--END CFNONLY DISCLAIMER-->',
  ].join('\n') + '\n'; // File must end in newline otherwise linter will complain
}
