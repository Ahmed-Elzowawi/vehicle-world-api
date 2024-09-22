**NOTE: This repo contains a .env file and Docker secrets. These only have been committed and pushed for the sake of ease to demo the project. I'm very aware that one should not commit any sensitive data.**

<h1 align="center"> Vehicle World api </h1>

<h2 style="border-bottom: 0px" align="center">RESTful API server for vehicle world website</h2>

<a name="readme-top"></a>

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
  - [Dependencies](#dependencies)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Set-up](#set-up)
- [Usage](#usage)
- [Testing](#testing)
- [How to compile](#how-to-compile)
- [How to start the server](#how-to-start-the-server)
- [Formatting and linting](#formatting-and-linting)
- [To-do](#to-do)

## Overview

A RESTful API server that handles GET, POST, PUT, and DELETE http methods for vehicle world website.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

Typescripit - Programming Language
MongoDB - Database
Express - Server Framework
Node.js - Runtime Environment
npm - Node.js Package Manager
Docker - Containerization
Jest - Testing Framework
Prettier - Code Formatter
typescript-eslint - Linter

### Dependencies

For dependencies, please check the [package.json](package.json) file at the root of the project folder.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

### Prerequisites

For **Windows** and **macOS** users, make sure you have **docker desktop** intsalled on your system.

For **Linux** users, make sure you have **docker engine** or **docker desktop** installed on your system.

### Set-up

1. Clone the repo

   ```sh
   git clone https://github.com/Ahmed-Elzowawi/vehicle-world-api.git
   ```

   <br>

2. Create docker containers

   ```sh
   docker compose up -d
   ```

   <br>

3. Have fun coding!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Please refer to the [Documentation](https://ahmed-elzowawi.github.io/vehicles_api_docs/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Testing

We use Jest to test our source code

To run the tests:

- Outside docker container

  ```sh
  docker compose exec app npm run test
  ```

<br>

- Inside docker container

  ```sh
  npm run test
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to compile

```sh
npm run build
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How to start the server

- Development environment

  ```sh
  npm run dev
  ```

  <br>

- Production environment

  ```sh
  npm run start
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Formatting and linting

### Format

```sh
npm run format
```

### Lint

```sh
npm run lint
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## To-do

- [ ] HTTPS connection
- [ ] TLS certificate

<p align="right">(<a href="#readme-top">back to top</a>)</p>
