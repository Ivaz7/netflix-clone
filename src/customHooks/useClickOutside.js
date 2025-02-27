import { useEffect } from "react";

export const useClickOutside = (ref, bool, setBool) => {
  useEffect(() => {
    if (!bool) return;

    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setBool(false)
      }
    }

    if (bool) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [setBool, bool, ref])
}