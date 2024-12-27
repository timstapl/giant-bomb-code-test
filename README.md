# Gravie Software Engineer Challenge

## Synopsis

For this challenge you will consume the Giant Bomb API to create an application that will allow a
user to search games and "rent" them. The application should consist of at least two unique pages
(`search` and `checkout`). Your view should display the game thumbnail and title, and the rest is up
to you. You can use any language and or framework you'd like. 

![Giant Bomb](https://upload.wikimedia.org/wikipedia/en/4/4b/Giant_Bomb_logo.png)

You can get started by signing up for an API key [here](https://www.giantbomb.com/api/).

Note: You'll most likely need to use the social media technique for logging in (2022-05-16: confirmed this works with google.)  Once you're logged in, go back to the [API page](https://www.giantbomb.com/api/) to access your key.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## Test info

### Live site

- This project has been deployed to: https://giantbombcodetest.netlify.app/

### To Do List

This is just a brief list of the needed items I saw when starting this. They will likely not all get done as part of this challenge, but I wanted to indicate what next steps I saw as well.

- [X] Scaffold out project
- [X] Search via Giant Bomb API
- [X] Item Details Page
- [X] Auth
- [X] Search Pagination
- [X] Add items to cart
- [X] Cart View
- [ ] Checkout
- [ ] Loading States
- [ ] Empty States

These ended up being future targets:

- [ ] Error States
- [ ] Search page(s) recoverable/sharable URLs
- [ ] Caching Layer
- [ ] Database to track stock and who has checked out what
- [ ] Franchise View
- [ ] Genre View
- [ ] Mature API to an EC2 instance, rather than serverless
- [ ] Reverse Proxy and Load Balancer for API
- [ ] User Roles (Owner, Admin, Client)
- [ ] Admin area to update stock levels, add new games

