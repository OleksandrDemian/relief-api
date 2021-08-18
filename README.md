# Relief
Communicating with testers can be difficult. Let Relief update the testers on what should be tested.

## What is Relief?
Relief is a tool that lets you to create a connection between code and tests. When you change the code and push it to your repository, Relief will take care of understanding what
is the impact of the changes on your app, and and notify the testers what should be tested.

**What is wrong with automated tests?**
Automation tests is an essential part of a software product. However, it's very hard to cover the entire app with automation tests, and it can create more pain than benefit for
some parts of the application that change frequently. And let's not start talking about tests that are impacted by human cognition, where manual testing shines over automation.

### What is `relief-api`?
Relief api is an API layer to the Relief tool. It exposes API endpoints to the [relief-client](https://github.com/OleksandrDemian/relief-client) and the `relief-invalidator`
projects.

### Features
* APIs to create and manage projects
* APIs to create and manage tests
* APIs to connect your project to the repository

## Tech
Relief API is build using [Nest.js](https://nestjs.com/) framework

## Notes
This project is currently **abandoned**.

**See also**: [relief-client](https://github.com/OleksandrDemian/relief-client)
