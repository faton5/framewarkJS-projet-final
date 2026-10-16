import { Link } from 'react-router-dom';
export default function NotFoundPage() { return <div className="page centered-page"><div className="not-found-number">404</div><h1>Page introuvable</h1><p>La page demandée n’existe pas.</p><Link className="button primary" to="/">Retour à l’accueil</Link></div>; }
