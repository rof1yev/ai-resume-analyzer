import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const { auth, isLoading } = usePuterStore();

  return (
    <nav className="navbar">
      <Link to="/">
        <p className="uppercase text-2xl font-bold text-gradient">Resumind</p>
      </Link>
      {!isLoading && auth.user ? (
        <Link to="/upload" className="primary-button w-fit">
          Upload resume
        </Link>
      ) : (
        <Link to="/auth" className="primary-button w-fit">
          Log in
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
