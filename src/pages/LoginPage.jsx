import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { COMPTES_INITIAUX } from '../data/donnees-initiales';
import { useApp } from '../context/AppContext';
import { Icon } from '../components/Icons';

export default function LoginPage() {
  const { user, login } = useApp(); const navigate = useNavigate(); const [accountId, setAccountId] = useState('');
  if (user) return <Navigate to="/catalogue" replace />;
  const submit = (event) => { event.preventDefault(); if (!accountId) return; login(accountId); navigate('/catalogue'); };
  return <div className="login-page"><div className="login-brand"><span className="brand-mark"><Icon name="box" size={22} /></span>Campus <b>Matériel</b></div><section className="login-card"><div className="eyebrow">ESPACE DE PRÊT</div><h1>Bienvenue sur votre campus.</h1><p className="lead">Consultez le matériel disponible et réservez ce dont vous avez besoin pour vos projets.</p><form onSubmit={submit}><label htmlFor="account">Choisissez un compte de démonstration</label><select id="account" value={accountId} onChange={(event) => setAccountId(event.target.value)} required><option value="">Sélectionner un profil...</option>{COMPTES_INITIAUX.map((account) => <option key={account.id} value={account.id}>{account.nom} — {account.role === 'manager' ? 'Responsable' : 'Étudiant'}</option>)}</select><button className="button primary full" type="submit">Accéder à mon espace <Icon name="arrow" size={17} /></button></form><p className="login-note">Connexion de démonstration · Aucun mot de passe requis</p></section><div className="login-decoration"><span className="deco-circle one" /><span className="deco-circle two" /><div className="deco-card"><Icon name="calendar" size={20} /><strong>Votre matériel, à portée de main</strong><span>Simple. Rapide. Local.</span></div></div></div>;
}
