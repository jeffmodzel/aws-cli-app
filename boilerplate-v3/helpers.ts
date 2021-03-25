import * as cli from "cli";

export const validateInputs = (options: any, requiredKeys: string[]) => {
  for (const key of requiredKeys) {
    if (!options[key]) {
      cli.error(`${key} is required, see --help`); // --help comes for free with cli package
      cli.exit(1);
    }
  }
};
