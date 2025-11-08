import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-copyright">
          © {currentYear} Kinorate. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;