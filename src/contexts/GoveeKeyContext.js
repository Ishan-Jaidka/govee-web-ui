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
  const [goveeKey, setGoveeKey] = useState(null);

  function setKey(key) {
    setGoveeKey(key);
  }

  return (
    <GoveeKeyContext.Provider value={goveeKey}>
      <UpdateGoveeKeyContext.Provider value={setKey}>
        {children}
      </UpdateGoveeKeyContext.Provider>
    </GoveeKeyContext.Provider>
  );
}
