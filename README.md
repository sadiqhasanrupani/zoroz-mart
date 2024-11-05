# Zoroz Mart Documentation

Zoroz Mart is an e-commerce website project. This documentation provides instructions on how to set up and run the project on your local machine.

## Getting Started

To run this project locally, follow the steps below:

### Clone the Repository

Clone this repository to your local machine by running the following command in your terminal:

```bash
git clone https://github.com/sadiqhasanrupani/zoroz-mart.git
```

### Navigate to the Repository

Navigate to the cloned repository:

```bash
cd zoroz-mart
```

### Set Up Client and Server

You will need to run both the client and server for the project. Open two terminals and navigate to the `easy-mart` repository in both.

In the first terminal, navigate to the client directory:

```bash
cd client
```

Install the client dependencies:

```bash
npm install
```

In the second terminal, navigate to the server directory:

```bash
cd server
```

#### Update the `.env` File

Before setting up the server, update the `.env` file located in the server repository. Update the MySQL password according to your local machine's configuration. If the password is not set, leave it as an empty string (`""`).

```
# PORT
PORT=8080

# LocalHost Database
SQL_DATABASE=zoroz_mart_db
SQL_HOST=localhost
SQL_USER=root
SQL_PASSWORD=password
SQL_PORT=3306

# Secrets
SECRET_KEY=123456zoroz_mart_db@@
```

### Create Database

Create a database named `zoroz_mart_db` in your MySQL server.

### Set Up Server

Back in the server terminal, install the server dependencies:

```bash
npm install
```

Push the database migrations:

```bash
npm run drizzle:push
```

Build the server:

```bash
npm run build
```

Start the server:

```bash
npm run dev
```

### Start Client Server

In the client terminal, start the client server:

```bash
npm run dev
```

## Conclusion

Following these steps will allow you to set up and run the Zoroz Mart e-commerce website project on your local machine. Ensure all commands are executed in the respective directories and in the specified order for successful setup and execution.