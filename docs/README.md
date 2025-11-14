# KubeVista Documentation

This directory contains the complete user documentation for KubeVista, built with [Mintlify](https://mintlify.com).

## Viewing Documentation Locally

### Option 1: Using npm script (Recommended)

From the project root:

```bash
npm run docs
```

The documentation will be available at `http://localhost:3001`

### Option 2: Using npx directly

```bash
cd docs
npx mint@latest dev
```

The documentation will be available at `http://localhost:3000`

### Option 3: Global installation

Install the Mintlify CLI globally (optional):

```bash
npm i -g mint
cd docs
mint dev
```

## Documentation Structure

```
docs/
├── mint.json                 # Mintlify configuration
├── introduction.mdx          # Introduction page
├── quickstart.mdx           # Quick start guide
├── user-guide/              # User guides
│   ├── dashboard.mdx
│   ├── deployments.mdx
│   ├── pods.mdx
│   ├── nodes.mdx
│   ├── configmaps-secrets.mdx
│   ├── hpa.mdx
│   ├── events.mdx
│   ├── topology.mdx
│   └── search-filters.mdx
├── github/                  # GitHub integration
│   ├── overview.mdx
│   ├── oauth-setup.mdx
│   ├── github-app-setup.mdx
│   ├── yaml-editor.mdx
│   └── pull-requests.mdx
├── configuration/           # Configuration guides
│   ├── cluster-connection.mdx
│   ├── namespaces.mdx
│   ├── settings.mdx
│   └── demo-mode.mdx
└── api-reference/          # API documentation
    └── introduction.mdx
```

## Writing Documentation

### MDX Format

All documentation files use MDX (Markdown + JSX) format, which allows you to:
- Use standard Markdown syntax
- Include React components
- Add interactive elements

### Mintlify Components

Use these special components in your documentation:

```mdx
<Card title="Title" icon="icon-name" href="/link">
  Description
</Card>

<CardGroup cols={2}>
  <Card>...</Card>
  <Card>...</Card>
</CardGroup>

<Accordion title="Title">
  Content
</Accordion>

<AccordionGroup>
  <Accordion>...</Accordion>
</AccordionGroup>

<Note>
  Important information
</Note>

<Warning>
  Warning message
</Warning>

<Tip>
  Helpful tip
</Tip>

<Steps>
  <Step title="Step 1">
    Instructions
  </Step>
  <Step title="Step 2">
    Instructions
  </Step>
</Steps>
```

## Publishing Documentation

### Option 1: Mintlify Cloud (Recommended)

1. Create a Mintlify account at [mintlify.com](https://mintlify.com)
2. Install the Mintlify GitHub App
3. Connect your repository
4. Documentation will auto-deploy to `<your-project>.mintlify.app`

### Option 2: Self-Hosted

You can build and host the documentation yourself:

```bash
mint build
```

This generates a static site that can be deployed to any hosting platform.

## Contributing

When adding new documentation:

1. Create a new `.mdx` file in the appropriate directory
2. Add it to `mint.json` navigation
3. Follow the existing structure and style
4. Test locally with `mint dev`
5. Submit a pull request

## Resources

- [Mintlify Documentation](https://mintlify.com/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Icon Library](https://fontawesome.com/icons)
