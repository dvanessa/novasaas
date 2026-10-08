# Contributing

Contributions are welcome. Please keep changes focused and discuss larger
proposals in an issue before starting implementation.

## Development

1. Fork the repository, or create a branch in your checkout, for example:
   `feat/short-description`.
2. Install the supported Node.js and npm versions listed in the README, then
   install dependencies with `npm ci`.
3. Before opening a pull request, run:

   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run format:check
   npm run audit:production
   npm run build
   ```

4. Open a focused pull request describing the change, its motivation, and the
   verification performed. Keep unrelated cleanup in separate changes.

## Bug reports

Report reproducible bugs through GitHub Issues. Include relevant steps and
expected behavior, but never include passwords, access tokens, customer data,
private URLs, or other sensitive information.
