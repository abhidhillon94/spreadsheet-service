# Spreadsheet Service

It provides APIs for the spreadsheet app to run

## Code Checkout

```
git clone git@github.com:abhidhillon94/spreadsheet-service.git
```
## Set up project for local development

### Prerequisites:
1. node v14
2. npm version 7+
3. docker (to run mongo)

## Follow the following steps to run the app locally
### Run DB using the following command
docker run -d --name mongodb -p 27017:27017 mongo

### Copy the content of .env.example to .env file

### Start the app server by running the following commands from the root directory
 - npm install
 - npm start
