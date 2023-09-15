import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { TFilms } from '../../types/films';

type MyListScreenPorops = {
  films: TFilms[];
}

function MyListScreen({films}: MyListScreenPorops): JSX.Element {
  return(
    <div className="user-page">
      <Helmet>
        <title>WTW. My list.</title>
      </Helmet>
      <Header>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{films.length}</span></h1>
      </Header>
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {films.map((film) => (
            <article key={film.id} className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src='img/fantastic-beasts-the-crimes-of-grindelwald.jpg' alt={film.name} width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">{film.name}</a>
              </h3>
            </article>
          ))}
        </div>
      </section>

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

export default MyListScreen;

