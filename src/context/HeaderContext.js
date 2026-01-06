
import { createContext, useState, useContext, useEffect, useRef } from "react";

// Create the context
const HeaderContext = createContext();

// Custom hook to use header context
export const useHeader = () => {
  return useContext(HeaderContext);
};

// Context Provider Component
export const HeaderProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [announcementBarHeight, setAnnouncementBarHeight] = useState(0);

  const headerRef = useRef(null);
  const announcementBarRef = useRef(null);

  // Measure header and announcement bar heights
  useEffect(() => {
    if (headerRef.current && announcementBarRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
      setAnnouncementBarHeight(announcementBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        headerHeight,
        announcementBarHeight,
        headerRef,
        announcementBarRef,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
