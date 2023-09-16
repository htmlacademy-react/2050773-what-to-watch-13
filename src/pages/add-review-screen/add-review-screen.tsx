import Header from '../../components/header/header';
import {Helmet} from 'react-helmet-async';
import { TFilms } from '../../types/films';
import AddReview from '../../components/add-review/add-review';

type PlayerProps = {
  film: TFilms;
}

function AddReviewScreen({film}: PlayerProps): JSX.Element {
  const { name } = film;

  return(
    <section className="film-card film-card--full">
      <Helmet>
        <title>WTW. Add review</title>
      </Helmet>
      <Header backgroundImage='img/bg-the-grand-budapest-hotel.jpg'>
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <a href="film-page.html" className="breadcrumbs__link">{name}</a>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>
      </Header>

      <div className="film-card__poster film-card__poster--small">
        <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
      </div>
      <AddReview />
    </section>
  );
}

export default AddReviewScreen;
