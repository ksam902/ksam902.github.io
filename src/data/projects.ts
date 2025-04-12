export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  link: string;
  githubLink: string;
  screenshots: string[];
  challenges: string[];
  solutions: string[];
};

export const projects: Project[] = [
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description:
      'A modern, high-performance e-commerce solution with React and Node.js. Features include cart management, user authentication, and payment integration.',
    longDescription: `
      This project involved building a comprehensive e-commerce platform from the ground up. The solution 
      addresses the needs of both shop owners and customers with an intuitive user interface and robust 
      backend functionality.
      
      Key features include product catalog management, user authentication, shopping cart, wishlist, 
      payment processing with Stripe, order management, and analytics dashboard for store owners.
      
      Technical implementation includes React for the frontend with Redux for state management, 
      Node.js and Express for the API, MongoDB for the database, and AWS S3 for image storage.
      Performance optimization was a priority, resulting in a lighthouse score above 90 for all metrics.
    `,
    technologies: ['React', 'Node.js', 'MongoDB', 'Redux', 'Stripe'],
    image: '/vercel.svg', // Placeholder - replace with actual image
    link: 'https://example.com/ecommerce',
    githubLink: 'https://github.com/example/ecommerce',
    screenshots: ['/vercel.svg', '/next.svg', '/vercel.svg'], // Placeholders
    challenges: [
      'Implementing a secure and scalable payment processing system',
      'Optimizing database queries for large product catalogs',
      'Building a responsive design that works across all devices',
    ],
    solutions: [
      'Utilized Stripe&apos;s secure payment API with custom webhook handling',
      'Implemented database indexing and caching strategies',
      'Used a mobile-first approach with Tailwind CSS',
    ],
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates. Built with React, TypeScript, and Firebase.',
    longDescription: `
      This collaborative task management application helps teams organize work and stay on track. The app 
      features real-time updates, allowing team members to see changes as they happen without refreshing.
      
      The project includes task creation, assignment, due dates, priority levels, status tracking, 
      comments, file attachments, and email notifications. The kanban board view allows users to 
      drag and drop tasks between different status columns.
      
      The frontend is built with React and TypeScript, using Firebase for authentication, 
      database, and storage. The application uses Firebase Cloud Functions for background 
      processing and notifications.
    `,
    technologies: ['React', 'TypeScript', 'Firebase', 'Material UI'],
    image: '/next.svg', // Placeholder - replace with actual image
    link: 'https://example.com/taskmanager',
    githubLink: 'https://github.com/example/taskmanager',
    screenshots: ['/next.svg', '/vercel.svg', '/next.svg'], // Placeholders
    challenges: [
      'Implementing real-time updates across devices',
      'Managing complex state with many concurrent users',
      'Building a flexible permission system',
    ],
    solutions: [
      'Used Firebase Realtime Database for instant data synchronization',
      'Implemented optimistic UI updates with proper error handling',
      'Created a role-based access control system',
    ],
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description:
      'An interactive data visualization dashboard for business metrics. Includes customizable charts and exportable reports.',
    longDescription: `
      This analytics dashboard provides business intelligence through interactive data visualizations. 
      The platform enables users to monitor key performance indicators, identify trends, and make 
      data-driven decisions.
      
      Features include customizable dashboards, real-time metrics, interactive charts and graphs, 
      data filtering, exportable reports, and user permission management. The dashboard connects 
      to various data sources through APIs.
      
      The technical stack includes Next.js for the frontend, with D3.js for advanced data 
      visualizations. The backend uses Node.js with a PostgreSQL database, and the application 
      is containerized with Docker for easy deployment.
    `,
    technologies: ['Next.js', 'D3.js', 'PostgreSQL', 'TailwindCSS'],
    image: '/vercel.svg', // Placeholder - replace with actual image
    link: 'https://example.com/analytics',
    githubLink: 'https://github.com/example/analytics',
    screenshots: ['/vercel.svg', '/next.svg', '/vercel.svg'], // Placeholders
    challenges: [
      'Processing and visualizing large datasets efficiently',
      'Creating intuitive, customizable dashboards',
      'Optimizing database queries for fast data retrieval',
    ],
    solutions: [
      'Implemented data aggregation and lazy loading strategies',
      'Developed a drag-and-drop dashboard builder with resizable widgets',
      'Used database indexing and query optimization techniques',
    ],
  },
  {
    id: 'social-media-platform',
    title: 'Social Media Platform',
    description:
      'A full-stack social media application with features like user profiles, posts, comments, and real-time notifications.',
    longDescription: `
      This social media platform enables users to connect, share content, and engage with communities. 
      The application focuses on privacy, ease of use, and performance.
      
      Features include user profiles, post creation and sharing, commenting and reactions, direct 
      messaging, communities/groups, content discovery, and real-time notifications. The platform 
      also includes robust moderation tools and reporting systems.
      
      The application is built with React for the frontend, GraphQL for efficient data querying, 
      Node.js for the backend, and MongoDB for data storage. Real-time features are implemented 
      using WebSockets.
    `,
    technologies: ['React', 'GraphQL', 'Node.js', 'MongoDB'],
    image: '/next.svg', // Placeholder - replace with actual image
    link: 'https://example.com/socialmedia',
    githubLink: 'https://github.com/example/socialmedia',
    screenshots: ['/next.svg', '/vercel.svg', '/next.svg'], // Placeholders
    challenges: [
      'Scaling to handle high user engagement',
      'Implementing efficient news feed algorithms',
      'Ensuring data privacy and security',
    ],
    solutions: [
      'Used horizontal scaling and caching strategies',
      'Developed a custom feed algorithm with relevance scoring',
      'Implemented strong encryption and security practices',
    ],
  },
];
