const Footer = () => {
  return (
    <footer className="bg-blue text-white py-4 text-center border-t border-blue-800">
      <p>
        Contact us at{' '}
        <a
          href="mailto:admin@gmail.com"
          className="text-yellow hover:underline"
        >
          admin@gmail.com
        </a>
      </p>
      <div className="border-t border-cerulean mt-8 pt-8 text-center ">
        <p>&copy; 2023 The Big Apple Apprentice Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
