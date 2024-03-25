# Node API Challenge

## Description

This project is a technical challenge that implements a RESTful API using Node.js with the NestJS framework. The API connects to a MongoDB database to manage product and order data and implements JWT for authentication strategy. The goal is to provide a simple yet functional system that enables a new company to manage products and orders.

## Features

- **RESTful API** created with NestJS.
- Connection to **MongoDB** with `@nestjs/mongoose`.
- Authentication with **JWT**.
- CRUD operations for **products** and **orders**.
- Calculate the total sold price in the last month and the highest amount order.

## Prerequisites

To run this project, you need to have Docker installed on your machine. This will allow you to lift the MongoDB database and the Node API without needing additional configurations in your local environment.

## Installation and Execution

1. **Clone the repository:**

git clone https://github.com/LBaccillere/challenge-keni.git
cd challenge-keni

2. **Lift the services with Docker Compose:**

docker-compose up -d


This command will build the necessary Docker images (if it's the first time you run it) and lift the containers for MongoDB and the Node API.

## Testing the API

To explore and test the API endpoints, access:

http://localhost:3000/swagger#/


Here you will find the API documentation generated with Swagger, which will allow you to easily execute all available operations.

### Steps for Authentication

1. **Register:** Use the registration endpoint to create a new user.
2. **Login:** Log in with the credentials of the registered user. You will receive an `access_token` in the response.
3. **Authorize:** Copy the received `access_token` and click the `Authorize` button in the top right corner of the Swagger UI. Paste the token preceded by the word `Bearer` and confirm. Now you can use the other endpoints that require authentication.

## Main Endpoints

- **Create Product:** Allows the creation of a new product.
- **Request Product:** Gets the information of a specific product.
- **Create Order:** Creates a new order.
- **Update Order:** Allows modifying an existing order.
- **Total Sold:** Calculates the total sold in the last month.
- **Highest Amount Order:** Gets the order with the highest amount.

---

This README provides a basic guide to get started with the project.