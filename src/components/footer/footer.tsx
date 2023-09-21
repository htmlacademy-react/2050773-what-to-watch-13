import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';

function Footer(): JSX.Element {
  const location = useLocation();
  const isIndexPage = location.pathname === AppRoute.Root;

  return(
    <footer className="page-footer">
      <div className="logo">
        {
          isIndexPage ? (
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          ) : (
            <Link to={AppRoute.Root} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          )
        }

      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}

export default Footer;
