const apiUrl =
  window.location.hostname === "localhost"
    ? import.meta.env.VITE_LOCAL_API + ":" + import.meta.env.VITE_API_PORT+"/"
    : import.meta.env.VITE_LAN_API + ":" + import.meta.env.VITE_API_PORT+"/";
    
export default apiUrl;
