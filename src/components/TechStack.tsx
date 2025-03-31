const TechStack = () => {
  const technologies = [
    { 
      category: 'Frontend', 
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Redux']
    },
    { 
      category: 'Backend', 
      skills: ['Node.js', 'Express', 'Python', 'Django', 'GraphQL', 'REST API']
    },
    { 
      category: 'DevOps & Tools', 
      skills: ['Git', 'GitHub Actions', 'Docker', 'AWS', 'CI/CD', 'Webpack', 'Vite']
    },
    { 
      category: 'Databases', 
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase']
    },
    { 
      category: 'Testing', 
      skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright']
    }
  ];

  return (
    <section id="tech-stack" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Tech Stack
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My technical toolkit is built on modern, scalable technologies that enable me to create 
            robust and efficient solutions.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech) => (
            <div 
              key={tech.category} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary dark:bg-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack; 