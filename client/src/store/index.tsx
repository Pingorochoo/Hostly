import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type User = {
  _id?: string;
  name: string;
  email: string;
  token?: string;
};

type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const { data } = await axios.get<User | null>("/users/me");
        setUser(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(`Failed to fetch user data: ${error.message}`);
        } else {
          console.error("Failed to fetch user data");
        }
      } finally {
        setLoading(false);
      }
    };

    void getLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }

  return context;
};

export { UserProvider, useUser };