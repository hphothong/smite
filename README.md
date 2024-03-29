# Smite Website

[![CI/CD](https://github.com/hphothong/smite/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/hphothong/smite/actions/workflows/ci-cd.yml)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Getting Started

This application uses environment files to access your Smite API credentials.
To get started, create a development file called `.env.development.local`.
This file should NOT be committed to the repository. See the expected format below:

```
SMITE_DEVELOPER_ID=XXX
SMITE_AUTH_KEY=XXX
```

You may now start the development server

```bash
npm run dev
```

Open [http://localhost:3000/smite](http://localhost:3000/smite) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy

This application uses Github Actions to test and deploy the code.
