import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollToTop = () => {
  const [params] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params, location]);

  return null;
};

export default ScrollToTop;
