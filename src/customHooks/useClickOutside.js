import { useEffect } from "react";

export const useClickOutside = (ref, bool, setBool, func) => {
  useEffect(() => {
    if (!bool) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setBool(false);
        if (func) {
          func();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setBool(false);
        if (func) {
          func();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setBool, bool, ref, func]);
};
