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
  register: {
    step: string;
    setStep: React.Dispatch<React.SetStateAction<string>>;
    completeRegistration: completeRegistration;
    checkHomonyms: (userData) => Promise<void>;
    associateWithHomonym: (homonymId) => Promise<void>;
    homonyms: MemberType[];
  };
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
    // console.log("In UseEffect");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as MemberType);
      //   console.log(JSON.parse(storedUser) as MemberType);
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
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("user", JSON.stringify(res.member));
          setToken(res.token);
          setUser(res.member);
          navigate(`/members/` + res.member.idMembre);

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
    localStorage.removeItem("user");
    navigate("/");
    return;
  };

  //## Registration part ##

  const [step, setStep] = useState("form"); // "form", "homonyms"
  const [formData, setFormData] = useState(null);
  const [homonyms, setHomonyms] = useState([]);

  // Check for homonyms
  const checkHomonyms = async (userData) => {
    try {
      const response = await fetch(
        `/api/register/homonyms/${userData.name}/${userData.firstName}`,
      );
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setHomonyms(data);
          setFormData(userData);
          setStep("homonyms");
        } else {
          // No homonyms found - proceed with registration
          userData = { ...userData, hasId: false };
          await registerUser(userData);
        }
      } else {
        // API error - proceed with registration
        await registerUser(userData);
      }
    } catch (error) {
      console.error("Error checking homonyms:", error);
      alert(
        "Une erreur s'est produite lors de la vérification des membres existants.",
      );
    }
  };

  // Associate with existing homonym
  const associateWithHomonym = async (homonymId) => {
    if (!formData) return;

    try {
      // Create a new object with all the registration data plus the ID field
      const registrationData = {
        ...formData,
        idMembre: homonymId, // This needs to be wrapped in OptionalLong on the server
        hasId: true,
      };

      await registerUser(registrationData);
    } catch (error) {
      console.error("Error associating with homonym:", error);
      alert(
        "Une erreur s'est produite lors de l'association avec un membre existant.",
      );
    }
  };

  // Complete registration without association
  const completeRegistration = async () => {
    if (!formData) return;

    await registerUser(formData);
  };

  // Register user
  const registerUser = async (userData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json() as LoginInformation;
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.member));
        setToken(data.token), setUser(data.member);

        navigate(`/members/` + data.member.idMembre);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Échec de l'inscription.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Une erreur s'est produite lors de l'inscription de l'utilisateur.",
      );
    }
  };

  const register = {
    step: step,
    setStep: setStep,
    completeRegistration: completeRegistration,
    checkHomonyms: checkHomonyms,
    associateWithHomonym: associateWithHomonym,
    homonyms: homonyms,
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
