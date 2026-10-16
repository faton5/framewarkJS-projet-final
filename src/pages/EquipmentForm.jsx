import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CATEGORIES } from '../data/donnees-initiales';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

const empty = { nom: '', categorie: 'Informatique', description: '', localisation: '' };

export default function EquipmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { equipment, addEquipment, updateEquipment } = useApp();
  const current = equipment.find((item) => item.id === Number(id));
  const [form, setForm] = useState(current || empty);
  const [errors, setErrors] = useState({});

  if (id && !current) return <div className="page"><div className="alert warning">Équipement introuvable.</div><Link to="/gestion" className="button secondary">Retour à la gestion</Link></div>;

  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (form.nom.trim().length < 3) nextErrors.nom = 'Le nom doit contenir au moins 3 caractères.';
    if (form.description.trim().length < 10) nextErrors.description = 'La description doit contenir au moins 10 caractères.';
    if (!form.localisation.trim()) nextErrors.localisation = 'La localisation est obligatoire.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (id) updateEquipment(form); else addEquipment(form);
    navigate('/gestion');
  };

  return <div className="page narrow-page"><Link className="back-link" to="/gestion">← Retour à la gestion</Link><div className="form-heading"><div className="eyebrow">{id ? 'MODIFIER UNE FICHE' : 'NOUVELLE FICHE'}</div><h1>{id ? 'Modifier l’équipement' : 'Ajouter un équipement'}</h1><p>Les champs marqués sont nécessaires pour compléter la fiche.</p></div><form className="equipment-form" onSubmit={submit} noValidate><div className="form-grid"><div className="field full-field"><label htmlFor="nom">Nom de l’équipement *</label><input id="nom" name="nom" value={form.nom} onChange={change} placeholder="Ex. Ordinateur portable 03" />{errors.nom && <small className="field-error">{errors.nom}</small>}</div><div className="field"><label htmlFor="categorie">Catégorie *</label><select id="categorie" name="categorie" value={form.categorie} onChange={change}>{CATEGORIES.map((entry) => <option key={entry}>{entry}</option>)}</select></div><div className="field"><label htmlFor="localisation">Localisation *</label><input id="localisation" name="localisation" value={form.localisation} onChange={change} placeholder="Ex. Salle B204" />{errors.localisation && <small className="field-error">{errors.localisation}</small>}</div><div className="field full-field"><label htmlFor="description">Description *</label><textarea id="description" name="description" rows="5" value={form.description} onChange={change} placeholder="Décrivez le contenu et les accessoires inclus..." />{errors.description && <small className="field-error">{errors.description}</small>}</div></div><div className="form-actions"><Link to="/gestion" className="button secondary">Annuler</Link><button className="button primary" type="submit">{id ? 'Enregistrer les modifications' : 'Créer la fiche'} <Icon name="check" size={17} /></button></div></form></div>;
}
