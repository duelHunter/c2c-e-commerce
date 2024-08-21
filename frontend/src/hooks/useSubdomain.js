// import { useLocation } from 'react-router-dom';

const useSubdomain = () => {
  const { hostname } = window.location;
  const parts = hostname.split('.');
  const subdomain = parts.length >= 2 ? parts[0] : null;
  return subdomain;
};

export default useSubdomain;
