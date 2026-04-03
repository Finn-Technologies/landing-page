# Finn

Marketing site for Finn, built with React, Vite, and React Router.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## GitHub setup

Git is already initialized in this folder on the `main` branch.

1. Set your git author info:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

2. Log into GitHub CLI:

```bash
gh auth login
```

3. Create an initial commit:

```bash
git add .
git commit -m "Initial site setup"
```

4. Create the repo and push it:

```bash
gh repo create finn --source=. --private --push
```

If you want it public instead, replace `--private` with `--public`.

## Vercel setup

This project includes [`vercel.json`](./vercel.json) so client-side routes like
`/about` and `/explore` work correctly on Vercel.

1. Log into Vercel CLI:

```bash
vercel login
```

2. Link and deploy the project:

```bash
vercel
```

3. Push a production deploy:

```bash
vercel --prod
```

## Notes

- GitHub CLI (`gh`) is installed locally.
- Vercel CLI is installed globally.
- If you prefer the Vercel dashboard flow, you can import the GitHub repo there after pushing.
