# EvmosTask

This repository was created as solution to the <a href="Take%20Home%20exercise%20Full%20stack%20.pdf" target="_blank">Take-Home assignment</a> for the Evmos team.

The project is hosted at <a href="https://evmos-task.vercel.app" target="_blank">https://evmos-task.vercel.app</a>

## Understand this workspace

This workspace was created with [NX](https://nx.dev).
It contains one application `apps/client` and various libraries `libs/*` which are consumed by the app.

_Note:_ This workspace uses [pnpm](https://pnpm.io/) as the package manager. If you don't have it installed, you can install it with `npm install -g pnpm`. Or just use `npm`/`npx` instead of `pnpm`/`pnpx` in the commands below.

**Install Depencencies**

```
pnpm install
```

**Build:**

```
pnpx nx build client
```

**Run locally:**

```
pnpx nx serve client
```

**Lint & Test:**

```
pnpx nx lint client
pnpx nx test client
```

## High Level Architecture

This project is a monorepo folling Domain-Driven Design (DDD) principles.
The project split into layers:

- **Interfaces**: Interfaces define the contracts between the layers
- **Entities**: Tokens
- **Infrastructure**: Contains the API and external Module Adapters
- **Application**: Contains the Domain store and the Application Facade.

- **Features/UI**: Contains React components and the UI logic.

## Challenges

Becoming familiar with various Bockchain specific concepts such as Tokens/Coins and how to query them.

What is the difference between Evmos EthAddresses, Cosmos Addresses, and Hex Addresses?

Overall, documentation within the Blockchain space exists but could be more discoverable and homogenous to facilitate quicker onboarding for new developers.

## Focus Points

Maintainability and scalability of the project were key consideration, i.e. making it easy to test and develop.
It showcases several design choices for React applications to this end (e.g. the decision to keep the domain layers mostly void of React specific code).

## Shortcomings

**Missing backend service:**
I decided against adding a backend service even though many features of this application would benefit from it (e.g. using CoinGeck Pro to avoid rate-limiting, different blockchain specific libraries are build for a NodeJS environment, optimizing request payloads). Reasons were time constraints and me valuing the separation of client & server code. That being said, for production use a backend has to be added. Either via NextJS as suggested or via dedicated API service.

**Error handling:**
The app contains only minimal error-handling and reporting. E.g. failed api-requests are only recoverable via reload.

**UI/UX:**
The UI is barely more than a wireframe and build to be functional. Given that I, as developer/engineer, excell at implementation and not design I avoided investing time into improved UI/UX since time was limited.

**Tests / Storybook:**
The probject only contains unit tests for domain logic and rudimentary e2e tests. Going forward it would be very valuable to add Storybook/UI tests to ensure accessibliity, styling, responsiveness, etc, as well as adding e2e tests and integration tests where appropriate.



