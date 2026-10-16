import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export default function Layout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  return <div className="app-shell">
    <header className="topbar">
      <NavLink to="/" className="brand"><span className="brand-mark"><Icon name="box" size={22} /></span><span>Campus <b>Matériel</b></span></NavLink>
      {user && <nav className="main-nav">
        <NavLink to="/catalogue">Catalogue</NavLink>
        {user.role === 'student' && <NavLink to="/mes-reservations">Mes réservations</NavLink>}
        {user.role === 'manager' && <NavLink to="/gestion">Gestion du catalogue</NavLink>}
      </nav>}
      {user && <div className="user-menu"><div className="avatar">{user.nom.split(' ').map((word) => word[0]).join('')}</div><div className="user-copy"><strong>{user.nom}</strong><span>{user.role === 'manager' ? 'Responsable' : 'Étudiant'}</span></div><button className="icon-button" onClick={() => { logout(); navigate('/login'); }} title="Se déconnecter"><Icon name="logout" size={18} /></button></div>}
    </header>
    {user && <div className="mobile-nav"><NavLink to="/catalogue">Catalogue</NavLink>{user.role === 'student' && <NavLink to="/mes-reservations">Réservations</NavLink>}{user.role === 'manager' && <NavLink to="/gestion">Gestion</NavLink>}</div>}
    <main className="main-content"><Outlet /></main>
    {user && <footer>Campus Matériel <span>•</span> Plateforme de prêt de l’établissement</footer>}
  </div>;
}
