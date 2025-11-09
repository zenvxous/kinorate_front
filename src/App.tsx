import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import MyProfilePage from './pages/MyProfilePage';
import MyMoviesPage from './pages/MyMoviesPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import MoviePage from './pages/MoviePage';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <MyProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-movies"
              element={
                <ProtectedRoute>
                  <MyMoviesPage />
                </ProtectedRoute>
              }
            />
             <Route
              path="/movies/:movieId"
              element={
                <ProtectedRoute>
                  <MoviePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;