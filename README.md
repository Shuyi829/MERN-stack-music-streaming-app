# Music streaming service interface

This project is a front-end and back-end separated Vue project. The front-end is built using React, Ant Design, and Axios. The back-end is built using Node.js, Mongoose, and MongoDB. This README file is intended to provide guidance for other developers to run the demo on their local machines and understand the codebase.

## Getting Started

### Prerequisites

Before you can run the project, you must have the following installed:

- Node.js

  - You can download Node.js from the official website at [https://nodejs.org](https://nodejs.org/). Choose the appropriate version for your operating system, and follow the instructions for installation.

  - Once Node.js is installed, you can verify the installation in the terminal and running the following command:

    ```
    node -v
    ```

- MongoDB

  - Download MongoDB: download the MongoDB Community Server from the official website (https://www.mongodb.com/try/download/community) and follow the installation instructions for your operating system.

  - Create data directories: MongoDB stores data in a directory specified by the `dbpath` option. By default, this directory is `/data/db` on Linux and macOS. However, you can specify a different directory using the `--dbpath` command-line option or by setting it in the configuration file. If the data directory `/data/db` doesn't exist, you need to create it manually.

  - Start the MongoDB server: After installing MongoDB, you can start the server using the `mongod` command. You can change the port using the `--port` option.

  - Connect to the server: 
    
    Open a terminal (such as PowerShell on Windows) to move to the installation directory of MongoDB, like:
    `````
    cd C:\Program Files\MongoDB\Server\6.0\bin
    `````
    
    Run the following command to connect to the database:
    `````
    mongod --dbpath <your-mongodb-data-directory>    # ...\data\db
    `````

    You can connect to the MongoDB server using the `mongo` command. Open another terminal and run this command.

    ```
    mongo
    ```

    By default, the `mongo` command connects to the server running on `localhost:27017`. If you're connecting to a remote server, you need to specify the host and port using the `--host` and `--port` options.

  - MongoDB Compass

    MongoDB Compass is a GUI tool for MongoDB that allows you to easily explore and manipulate your data. You can find its detailed information on https://www.mongodb.com/products/compass.

### Installation

1. Install the dependencies for both the front-end and back-end from root directory:

```
npm install
```

2. Configure the environment variables for the back-end. In the `backend` directory, create a `.env` file and add the following:

```
MONGO_URI=<your-mongodb-uri>
```

​		Replace `<your-mongodb-uri>` with the URI of your MongoDB database(usually mongodb://localhost:27017).

3. Start the server. In the `BackEnd` directory, run:

```
npm run start
```

4. Start the client. In the `FrontEnd` directory, run:

```
npm run start
```
The server will automatically open a window in your browser.

5. 
```
To register an account in the web database:
For email:Please enter 4 to 20 characters in English and numbers that conform to the mailbox format and end with a .com(eg.95677@qq.com)
For username:Please enter 4 to 20 characters consisting of English and numbers, and the number cannot be precededed.(eg. CS2201)
For password:Please enter 6 to 20 characters consisting of English and numbers.(eg.cs732great)
```

# Interface usage

## '/me' mthod:get
Get user data based on token
## '/search' mthod:get
Query song information
## '/login' mthod:get
The user is logged in, and encryption is used
## '/register' mthod:post
Registered user
## '/music' mthod:delete
Delete the song data in the playlist according to the song id
## '/music' mthod:post
New solo song



