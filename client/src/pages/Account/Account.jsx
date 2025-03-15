import { Outlet, useLocation } from "react-router-dom";
import AccountNavbar from "./components/AccountNavbar";
import { useEffect, useState } from "react";

const Account = () => {
  const { pathname } = useLocation();
  const [subpage, setSubPage] = useState("");
  const routeMap = {
    "/account/profile": "profile",
    "/account/bookings": "bookings",
    "/account/places": "places",
  };
  const updateSubpage = () => {
    const matchedRoute = Object.keys(routeMap).find((route) => pathname.startsWith(route));
    setSubPage(matchedRoute ? routeMap[matchedRoute] : "");
  };

  useEffect(() => {
    updateSubpage();
  }, [pathname]);

  return (
    <div>
      <AccountNavbar subpage={subpage} />
      <Outlet />
    </div>
  );
};

export default Account;
