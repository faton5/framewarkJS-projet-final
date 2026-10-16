import { Link } from 'react-router-dom';
import { Icon } from './Icons';
import StatusBadge from './StatusBadge';
import EquipmentArtwork from './EquipmentArtwork';

export default function EquipmentCard({ item, available }) {
  return <article className="equipment-card"><EquipmentArtwork item={item} /><div className="equipment-body"><div className="card-topline"><span className="category-label">{item.categorie}</span><StatusBadge available={available} /></div><h3>{item.nom}</h3><p>{item.description}</p><div className="location"><Icon name="pin" size={16} />{item.localisation}</div><Link className="text-link" to={`/materiels/${item.id}`}>Voir la fiche <Icon name="arrow" size={16} /></Link></div></article>;
}
