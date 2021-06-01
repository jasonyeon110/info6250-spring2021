import AddReview from "./AddReview";

const Nav = function ({ user, onLogout }) {
  if (!user.isLoggedIn) {
    return null;
  }

  const onClick = () => {
    return <AddReview></AddReview>
  }

  return (
    <nav id="nav-bar" class="nav">
      <ul className="nav-list">
        <li><a href="https://www.yelp.com/" target="_blank" id="nav-yelp">Explore More Restaurants!</a></li>
        {/* <li><button onClick={onClick} id="nav-btn">Write a Review</button></li> */}
        <li className="logout"><a href="#logout" onClick={onLogout} id="nav-logout">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Nav;
