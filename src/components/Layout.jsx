import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

function NavigationLink({ to, icon, children }) {
  return <NavLink to={to} className="sidebar-link"><Icon name={icon} size={18} /><span>{children}</span></NavLink>;
}

export default function Layout() {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const isManager = user?.role === 'manager';
  return <div className="app-shell">
    <aside className="sidebar">
      <NavLink to="/" className="brand"><span className="brand-mark"><Icon name="box" size={21} /></span><span>Campus <b>Matériel</b></span></NavLink>
      <div className="sidebar-label">Navigation</div>
      <nav className="sidebar-nav"><NavigationLink to="/catalogue" icon="home">Catalogue</NavigationLink>{isManager ? <NavigationLink to="/gestion" icon="settings">Gestion du catalogue</NavigationLink> : <NavigationLink to="/mes-reservations" icon="book">Mes réservations</NavigationLink>}</nav>
      <div className="sidebar-bottom"><div className="sidebar-label">Aide</div><NavigationLink to="/acces-refuse" icon="help">Centre d’aide</NavigationLink><div className="sidebar-tip"><span className="tip-dot" /><div><strong>Besoin d’un équipement ?</strong><small>Consultez le catalogue</small></div></div></div>
    </aside>
    <div className="workspace"><header className="topbar"><div className="mobile-brand"><span className="brand-mark"><Icon name="box" size={18} /></span>Campus <b>Matériel</b></div><div className="topbar-context">{isManager ? 'Administration' : 'Espace étudiant'} <span>/</span> Catalogue</div><div className="topbar-actions"><button className="round-button" title="Notifications"><Icon name="bell" size={18} /><span className="notification-dot" /></button><div className="user-menu"><div className="avatar">{user?.nom.split(' ').map((word) => word[0]).join('')}</div><div className="user-copy"><strong>{user?.nom}</strong><span>{isManager ? 'Responsable' : 'Étudiant'}</span></div><button className="icon-button" onClick={() => { logout(); navigate('/login'); }} title="Se déconnecter"><Icon name="logout" size={17} /></button></div></div></header><main className="main-content"><Outlet /></main><footer>Campus Matériel <span>•</span> Plateforme de prêt de l’établissement</footer></div>
  </div>;
}
