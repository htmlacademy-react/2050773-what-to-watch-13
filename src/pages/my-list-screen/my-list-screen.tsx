import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import { getFavorites, getFavoritesCount } from '../../store/films-data/films-data.selectors';
import { useAppSelector } from '../../hooks/index';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';

function MyListScreen(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavorites);
  const favoriteFilmsCount = useAppSelector(getFavoritesCount);


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
          <FilmCardsList films={favoriteFilms} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MyListScreen;

