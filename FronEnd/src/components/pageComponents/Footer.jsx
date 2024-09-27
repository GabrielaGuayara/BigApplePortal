import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-2xl font-bold mb-4">The Big Apple Apprentice Portal</h3>
          <p>Connecting talented individuals with exciting apprenticeship opportunities in New York City.</p>
        </div>
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul>
            <li><Link to="/opportunities" className="hover:text-yellow-400">Opportunities</Link></li>
            <li><Link to="/welcome-employers" className="hover:text-yellow-400">Employers Page</Link></li>
            <li><Link to="/signup" className="hover:text-yellow-400">Sigup</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="text-white hover:text-yellow-400"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-800 mt-8 pt-8 text-center">
        <p>&copy; 2023 The Big Apple Apprentice Portal. All rights reserved.</p>
      </div>
    </div>
  </footer>
  );
};


export default Footer;
