# How to Setup
## setup using docker
First, get [Docker](https://docs.docker.com/get-docker/) in your machine. 

Then just run `docker compose up` from root folder to start both front-end, backend and postgresql server. Front end will run on port 3000, backend will run in port 8080 
and postgresql will run on port 5432 by default.

After that you should be able to access time zone app using this url: http://localhost:3000

To stop servers just run `docker compose down`