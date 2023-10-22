import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import { getFavorites, getFavoritesCount } from '../../store/films-data/films-data.selectors';
import { useAppSelector } from '../../hooks/index';
import FavoritesCardsList from '../../components/favorites-cards-list/favorites-cards-list';
import ErrorMessage from '../../components/error-message/error-message';
import { getFavoritesErrorStatus } from '../../store/films-data/films-data.selectors';

function MyListScreen(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavorites);
  const favoriteFilmsCount = useAppSelector(getFavoritesCount);
  const hasError = useAppSelector(getFavoritesErrorStatus);


  if(hasError) {
    return <ErrorMessage />;
  }


  return(
    <div className="user-page">
      <Helmet>
        <title>WTW. My list.</title>
      </Helmet>
      <Header>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsCount}</span></h1>
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          <FavoritesCardsList films={favoriteFilms} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListScreen;

