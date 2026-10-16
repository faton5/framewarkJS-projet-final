import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import CataloguePage from './pages/CataloguePage';
import DetailPage from './pages/DetailPage';
import ReservationsPage from './pages/ReservationsPage';
import AccessDeniedPage from './pages/AccessDeniedPage';
import NotFoundPage from './pages/NotFoundPage';

const ManagementPage = lazy(() => import('./pages/ManagementPage'));

function ProtectedRoute({ children, role }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/acces-refuse" replace />;
  return children;
}

function HomeRedirect() {
  const { user } = useApp();
  return <Navigate to={user ? '/catalogue' : '/login'} replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/catalogue" element={<ProtectedRoute><CataloguePage /></ProtectedRoute>} />
        <Route path="/materiels/:id" element={<ProtectedRoute><DetailPage /></ProtectedRoute>} />
        <Route path="/mes-reservations" element={<ProtectedRoute role="student"><ReservationsPage /></ProtectedRoute>} />
        <Route path="/gestion/*" element={<ProtectedRoute role="manager"><Suspense fallback={<div className="page-loading">Chargement de la gestion...</div>}><ManagementPage /></Suspense></ProtectedRoute>} />
        <Route path="/acces-refuse" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return <AppProvider><AppRoutes /></AppProvider>;
}
