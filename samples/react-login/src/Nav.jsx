const Nav = function({ user, onLogout }) {
  if(!user.isLoggedIn) {
    return null;
  }

  return (
    <nav>
      <ul className="nav">
        <li><a href="#stuff">Link one</a></li>
        <li><a href="#stuff">Link two</a></li>
        <li><a href="#stuff">Link three</a></li>
        <li className="logout"><a href="#logout" onClick={onLogout}>Logout</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
