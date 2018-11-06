# Welcome to the Book Store!
Book Store is RESTful API that enables you to create, edit and share your favourite books. It's stable, intuitive and, best of all, **free**! It was 
 built using modern technologies like
 [PostgreSQL](https://www.postgresql.org/) and
 [Node](https://nodejs.org/en/).

## Table of Contents

  1. [Accessing a Live Instance](#accessing-a-live-instance)
  1. [Our Tech Stack](#our-tech-stack)
  1. [Installation and Setup](#installation-and-setup)
  1. [Contributing](#contributing)
  1. [Licence](#license)

## Accessing a Live Instance
An instance of this app has been deployed to Heroku and is accessible to everyone. You may access it by visiting [this link](https://book-store-api-app.herokuapp.com/).

## Our Tech Stack

This project was built using modern technology tools. These include:
- [Node.js](https://nodejs.org/en/): an open-source JavaScript runtime that makes it possible to run JavaScript outside of a web browser.
- [PostgreSQL](https://www.postgresql.org/): an open source database.
- [Sequelize](docs.sequelizejs.com/): a promise-based O.R.M for Node.js v4
 and above. It supports PostgreSQL, MySQL, SQLite and MSSQL.
- [Git](https://git-scm.com/): an open-source version control software that is used to keep track of the changes made over time to different files. It also makes it easy for multiple people to collaboratively change those files and share their changes.

## Installation and setup

Here are the steps you need to follow to run this project on your computer:
- **Install Node.js**: You may visit [this link](https://nodejs.org/en/download/)
 for complete instructions on installing Node.js on your computer.

- **Install PostgreSQL**: You may visit
 [this link](http://postgresguide.com/setup/install.html)
 for instructions on setting up PostgreSQL on your computer. When you're
 done, please note your database name, port, username and password.

- **Install Git**: If you don't have Git installed, please consult [this link](https://google.com/search?q=how+to+install+git) for information about how to install it on your computer.

- **Open a terminal/command prompt** on your computer and `cd` into your
 preferred path/location.

- **Clone this repo**: Enter this command in the terminal:

```bash
git clone https://github.com/foladipo/book-store-api.git
```

- **Install dependencies**: Do so by running the following command:

```bash
npm install
```

Note: `npm` is a component of Node.js that serves as its package manager.
 So, it comes along with installing Node.js.

- **Add the required environment variables**: Consult the `.env.sample`
 file at the root of this repository for info about the different
 environmental variables you need to specify for this app. When
 you're done, save your changes in a `.env` file in the root of
 the repo. (Note that you may not have all of the required values until
 later in this installation process. So it's fine to leave such values for now.)

- **Initialize the DB**: Run the following commands:
```bash
npm run db:migrate
```

These will create the required tables in the app's database.

- That's it! You may now run `npm start` and the app will run on your
 computer. Visit `localhost:PORT` to browse it. Note that `PORT` will be the value you specified in `.env`, but it will be `3001` if you did not specify it.

## Contributing

Found a bug? You can send us a bug report by creating a new issue at
 [this link](https://github.com/andela-foladipo/book-store-api/issues). If
  you would rather fix the bug(s) than simply tell us about it, please consult
 [this document](https://help.github.com/articles/fork-a-repo/) for
 instructions on how to create a fork of this project, implement your
 solutions and submit a pull request.
 
Similarly, if you want to help add a new feature, please use
 [this document](https://help.github.com/articles/fork-a-repo/) as a guide
 on how to fork this repo, add your feature(s) and submit a pull request.
 
Lastly, you can send your
 suggestions, feedback etc by tweeting at the
 [Lead Developer](https://google.com/search?q=folusho+oladipo),
 [Folusho Oladipo](https://twitter.com/folushooladipo).


## License

This project is authored by [Folusho Oladipo](https://google.com/search?q=Folusho+Oladipo)
  and is licensed for your use, modification and distribution under
  [the MIT license](https://en.wikipedia.org/wiki/MIT_License). Feel
  free to hack, extend and share it!

Thanks for using this project. Happy hacking!
