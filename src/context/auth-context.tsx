import { createContext, FC, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

type AuthContextProps = string | undefined;

const AuthContext = createContext<AuthContextProps>(undefined);

type UseAuthContext = () => AuthContextProps;

const useAuthContext: UseAuthContext = () => {
  const context = useContext(AuthContext);

  return context;
};

const AuthContextProvider: FC = ({ children }) => {
  const [uid, setUid] = useState<string | undefined>(() => {
    const uid = auth.currentUser?.uid;

    return uid;
  });

  useEffect(() => {
    auth.onAuthStateChanged((firebaseUser) => {
      setUid(firebaseUser?.uid);
    });
    return () => setUid(undefined);
  }, []);

  return <AuthContext.Provider value={uid}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, useAuthContext };
