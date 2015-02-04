# SeaCargo

This is an exercise in building a Node server, using a noSQL DB, and doing server-side templating using Jade.


## Getting Started

If you want to download it and see how it works,  you can simply clone the seed repository and install the dependencies.
This is how to do it:

### Downloading seed and installing node server

You need git to clone the angular-seed repository.
I also use a number of node.js tools to initialize the project. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).
To get the tools we depend upon `npm`, the [node package manager][npm].
You can simply do:

```
npm install
```
### Create your own dataset
Examine how I connect to my MongoDB, in file `bd.js`. Create and use your own database, and populate it with the data in the JSON files,
by running the `import_database.js`.


### Run the Application

The simplest way to start the project is;

```
npm start
```

Now browse to the app at `http://localhost:3000`.
