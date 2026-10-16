import { Link } from 'react-router-dom';
import { Icon } from '../components/Icons';
export default function AccessDeniedPage() { return <div className="page centered-page"><div className="empty-icon warning-icon"><Icon name="close" size={25} /></div><div className="eyebrow">ACCÈS REFUSÉ</div><h1>Cette page n’est pas disponible.</h1><p>Votre profil ne possède pas les droits nécessaires pour consulter cette section.</p><Link className="button secondary" to="/catalogue">Retour au catalogue</Link></div>; }
