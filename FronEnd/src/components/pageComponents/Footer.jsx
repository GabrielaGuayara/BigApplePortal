const Footer = () => {
  return (
    <footer className="w-full bg-sky-300 text-base-content p-4 mt-auto">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-between text-center md:flex-row md:text-left">
        <div>
          <p className="text-gray-700 text-lg">
            &copy; 2024 Gabriela Guayara. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Passionately crafting web experiences for a better tomorrow.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <a href="https://twitter.com/yourprofile" className="text-gray-700 hover:text-gray-900">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="text-gray-700 hover:text-gray-900">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href="mailto:your.email@example.com" className="text-gray-700 hover:text-gray-900">
            <i className="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
