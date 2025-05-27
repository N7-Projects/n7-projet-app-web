import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginInformation } from "../types/loginInformation.ts";
import { MemberType } from "../types/memberType.ts";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface AuthContextType {
  token: string;
  user: MemberType | null;
  loginAction: (loginData) => Promise<void>;
  logOut: () => void;
  connected: () => UseQueryResult<MemberType, Error>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<MemberType | null>(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const navigate = useNavigate();

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
        localStorage.setItem("jwt", res.token);
        if (res) {
          setToken(res.token);

          console.log("TOKEN");
          console.log(localStorage.getItem("jwt"));

          fetch("/api/connected", {
            headers: {
              Authorization: `Bearer ${res.token}`,
            },
          })
            .then(async (res) => {
              if (res.ok) {
                const data: MemberType = await res.json();
                console.log("USER");
                console.log(data);
                setUser(data);

                navigate(`/members`);
              } else {
                console.log("DECONNECTION LOGIN RESPONSE NOT OK");

                localStorage.removeItem("jwt");
                setUser(null);
              }
            })
            .catch((err) => {
              console.error("API connected call failed:", err);
              console.log("DECONNECTION LOGIN API FAIL");

              localStorage.removeItem("jwt");
              setUser(null);
            });

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

  const connected = (): UseQueryResult<MemberType, Error> => {
    const res = useQuery({
      queryKey: [{ member: "one-member", memberToken: token }],
      queryFn: async () => {
        if (token) {
          //   console.log(token);
          const response = await fetch("/api/connected", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            console.log("Connected fetch");
            const data: MemberType = await response.json() as MemberType;
            localStorage.setItem("jwt", token);
            return data;
          } else {
            localStorage.removeItem("jwt");
            return Promise.reject(
              new Error("Something went wrong while connected"),
            );
          }
        } else {
          return Promise.reject(
            new Error("You must be connected to see this page !"),
          );
        }
      },
    });

    return res;
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, connected }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
