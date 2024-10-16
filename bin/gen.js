import * as inquire from '../inquire/inquire.js'
import { Command } from 'commander';
const program = new Command();

program
  .command('gen')
  .description('Generate a random project idea')
  .action(inquire.prompt);

program.parse(process.argv);

// If no args, output help
if (!process.argv[2]) {
  program.outputHelp();
}
