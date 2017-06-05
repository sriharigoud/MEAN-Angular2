# Angular 2 - Mean example

App to demostrate building an angular 2 app in the MEAN stack with the Angular CLI.

## Set up.
Make sure you have angular cli installed.
```bash
$ npm install -g angular-cli
```

Make sure you have mongoDB installed. Check it's installation by typing `mongo`
Create a database in mongo "test" and import quotes.json(find it in the folder mongo-data/quotes.json) to it. 

```
mongoimport --db test --collection quotes --drop --file mongo-data/quotes.json
```

Clone the repo
```bash
$ git clone https://github.com/sriharigoud/angular2-mean.git
$ cd angular2-mean
```

Install dependencies
```bash
$ npm install
```

Run the app
```bash
$ npm run build
```