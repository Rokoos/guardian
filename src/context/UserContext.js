import { createContext, useState } from "react";
import { getUsers } from "../api";
import { days } from "../constants";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log("user", user);
  const [isAuth, setIsAuth] = useState(false);
  // console.log("isAuth", isAuth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    userId: "",
    role: "nanny",
    age: 65,
    hourRate: 60,
    nationality: "",
    locations: [],
    workingDays: days,
    stars: 0,
  });

  const [users, setUsers] = useState([]);
  const [results, setResults] = useState({});

  const getAllUsers = async () => {
    setFilters({
      userId: user ? user._id : "",
      role: "nanny",
      age: 65,
      hourRate: 60,
      nationality: "",
      locations: [],
      workingDays: days,
      stars: 0,
    });
    setIsLoading(true);
    try {
      const response = await getUsers(1);
      setUsers(response.data.users);
      setResults(response.data.results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    isAdmin,
    setIsAdmin,
    isLoading,
    setIsLoading,
    filters,
    setFilters,
    getAllUsers,
    users,
    setUsers,
    results,
    setResults,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
