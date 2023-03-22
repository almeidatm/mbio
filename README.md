# Mercedes-Benz IO Exercise

## Overview

This project is a proposed solution for the given challenge from MBIO process.

It consists of a [NodeJS](https://nodejs.org/en) project written in TypeScript language using test automation framework [Playwright](https://playwright.dev/). It uses the Page Object Model pattern.

## Setup

> In order to run the project, the only prerequisite is to have NodeJS installed - refer to [Node installation guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) if necessary.

Setup steps go as follows:

1. [Download this repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local machine
2. Open a terminal in the project folder
3. Install project packages
   ```
   npm install
   ```
4. Install Playwright browsers
   ```
   npm run setup
   ```
5. Enjoy =)

## Execution

The project provides some different options of running the tests:

- Running the test against all browsers - this script spawns 3 different workers to run the test against each available browser in parallel
  ```
  npm test
  ```
- Running the test against Chromium browser
  ```
  npm run test:chromium
  ```
- Running the test against Edge browser
  ```
  npm run test:edge
  ```
- Running the test against Safari browser
  ```
  npm run test:safari
  ```

After running the project, as per the requirements, the expected outcome should be the creation of the file `prices.txt` with the following content:
```
Min price is £34,500.00
Max price is £41,890.00
```
As for the other requirement, the file `screenshot.png` consists of a screenshot of the list of cars after filtering cars list by fuel type Diesel.

> By default, the screenshot is only capturing the list of cars. If you want to capture the full page instead, you can update the line #27 in test file command with a `true` parameter.

## Project Structure

Apart from the base Node/Git related files, the more important pieces of the project will be described below.

### Playwright.config File

This file contains all general settings for Playwright. For this project, we are configuring the base URL of the app - any navigation will be relative to this URL -, timeout settings and browsers to be used along with their particular settings.

### Tests Folder

Folder to store tests files that will be executed.

### Support Folder

This folder contains all related support files in order to run the tests. It consists of a folder with all page objects file, one for the Base Page - parent page with default attributes and methods to be extended by each other page - and other files for each of the pages we are accessing throughout the test.

Another support file is the `helper.ts` which contains helper methods/data that can be updated whenever necessary.
