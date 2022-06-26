import { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";
// import auth from '@react-native-firebase/auth'

const AuthContext = createContext({});

const config = {
  
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //logged in
          setUser(user);
        } else {
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  // const update = {
  //   displayName: 'Alias',
  //   photoURL: 'https://my-cdn.com/assets/user/123.png',
  // };

  // await firebase.auth().currentUser.updateProfile(update);

  const signIn = async (userEmail, userPassword) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, userEmail, userPassword);
    } catch (e) {
      console.error(e.message);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);

    signOut(auth)
      .catch((error) => setError(error))
      .finally(setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(async (loginResult) => {
        if (loginResult.type === "success") {
          //login
          const { idToken, accessToken } = loginResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          //firebase auth olmadan bağlanmak için
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
      signIn,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

// export const useAuth = () => useContext(AuthContext);
