import { useState, useEffect } from "react";
function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cache = localStorage.getItem("honestycanteen") || null;
    if (cache) setUser(cache);
  }, []);
  return user;
}

export default useUser;
