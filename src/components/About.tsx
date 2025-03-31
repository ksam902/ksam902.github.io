const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              About Me
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              I&apos;m a Development Tech Lead with over a decade of experience building scalable, 
              high-performance web applications. My journey in technology has allowed me to work with 
              a diverse range of industries and technologies.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              My passion lies in creating elegant solutions to complex problems, optimizing performance,
              and leading teams to deliver exceptional digital experiences. I value clean code, thoughtful 
              architecture, and maintainable systems.
            </p>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Outside of coding, I enjoy hiking, reading about emerging technologies, and mentoring 
              up-and-coming developers.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Experience</h3>
                <p className="text-gray-600 dark:text-gray-300">10+ years in web development</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Specialization</h3>
                <p className="text-gray-600 dark:text-gray-300">Front-end architecture, Performance optimization</p>
              </div>
            </div>
          </div>
          
          <div className="lg:ml-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-primary text-2xl font-bold mb-2">5+</div>
                <div className="text-gray-900 dark:text-white font-medium">Years as Team Lead</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-primary text-2xl font-bold mb-2">50+</div>
                <div className="text-gray-900 dark:text-white font-medium">Projects Completed</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-primary text-2xl font-bold mb-2">15+</div>
                <div className="text-gray-900 dark:text-white font-medium">Technologies Mastered</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="text-primary text-2xl font-bold mb-2">20+</div>
                <div className="text-gray-900 dark:text-white font-medium">Team Members Mentored</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 