import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { login as loginhandle } from "./store/auth";
import { logout as logouthandle } from "./store/auth";
import store from "./store"; // Redux store'u import edin

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyBMFuXiGCVaW14n_Lrpu4YF0wa_Fy5YUJg",
  authDomain: "fir-proje-2e587.firebaseapp.com",
  projectId: "fir-proje-2e587",
  storageBucket: "fir-proje-2e587.firebasestorage.app",
  messagingSenderId: "33729383738",
  appId: "1:33729383738:web:193e823502a4f2762a1403",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    toast.success(`Giriş başarılı: ${user.email}`);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Çıkış başarılı.");
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success(`Doğrulama maili ${auth.currentUser.email} adresine gönderildi. Lütfen kontrol ediniz.`);
  } catch (error) {
    toast.error(error.message);
  }
};

// Kullanıcı durumunu dinlemek için onAuthStateChanged
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginhandle(user));
  } else {
    store.dispatch(logouthandle());
  }
});

export default app;
