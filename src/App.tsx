import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const MyProfilePage = () => <div className="page-container">My Profile Page</div>;
const MyMoviesPage = () => <div className="page-container">My Movies Page</div>;
const EditProfilePage = () => <div className="page-container">Edit Profile Page</div>;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<MyProfilePage />} />
        <Route path="/my-movies" element={<MyMoviesPage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;