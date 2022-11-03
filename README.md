# ActiveFence

# Rate Limiter
rate limiter server

### Endpoints
**GET /rate-limiter/token-bucket**</br>
Get a Token bucket of 1 request per second with ratio of 1 token refill, unlimited a day
**GET /rate-limiter/enterprise**</br>
Get 100 requests per second - unlimited per day
**GET /rate-limiter/pro**</br>
Get 10 requests per second - 12,000 per day
**GET /rate-limiter/free**</br>
Get 1 requests per second - 50 per day

*******
## JaveScript(NodeJs)
The project is under the `backend` folder
- local redis on default port is required

#### Explanation
Created an architechture of files, server at the top, then we will have "Redis" and "Rate Limiting" services
the rate limiter works with token bucket so it could limit requests per second, token bucket works as a bucket
that keep refilling itself while watching for the right amount.
In addition I've implemented a redis solution inside the token bucket rate limiter in order to maintain an
expire time for each individual using the api, and it could be used in a distributed system.

#### Installation
`npm i`

#### Run tests
To run the service tests
`npm run test`

#### Run the server
To run the service you can use this command
`npm start`

The server will run on localhost:5000
