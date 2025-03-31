# Kyle's Portfolio

A modern portfolio website built with Next.js, TailwindCSS, and TypeScript, designed to showcase professional experience, skills, and projects.

## Features

- **Static Site Generation**: Fast performance and SEO-friendly
- **Responsive Design**: Looks great on all devices
- **Dark/Light Mode**: Automatically adapts to user's system preferences
- **Project Showcase**: Detailed project pages with descriptions, technologies, challenges, and solutions
- **Tech Stack Display**: Visual representation of technical skills
- **Contact Form**: Easy way for visitors to get in touch
- **Social Links**: Connect with me on various platforms
- **GitHub Pages Deployment**: Simple deployment process

## Getting Started

First, clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Personal Information

Edit the following files to customize the portfolio with your information:

- `src/components/Hero.tsx`: Update introduction text
- `src/components/About.tsx`: Update your background and experience
- `src/components/Contact.tsx`: Update contact information
- `src/components/Footer.tsx`: Update footer information

### Projects

Update or add projects in `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "project-id",
    title: "Project Title",
    description: "Short description",
    longDescription: `
      Detailed multi-paragraph description...
    `,
    technologies: ["Tech1", "Tech2"],
    image: "/path-to-image.jpg",
    link: "https://project-demo.com",
    githubLink: "https://github.com/username/project",
    screenshots: ["/screenshot1.jpg", "/screenshot2.jpg"],
    challenges: ["Challenge 1", "Challenge 2"],
    solutions: ["Solution 1", "Solution 2"],
  },
  // Add more projects...
];
```

### Tech Stack

Modify your tech stack in `src/components/TechStack.tsx`:

```typescript
const technologies = [
  {
    category: "Frontend",
    skills: ["Your", "Skills", "Here"],
  },
  // Add more categories...
];
```

### Theme

Customize theme colors in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: "#your-primary-color",
      secondary: "#your-secondary-color",
      accent: "#your-accent-color",
    },
    // ...
  },
},
```

## Deployment

The portfolio is configured for GitHub Pages deployment using GitHub Actions.

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://yourusername.github.io/portfolio`

To manually deploy:

```bash
npm run build
# Generated static files will be in the 'out' directory
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework with SSG support
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GitHub Actions](https://github.com/features/actions) - CI/CD workflow

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
