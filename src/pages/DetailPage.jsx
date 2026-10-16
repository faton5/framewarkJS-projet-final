import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';
import StatusBadge from '../components/StatusBadge';

export default function DetailPage() {
  const { id } = useParams(); const navigate = useNavigate(); const { equipment, bookings, user, isAvailable, reserve } = useApp(); const item = equipment.find((entry) => entry.id === Number(id));
  if (!item) return <div className="page centered-page"><div className="empty-icon"><Icon name="box" size={25} /></div><h1>Équipement introuvable</h1><p>Cette fiche n’existe pas ou a été supprimée.</p><Link className="button secondary" to="/catalogue">Retour au catalogue</Link></div>;
  const available = isAvailable(item.id); const alreadyMine = bookings.some((booking) => booking.equipementId === item.id && booking.etudiantId === user?.id);
  const handleReserve = () => { if (reserve(item.id)) navigate('/mes-reservations'); };
  return <div className="page"><Link className="back-link" to="/catalogue">← Retour au catalogue</Link><div className="detail-layout"><div className={`detail-visual category-${item.categorie.toLowerCase()}`}><span>{item.categorie.slice(0, 2).toUpperCase()}</span><small>#{item.id}</small></div><section className="detail-content"><div className="card-topline"><span className="category-label">{item.categorie}</span><StatusBadge available={available} /></div><h1>{item.nom}</h1><p className="detail-description">{item.description}</p><div className="detail-info"><div><span>Localisation</span><strong><Icon name="pin" size={17} />{item.localisation}</strong></div><div><span>Identifiant</span><strong>#{item.id}</strong></div></div>{user.role === 'student' && <div className="detail-action">{available ? <><button className="button primary" onClick={handleReserve}>Réserver cet équipement <Icon name="arrow" size={17} /></button><p>Le matériel restera réservé jusqu’à son annulation.</p></> : <div className="alert info">Cet équipement est déjà réservé. Il redeviendra disponible après annulation.</div>}{alreadyMine && <div className="alert info">Vous avez déjà réservé cet équipement.</div>}</div>}</section></div></div>;
}
