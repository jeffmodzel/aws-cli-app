import * as cli from 'cli';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { S3 } from '@aws-sdk/client-s3';
import { validateInputs} from './helpers';

interface IOptions {
  profile: string;
  region: string;
}

const options: IOptions = cli.parse({
  profile: [false, "profile", "string"],
  region: [false, "region", "string", "us-east-1"]
});

const main = async () => {
  cli.debug("main()");
  validateInputs(options, ["profile", "region"]);

  cli.debug("Loading credentials");
  const credentials = fromIni({ profile: options.profile });
  
  cli.debug('Getting S3 buckets')
  const s3 = new S3({ credentials: credentials, region: options.region });

  let response = await s3.listBuckets({});
  for (const bucket of response.Buckets) {
    cli.info(`Bucket Name: ${bucket.Name}`);
  }
  cli.info(`Bucket count: ${response.Buckets.length}`);
};

main().then(() => cli.debug('DONE'));
