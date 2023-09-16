import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';


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
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
