import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

function NavigationLink({ to, children }) {
  return <NavLink to={to} className="top-nav-link">{children}</NavLink>;
}

export default function Layout() {
  const { user, bookings, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const isManager = user?.role === 'manager';
  const currentPage = location.pathname.startsWith('/gestion') ? 'Gestion du matériel' : location.pathname.startsWith('/mes-reservations') ? 'Mes réservations' : 'Catalogue';
  return <div className="app-shell">
    <header className="topbar"><NavLink to="/" className="brand"><span className="brand-mark"><Icon name="box" size={21} /></span><span>Campus <b>Matériel</b></span></NavLink><span className="product-pill">Portail de prêt</span><nav className="top-nav"><NavigationLink to="/catalogue">Catalogue</NavigationLink>{user?.role === 'student' && <NavigationLink to="/mes-reservations">Mes réservations {bookings.filter((booking) => booking.etudiantId === user.id).length > 0 && <span className="nav-count">{bookings.filter((booking) => booking.etudiantId === user.id).length}</span>}</NavigationLink>}{isManager && <NavigationLink to="/gestion">Gestion du matériel</NavigationLink>}</nav><div className="topbar-actions"><div className="top-user"><div className="avatar">{user?.nom.split(' ').map((word) => word[0]).join('')}</div><div className="user-copy"><strong>{user?.nom}</strong><span>{isManager ? 'Responsable' : 'Étudiant'}</span></div></div><button className="round-button" onClick={() => { logout(); navigate('/login'); }} title="Se déconnecter"><Icon name="logout" size={17} /></button></div></header>
    <div className="contextbar"><span><Icon name="home" size={14} /> / Plateforme Campus / <b>{currentPage}</b></span><span className="campus-status"><i /> Borne campus ouverte <code>Bâtiment C · RDC</code></span></div>
    <main className="main-content"><Outlet /></main>
    <footer>Campus Matériel <span>•</span> Service de prêt universitaire <span>•</span> Données locales <code>localStorage</code></footer>
  </div>;
}
