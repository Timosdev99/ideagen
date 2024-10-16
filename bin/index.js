#!/usr/bin/env node
import { Command } from 'commander';
import { createRequire } from 'module';


const require = createRequire(import.meta.url);
const pkg = require('../package.json');

const program = new Command();


import inquirer from "inquirer";

const projectIdeas = {
    "Quick Hacks": [
      "Build a countdown timer",
      "Create a random joke generator",
      "Make a simple weather CLI",
    ],
    "Challenges": [
      "Build a fully functional to-do list app",
      "Create a cryptocurrency price tracker",
      "Develop a basic machine learning model with TensorFlow.js",
    ],
    "Creative Projects": [
      "Design a personal portfolio website with animations",
      "Build a meme generator app",
      "Create an interactive art project using p5.js",
    ],
  };
  
  // Function to pick a random idea from a given category
  const getRandomIdea = (category) => {
    const ideas = projectIdeas[category];
    const randomIndex = Math.floor(Math.random() * ideas.length);
    return ideas[randomIndex];
  };
  
  // Prompt the user to choose a category
  const promptUserForCategory = async () => {
    const { category } = await inquirer.prompt([
      {
        type: 'list',
        name: 'category',
        message: 'What kind of project are you in the mood for?',
        choices: Object.keys(projectIdeas),
      },
    ]);
  
    const idea = getRandomIdea(category);
    console.log(`\n Here's a project idea for you: ${idea}`);
  };
  
  // Run the prompt
  promptUserForCategory();

  
  

// program
// .version(pkg.name)
// .command('gen', 'generate project ideas')
// .parse(process.argv)