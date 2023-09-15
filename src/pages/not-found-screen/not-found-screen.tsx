import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';


function NotFoundScreen(): JSX.Element {
  return(
    <div className="user-page">
      <Helmet>
        <title>WTW. Not found</title>
      </Helmet>

      <Header />

      <div className="sign-in user-page__content">
        <h2>Oops! No films so far...</h2>
        <Link to='/'>Return to Main Page</Link>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default NotFoundScreen;
