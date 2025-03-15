import axios from "axios";
import { useUser } from "../../store";

const Profile = () => {
  const { user, setUser } = useUser();
  async function logout() {
    await axios.post("/users/logout");
    setUser(null);
  }
  return (
    <div className="text-center max-w-lg mx-auto w-full mt-8">
      logged in as {user.name} ({user.email})<br />
      <button className="primary max-w-sm mt-2" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
