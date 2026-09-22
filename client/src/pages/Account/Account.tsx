import { Outlet, useLocation } from "react-router-dom";
import AccountNavbar from "./components/AccountNavbar";

type Subpage = "profile" | "bookings" | "places" | "";

const Account = () => {
  const { pathname } = useLocation();
  let subpage: Subpage = "";
  if (pathname.startsWith("/account/profile")) {
    subpage = "profile";
  } else if (pathname.startsWith("/account/bookings")) {
    subpage = "bookings";
  } else if (pathname.startsWith("/account/places")) {
    subpage = "places";
  }
  return (
    <div>
      <AccountNavbar subpage={subpage} />
      <Outlet />
    </div>
  );
};

export default Account;
