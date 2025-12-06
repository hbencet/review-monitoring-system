# review-monitoring-system
Review Monitoring System – Node.js Backend

This is the main backend service of the Review Monitoring System.
It collects product data and reviews, sends them to a Python AI microservice for sentiment analysis, and stores the results in a PostgreSQL database.

# Install dependencies
npm install

# Environment variables
Configure the .env file:
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=yourpassword
PG_DATABASE=review_monitoring
PYTHON_AI_URL=http://localhost:8001/analyze

# Run database migrations
npx knex migrate:latest

# Start the server
node ./src/index.js

The server will run on:
http://localhost:5000

# Swagger documentation
Swagger UI is available at:
http://localhost:5000/docs

It allows you to test all API endpoints directly in the browser.

# API endpoints
GET /products
Returns all stored products.

GET /product/:productId
Returns a single product by ID.

GET /reviews/:productId
Returns all reviews for a product.

POST /analyze-reviews
Analyze custom review texts using the AI service.

GET /analyze-product/:url
Automatically fetches product + reviews, analyzes them, and stores everything.

GET /product-stats/:productId
Returns sentiment statistics and average rating.

GET /product-stats-chart/:productId
Returns a Base64 PNG chart of sentiment distribution.

# Overview
1.Client sends a product URL or review list.
2.Backend fetches product data + reviews (DummyJSON).
3.Reviews are sent to the Python sentiment API.
4.AI returns positive / neutral / negative labels.
5.Backend saves all data in PostgreSQL.
6.Statistics and charts can be generated anytime.

# Purpose

This Node.js backend acts as the central service of the Review Monitoring System.
Its role is to handle routing, data collection, database storage, and communication with the Python AI module.

# Author
Horváth Bence Tibor - APTT01