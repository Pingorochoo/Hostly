import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: () => { },
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const getLoggedInUser = async () => {
    try {
      const { data } = await axios.get("/users/me");
      setLoading(false);
      setUser(data);
    } catch (error) {
      throw new Error(`Failed to fetch user data message: ${error.message}`);
    }
  };
  useEffect(() => {
    if (!user) {
      getLoggedInUser();
    }
    return () => {};
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading&&children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
