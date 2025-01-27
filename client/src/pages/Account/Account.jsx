import axios from "axios";
import { useParams } from "react-router-dom";
import AccountNavbar from "./components/AccountNavbar";
import { useUser } from "../../store";
import Places from "../Places/Places";

const Account = () => {
  const { user, setUser } = useUser();

  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "account";
  }
  async function logout() {
    await axios.post("/users/logout");
    setUser(null);
  }

  return (
    <div>
      <AccountNavbar subpage={subpage} />
      {subpage === "account" && (
        <div className="text-center max-w-lg mx-auto w-full mt-8">
          logged in as {user?.name} ({user?.email})<br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places />}
    </div>
  );
};

export default Account;
