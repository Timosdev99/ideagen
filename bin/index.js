#!/usr/bin/env node
import { Command } from 'commander';
import { createRequire } from 'module';
import { GoogleGenerativeAI } from '@google/generative-ai';
import inquirer from 'inquirer';
import dotenv from 'dotenv';
import path from 'path';
import fs from'fs'



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
  const prompt = `Generate a creative project idea for a developer who wants to work on a ${input} kind of project. Provide a brief description and potential features and also the kind of programming language the project can be written in and the purpose it's going to serve.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating project idea:", error.message);
    throw new Error("Failed to generate idea. Please try again.");
  }
};

const projectswork = {
  Creative_Art: "Creative_Art",
  complex: "complex",
  skill_challenge: "skill_challenge",
  self_development:  "self_development",
  others: "others"
}
  

const promptUserForCategory = async () => {
  try {
    
    const { List } = await inquirer.prompt([
      {
        type: 'list',
        name: 'List',
        message: 'What kind of project are you in the mood for:',
        choices: Object.keys(projectswork)
      },
    ]);
    
    let idea;

   if(List=== "others") {
    const { category } = await inquirer.prompt([
      {
        type: 'input',
        name: 'category',
        message: 'input What kind of project are you in the mood for:',
        validate: isRequired,
      },
    ]);

     idea = await generateProjectIdea(category);
    console.log(`\nHere's a project idea for you:\n${idea}`);
   

   }
   else {
     idea = await generateProjectIdea(List);
    console.log(`\nHere's a project idea for you:\n${idea}`);
   
   }

   const { Save } = await inquirer.prompt([
    {
      type: 'list',
      name: 'Save',
      message: 'do you want to save project idea:',
      choices: ["yes", "no"]
    },
  ]);
    

  if(Save === "yes") {
    fs.writeFile("./bin/favorite.json", JSON.stringify(idea), 'utf-8', (err) => {
      if (err) {
        console.error('An error occurred:', err);
      } else {
        console.log('Idea saved successfully!');
      }
    });
  }

  
    
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