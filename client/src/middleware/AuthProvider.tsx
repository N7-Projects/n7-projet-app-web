import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInformation } from "../types/loginInformation.ts";
import { MemberType } from "../types/memberType.ts";
import { useEffect } from "react";

interface AuthContextType {
  token: string;
  user: MemberType | null;
  loginAction: (loginData) => Promise<void>;
  logOut: () => void;
  //   connected: () => UseQueryResult<MemberType, Error>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<MemberType | null>(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginAction = async (loginData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const res: LoginInformation = await response.json();

        if (res) {
          console.log("USER CREATED");
          console.log(res);

          localStorage.setItem("jwt", res.token);
          localStorage.setItem("user", JSON.stringify(res.member));
          setToken(res.token);
          setUser(res.member);
          navigate(`/members`);

          navigate(`/members`);

          return;
        }
      }
      throw new Error("Error while processing login");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while trying to log in.");
    }
  };

  const logOut = () => {
    console.log("DECONNECTION LOGOUT");
    setUser(null);
    setToken("");
    localStorage.removeItem("jwt");
    navigate("/");
    return;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
