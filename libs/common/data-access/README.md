# common-data-access

This library provides shared data access services.

## Http

A http client that can be injected via provider.
This is useful for:

- mocking http requests in tests.
- sharing features like error-handling, logging, etc.

Uses `ky` under the hood.
