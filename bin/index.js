#!/usr/bin/env node
import { Command } from 'commander';
import { createRequire } from 'module';
import { GoogleGenerativeAI } from '@google/generative-ai';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import path from 'path';



dotenv.config();

console.log("Current working directory:", process.cwd());
console.log("Looking for .env file at:", path.resolve(process.cwd(), '.env'));

console.log(process.env.GEMINI_API_KEY)

const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const isRequired = (input) => {
  if (input === '') {
    return 'This value is required';
  }
  return true;
};

const program = new Command();
program.version(pkg.version);


if (!process.env.GEMINI_API_KEY) {
  console.error('Error: GEMINI_API_KEY is not set. Please set it in your environment or .env file.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const generateProjectIdea = async (input) => {
  const prompt = `Generate a creative project idea for a developer who wants to work on a ${input} kind of project. Provide a brief description and potential features.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating project idea:", error.message);
    throw new Error("Failed to generate idea. Please try again.");
  }
};

const promptUserForCategory = async () => {
  try {
    const { category } = await inquirer.prompt([
      {
        type: 'input',
        name: 'category',
        message: 'What kind of project are you in the mood for?',
        validate: isRequired,
      },
    ]);

    const idea = await generateProjectIdea(category);
    console.log(`\nHere's a project idea for you:\n${idea}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
};

program
  .command('gen')
  .description('Generate project ideas')
  .action(promptUserForCategory);

program.parse(process.argv);


if (!process.argv.slice(2).length) {
  program.outputHelp();
}