import { createContext, useContext, useState } from 'react';

const RadioContext = createContext(null);

export function RadioProvider({ children }) {
  const [radioOpen, setRadioOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <RadioContext.Provider value={{ radioOpen, setRadioOpen, isPlaying, setIsPlaying }}>
      {children}
    </RadioContext.Provider>
  );
}

export function useRadio() {
  return useContext(RadioContext);
}
