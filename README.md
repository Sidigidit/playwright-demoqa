# Front-End Automation Test

This application is for generating automation test using Playwright in https://demoqa.com/ 

## Overview

In this Test include running login test and checkout test for the happy case. Please follow the guidance below to run this application

## Prerequisites

- Visual Studio Code or any Editor 
- Node.js version 22 or above (in this case, im using v 22.11.0)
- Review config.json file in the tests/config. Update if needed

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright and its required browsers:
   ```bash
   npx playwright install
   ``

## How to run

- got to root directory
- run this command `npm run test` and once it finish, report should be generated in the firefox browser

### Additional Info
1. In order to improve the development, please refer to https://playwright.dev/docs/intro
2. If want to change the browser configuration for the report, please adjust it under ```projects: []``` in playwright.config.js
3. Since there are some feature not work properly, some of test is using API (get the list of book and add the book to the inventory)
