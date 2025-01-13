import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      // Assuming 'userCredentials' is stored as a JSON string in localStorage
      const data = JSON.parse(localStorage.getItem('userCredentials')); // Parse the data
      if (data && data.token) {
        const token = data.token;

        const res = await axios.get(URL + "/api/auth/refetch", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
          withCredentials: true, // Only necessary if you need cookies along with the token
        });

        setUser(res.data);
      } else {
        console.log("No token found in localStorage");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
