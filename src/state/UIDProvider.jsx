import { useContext, createContext, useState } from "react";

const Context = createContext(null);

export function UIDProvider({ children }) {
  const [uid, setUID] = useState(null);
  const value = { uid, setUID };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useUID() {
  const context = useContext(Context);
  const errorText =
    "To use useUID(), wrap the parent component with <UIDProvider/>";

  if (!context) throw new Error(errorText);

  return context;
}
