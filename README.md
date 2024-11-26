# Simple command line interface     

the `command line interface` is a simple cli tool that help you generate project idea  

it allow user express their mood and suggest a project idea and Provide a brief description and potential features.

## How to use it 
1. **clone repo** 

```sh
 git clone https://github.com/Timosdev99/ideagen.git
 cd idea-gen
 ```

2. **create a .env file and include your gemini api key**
   ```js
   GEMINI_API_KEY=your_gemini_api_key
   ```

 3. **install necessary package**

```js
npm i commander @google/generative-ai dotenv inquirer
```


4. **link bin file**
```js
npm link
```

## usage

to run cli input command:

```js
idea-gen
```
and then 

```js
idea-gen gen
```
