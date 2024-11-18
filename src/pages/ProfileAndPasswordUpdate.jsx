import React, { useState } from 'react';
import { updateProfile, updatePassword } from 'firebase/auth';
import { auth } from '../firebase'; // Firebase ayarlarını içeren dosya
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Parola güncelleme için

const ProfileAndPasswordUpdate = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Profil bilgilerini güncelleme
  const handleProfileUpdate = async () => {
    if (!auth.currentUser) {
      alert("Kullanıcı oturumu açık değil!");
      return;
    }

    setLoading(true);

    try {
      // Firebase'de profil güncelleme
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      alert("Profil başarıyla güncellendi!");
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      alert("Profil güncelleme sırasında bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  // Parola güncelleme
  const handlePasswordUpdate = async () => {
    if (!auth.currentUser) {
      alert("Kullanıcı oturumu açık değil!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Yeni parola en az 6 karakter olmalıdır.");
      return;
    }

    setLoading(true);

    try {
      // Şu anda oturum açmış kullanıcıyı doğrulamak için mevcut şifreyi kullanarak yeniden doğrulama işlemi
      const credentials = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credentials);

      // Parolayı güncelleme
      await updatePassword(auth.currentUser, newPassword);

      alert("Parola başarıyla güncellendi!");
    } catch (error) {
      console.error("Parola güncelleme hatası:", error);
      alert("Parola güncelleme sırasında bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profil ve Parola Güncelle</h2>

      {/* Profil Güncelleme */}
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Ad
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Soyad
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        onClick={handleProfileUpdate}
        disabled={loading || !firstName || !lastName}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 mb-4"
      >
        {loading ? "Güncelleniyor..." : "Profil Güncelle"}
      </button>

      {/* Parola Güncelleme */}
      <div className="mb-4">
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
          Mevcut Parola
        </label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          Yeni Parola
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        onClick={handlePasswordUpdate}
        disabled={loading || !currentPassword || !newPassword}
        className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
      >
        {loading ? "Güncelleniyor..." : "Parolayı Güncelle"}
      </button>
    </div>
  );
};

export default ProfileAndPasswordUpdate;
