const apiUrl =
  import.meta.env.VITE_ENVIROMENT === "production"
    ? import.meta.env.VITE_API_URL + "/"
    : window.location.hostname === "localhost"
    ? import.meta.env.VITE_LOCAL_API + "/"
    : import.meta.env.VITE_LAN_API + "/";

export default apiUrl;
