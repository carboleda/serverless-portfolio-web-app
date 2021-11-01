# Serverless Portfolio Web App

- [Software prerequisites](#software-prerequisites)
- [Repository structure](#repository-structure)
- [Project implementation summary](#project-implementation-summary)
- [Running the project](#running-the-project)
    - [Setup](#setup)
    - [Running DynamoDB locally](#running-dynamoDB-locally)
    - [Execute on development mode](#execute-on-development-mode)
- [Deploy](#deploy)
    - [Backend](#backend)
    - [Frontend](#frontend)
- [Coding approach](#coding-approach)
- [Spent time](#spent-time)
- [Resources](#resources)

## Software prerequisites

- Serverless Framework with the following versions:

    ```bash
    $ sls --version
    # Output
    Framework Core: 2.64.1
    Plugin: 5.5.0
    SDK: 4.3.0
    Components: 3.17.1
    ```

    If you don't have it installed, you can see instructions [here](https://www.serverless.com/framework/docs/getting-started)

- Docker Engine version `19.03.12` or similar. If you don't have it installed, you can see instructions [here](https://docs.docker.com/engine/install/)
- Docker Compose version `1.26.2` or similar. If you don't have it installed, you can see instructions [here](https://docs.docker.com/compose/install/)
- (Optional) If you want to execute the project in development mode, you need to install NodeJs `v14.16.0` and NPM `v6.14.11` (or YARN `v1.22.15`). If you use [yarn](https://yarnpkg.com/getting-started/install) as a package manager the versions are going to be validated
- (Optional) If you want to connect to DynamoDD local, you could install [DynamoDB Manager](https://github.com/YoyaTeam/dynamodb-manager).
    - Use the variable `DYNAMODB_LOCAL_REGION` and `DYNAMODB_LOCAL_ENDPOINT` available on `backend/.env.dev`

## Repository structure

This is a kind of Monorepo since it contains two projects, backend, and frontend. Below you will see an overview.

- [Backend](backend/README.md)
- [Fronted](frontend/README.md)

```bash
|-- serverless-portfolio-web-app
		|-- backend
		|   |-- ...
		|   |-- package.json
		|   |-- .env
		|   |-- .env.dev
		|   |-- ...
		|-- frontend
		    |-- ...
		    |-- package.json
		    |-- .env
		    |-- .env.dev
		    |-- ...
```

**IMPORTANT:** Is important to understand that even though both projects share the same repository they completely work and are deployed separated

## Project implementation summary

This project was implemented using the next tools or libraries:

- Backend
    - NodeJs, Typescript, ExpressJs, *Serverless Framework*, Docker, and DynamoDB
    - To run and deploy this project you only will need to install Serverless globally since everything is based on it
    - The Twitter authentication is implemented using the [OAuth 2.0 Bearer Token](https://developer.twitter.com/en/docs/authentication/oauth-2-0) flow
    - The server runs in [http://127.0.0.1:3000](http://127.0.0.1:3000/)
    - Everything is deployed on AWS
- Frontend
    - NodeJs, Typescript, ReactJs, NextJs
    - To run and deploy this project you only will need to install Vercel globally since everything is based on it
    - The server runs in [http://127.0.0.1:4000](http://127.0.0.1:4000)
    - Everything is deployed on Vercel

## Running the project

### Setup

1. Setup environment variables:
    1. On the `backend` directory, create files `.env.dev` and `.env`  with the following content

        ```bash
        NODE_ENV=dev
        PORT=3000
        TWITTER_ENDPOINT=https://api.twitter.com
        LIMIT_TWEETS=5
        TTL_TWEETS=120000
        TWITTER_BEARER_TOKEN="Bearer BEARER_TOKEN"
        DYNAMODB_LOCAL_REGION=localhost
        DYNAMODB_LOCAL_ENDPOINT=http://localhost:8000
        ```

        ```bash
        NODE_ENV=produnction
        PORT=3000
        TWITTER_ENDPOINT=https://api.twitter.com
        LIMIT_TWEETS=5
        TTL_TWEETS=300000
        TWITTER_BEARER_TOKEN="Bearer BEARER_TOKEN"
        ```

    2. On the `frontend` directory, create files `.env.local` with the following content

        ```bash
        NEXT_PUBLIC_API="http://localhost:3000/api"
        ```

2. Get your API Key and Secret tokens
    1. Get Bearer Token using Twitter API and [Basic authentication](https://developer.twitter.com/en/docs/authentication/basic-auth).
    Replace `API_KEY` and `API_SECRET_KEY` with own tokens

        ```bash
        curl --user "API_KEY:API_SECRET_KEY" \
            --data 'grant_type=client_credentials' \
            'https://api.twitter.com/oauth2/token'

        # Output
        {"token_type":"bearer","access_token":"YOUR_BEARER_TOKEN"}
        ```

    2. In `backend/.env` and `backend/.env.dev` files, replace `BEARER_TOKEN` with the one you just got
3. Install CLIs globally

    ```bash
    npm i -g serverless # For running and deploying the backend
    npm i -g vercel # For deploy the frontend
    ```

4. Install Node dependencies. The next command must be executed on the `backend` and `frontend` project directories

    ```bash
    yarn
    ```


### Running DynamoDB locally

1. Install Docker Engine and Docker Compose services, then start Docker Engine
2. Open a terminal or console and navigate to the `backend` project directory
3. Install DynamoDB Local

    ```bash
    serverless dynamodb install
    ```

4. Execute using `docker-compose`

    ```bash
    docker-compose up
    ```

    ```bash
    docker-compose up --build
    ```


### Execute on development mode

1. Execute on development mode

    **IMPORTANT:** The next commands must be executed on the `backend` and `frontend` project directories

    1. Open separate terminals or consoles one for each one, `backend` and `frontend`
    2. Execute project on development mode

        ```bash
        yarn run dev
        or
        yarn run dev:debug # Only for the backend project
        ```

    3. (Optional) Execute tests

        ```bash
        yarn test # Only for the backend project
        ```


## Deploy

**IMPORTANT:** Before deploying the projects you need to have everything set up. See [here]()

### Backend

1. Be sure you have a [Serverless](http://serverless.com) and [AWS](http://aws.amazon.com). To connect both of them see [here](https://www.serverless.com/framework/docs/guides/providers#adding-providers-to-your-organization)
2. Using the terminal or console go to the `backend` project directory
3. To create the project on Serverless Dashboard, follow the instructions below:

    ```bash
    # Execute the command
    serverless

    # You will see questions similar to the following...
    What would you like to do? # Answer with Y
    Do you want to deploy your project? # Answer with n
    ```

4. Execute the following command

    ```bash
    yarn run deploy

    # You will see an output similar to the following
    Service Information
    service: backend
    stage: production
    region: us-east-1
    stack: backend-production
    resources: 17
    api keys:
      None
    endpoints:
      ANY - https://4d2vy5deo5.execute-api.us-east-1.amazonaws.com
    functions:
      api: backend-production-api
    layers:
      None
    ```

5. From the output you got, take into account the URL below `endpoints`, you will need it to deploy the frontend project

### Frontend

1. Be sure you have a [Vercel](https://vercel.com/) account
2. Using the terminal or console go to the `frontend` project directory
3. To create the project on Vercel, follow the instructions below:

    ```bash
    # Execute the command
    vercel

    # You will see questions similar to the following...
    ? Set up and deploy "../frontend"? [Y/n] y
    ? Which scope do you want to deploy to? Carlos Arboleda
    ? Link to existing project? [y/N] n
    ? What’s your project’s name? frontend
    ? In which directory is your code located? ./
    ? Want to override the settings? [y/N] n
    ```

4. Add environment variable through the CLI. Replace `LAMBDA_ENDPOINT` for the one got in the last step of backend deploy

    ```bash
    # Execute the command
    vercel env add NEXT_PUBLIC_API

    # You will see questions similar to the following...
    ? What’s the value of NEXT_PUBLIC_API? LAMBDA_ENDPOINT/api
    ? Add NEXT_PUBLIC_API to which Environments (select multiple)? <a> to toggle all
    ```

5. Execute the following command so that the environment variable be loaded

    ```bash
    yarn run deploy
    ```


## Coding approach

- I chose Typescript as a coding language because allows to use better programming features and disign patterns.
- The backend project was implemented using Serverless Framework because it helps me to do things simpler.
- I decided to use the Bearer token over Api tokens because Twitter Bearer is easier to manage and it does not expires unless it be explicitly revoked.
- The project might seem an overkill but the idea was show my coding skills

## Spent time

I spent approximately `36 hours` working on the challenge, most of the time was spent looking for documentation about  Serverless Framework setups since this is my first project using the framework. You can see detailed information [here](https://wakatime.com/@002ff661-bfcc-4831-bfca-4c3ad40ae0b5/projects/ygcrtnjnzq?start=2021-10-26&end=2021-11-01).

## Resources

- [Deployed Fronted](https://frontend-carboleda.vercel.app/)