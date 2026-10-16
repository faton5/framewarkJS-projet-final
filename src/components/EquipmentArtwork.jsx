import { useState } from 'react';
import { Icon } from './Icons';

const equipmentImages = {
  101: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80',
  102: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  103: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  104: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  105: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=900&q=80',
  106: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80'
};

export default function EquipmentArtwork({ item, compact = false }) {
  const [imageError, setImageError] = useState(false);
  const image = equipmentImages[item.id];
  return <div className={`equipment-artwork category-${item.categorie.toLowerCase()} ${compact ? 'compact' : ''}`}>
    {!imageError && <img src={image} alt={`Vue de ${item.nom}`} loading="lazy" onError={() => setImageError(true)} />}
    <div className="artwork-fallback"><Icon name={item.icon || 'box'} size={compact ? 21 : 38} /></div>
    <span className="artwork-shade" />
    {!compact && <span className="equipment-id">#{item.id}</span>}
  </div>;
}
