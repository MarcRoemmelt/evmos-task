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

## Focus Points

Maintainability and scalability of the project were key consideration.
The project is build to facilitate future changes and not as a quick one-off solution.

## Corners Cut

- Missing backend service
- No proper error handling / reporting
- Styling / UX is not great
- No UI Tests / Storybook
