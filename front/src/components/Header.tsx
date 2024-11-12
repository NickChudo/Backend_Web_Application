export const Header = () => {
  return (
    <div className="header">
      <span className="header__title">
        <div>Voice Assistant for people with speech disorder</div>
      </span>
      <span className="header__description">
        <a className="header__item" href="/">
          Home
        </a>
        <a className="header__item" href="/aboutus">
          About us
        </a>
        <a className="header__item" href="/team">
          Team
        </a>
        <a className="header__item" href="/aboutproject">
          About project
        </a>
      </span>
    </div>
  );
};
