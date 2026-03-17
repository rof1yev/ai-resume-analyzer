import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { AvatarFallback, Avatar } from "./avatar";

const Navbar = ({ user }: { user?: boolean }) => {
  const { auth, isLoading } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="uppercase text-2xl font-bold text-gradient">Resumind</p>
      </Link>

      <div className="flex gap-2 items-center">
        {!isLoading && auth.user ? (
          <Link to="/upload" className="primary-button w-fit">
            Upload resume
          </Link>
        ) : (
          <Link to="/auth" className="primary-button w-fit">
            Log in
          </Link>
        )}

        {user && (
          <Avatar className="avatar-gradient">
            <AvatarFallback>
              {auth.user?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
