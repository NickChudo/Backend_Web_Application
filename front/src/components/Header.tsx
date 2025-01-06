import { Link, Typography } from "@mui/material";

export const Header = () => {
  return (
    <div className="header">
      <span className="header__title">
        <Typography variant="h5">
          Voice Assistant for people with speech disorder
        </Typography>
      </span>
      <span className="header__description">
        <Link className="header__item" href="/">
          Home
        </Link>
        <Link className="header__item" href="/aboutus">
          About us
        </Link>
        <Link className="header__item" href="/team">
          Team
        </Link>
        <Link className="header__item" href="/aboutproject">
          About project
        </Link>
      </span>
    </div>
  );
};
