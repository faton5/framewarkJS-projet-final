import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { COMPTES_INITIAUX, EQUIPEMENTS_INITIAUX, RESERVATIONS_INITIALES } from '../data/donnees-initiales';

const AppContext = createContext(null);
const KEYS = { user: 'campus-user', equipment: 'campus-equipment', bookings: 'campus-bookings' };

function readStorage(key, initialValue, setError) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? structuredClone(initialValue) : JSON.parse(saved);
  } catch {
    setError('Le stockage local est indisponible. Les changements ne seront pas conservés.');
    return structuredClone(initialValue);
  }
}

export function AppProvider({ children }) {
  const [storageError, setStorageError] = useState('');
  const [user, setUser] = useState(() => readStorage(KEYS.user, null, setStorageError));
  const [equipment, setEquipment] = useState(() => readStorage(KEYS.equipment, EQUIPEMENTS_INITIAUX, setStorageError));
  const [bookings, setBookings] = useState(() => readStorage(KEYS.bookings, RESERVATIONS_INITIALES, setStorageError));

  useEffect(() => { try { localStorage.setItem(KEYS.user, JSON.stringify(user)); } catch { setStorageError('Impossible d’enregistrer la session.'); } }, [user]);
  useEffect(() => { try { localStorage.setItem(KEYS.equipment, JSON.stringify(equipment)); } catch { setStorageError('Impossible d’enregistrer le catalogue.'); } }, [equipment]);
  useEffect(() => { try { localStorage.setItem(KEYS.bookings, JSON.stringify(bookings)); } catch { setStorageError('Impossible d’enregistrer les réservations.'); } }, [bookings]);

  const isAvailable = (id) => !bookings.some((booking) => booking.equipementId === Number(id));
  const login = (accountId) => setUser(COMPTES_INITIAUX.find((account) => account.id === Number(accountId)) || null);
  const logout = () => { setUser(null); localStorage.removeItem(KEYS.user); };

  const reserve = (equipmentId) => {
    if (!user || user.role !== 'student' || !isAvailable(equipmentId)) return false;
    setBookings((current) => [...current, { id: crypto.randomUUID(), equipementId: Number(equipmentId), etudiantId: user.id }]);
    return true;
  };
  const cancelBooking = (bookingId) => setBookings((current) => current.filter((booking) => booking.id !== bookingId || booking.etudiantId !== user?.id));
  const addEquipment = (item) => setEquipment((current) => [...current, { ...item, id: Date.now() }]);
  const updateEquipment = (item) => setEquipment((current) => current.map((entry) => entry.id === item.id ? item : entry));
  const deleteEquipment = (id) => {
    if (!isAvailable(id)) return false;
    setEquipment((current) => current.filter((entry) => entry.id !== Number(id)));
    return true;
  };

  const value = useMemo(() => ({ user, equipment, bookings, storageError, login, logout, isAvailable, reserve, cancelBooking, addEquipment, updateEquipment, deleteEquipment }), [user, equipment, bookings, storageError]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() { return useContext(AppContext); }
