import { createContext, useContext, useState } from "react";

const GoveeKeyContext = createContext();
const UpdateGoveeKeyContext = createContext();

export function useGoveeKey() {
  return useContext(GoveeKeyContext);
}

export function useGoveeKeyUpdate() {
  return useContext(UpdateGoveeKeyContext);
}

export function GoveeKeyProvider({ children }) {
  // Load initial state from sessionStorage
  const [goveeKey, setGoveeKey] = useState(() => {
    return sessionStorage.getItem("goveeKey") || null;
  });

  function setKey(key) {
    setGoveeKey(key);
    sessionStorage.setItem("goveeKey", key); // Save to sessionStorage
  }

  return (
    <GoveeKeyContext.Provider value={goveeKey}>
      <UpdateGoveeKeyContext.Provider value={setKey}>
        {children}
      </UpdateGoveeKeyContext.Provider>
    </GoveeKeyContext.Provider>
  );
}
