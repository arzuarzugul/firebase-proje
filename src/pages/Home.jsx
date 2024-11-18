import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { emailVerification, logout, auth } from "../firebase.jsx";
import toast from "react-hot-toast";
import ProfileAndPasswordUpdate from "./ProfileAndPasswordUpdate.jsx";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Başarıyla çıkış yaptınız.");
    } catch (error) {
      toast.error("Çıkış yaparken hata oluştu.");
    }
  };

  const handleVerification = async () => {
    try {
      await emailVerification();
      toast.success("E-posta doğrulama linki gönderildi.");
    } catch (error) {
      toast.error("E-posta doğrulama işlemi sırasında hata oluştu.");
    }
  };

  // Eğer kullanıcı oturum açmışsa
  if (user) {
    return (
      <div className="flex  items-center max-w-xxl">
        <div className="max-w-xl mx-auto items-center py-5 items-center  ">
        {auth.currentUser.photoURL && (
          <img src={auth.currentUser.photoURL} alt="" />
        )}
        <h1 className="flex gap-x-4 mx-auto items-center font-bold">
          Oturumun Açık: {user.email}
        </h1>
        <ProfileAndPasswordUpdate />
        <button
          onClick={handleLogout}
          className="h-8 rounded px-4 mx-5 my-4 text-sm text-white bg-indigo-700"
        >
          Çıkış Yap
        </button>
        <button
          onClick={handleVerification}
          className="h-8 rounded  px-4 text-sm text-white bg-indigo-700"
        >
          E-posta Onayla
        </button>
      </div>
      </div>
    );
  }

  // Eğer kullanıcı oturum açmamışsa
  return (
    <div className="flex mt-20 justify-center items-center gap-7  ">
      <Link  className="bg-indigo-500 px-10 rounded py-3 text-white "    to="/register">Kayıt Ol</Link>
      <Link className="bg-indigo-500 px-10 rounded py-3 text-white " to="/login">Giriş Yap</Link>
    </div>
  );
};

export default Home;
