import React from 'react';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="page-container home-content">
        <h2>Welcome to Kinorate!</h2>
        <p>
          Here you can track the movies you've watched, share your opinions, and find new masterpieces to watch.
          Use the search in the header to get started.
        </p>
      </main>
    </div>
  );
};

export default HomePage;