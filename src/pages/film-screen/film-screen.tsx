import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { TFilms } from '../../types/films';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';
import { TTab } from '../../types/tabs';
import { TReview } from '../../types/review';
import { useSearchParams } from 'react-router-dom';
import { TABS } from '../../const';


type FilmCardProps = {
  film: TFilms;
  reviews: TReview[];
};


function FilmScreen({film, reviews}: FilmCardProps): JSX.Element {
  const { name, description, director, rating, scoresCount, starring, genre, released, runTime } = film;
  const formattedStarring = starring.join(', ');
  const hours = Math.floor(runTime / 60);
  const minutes = runTime % 60;

  const firstHalfReviews = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondHalfReviews = reviews.slice(Math.ceil(reviews.length / 2));

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || TABS[0];

  const handleTabClick = (tab: TTab) => {
    setSearchParams({ tab });
  };

  const renderActiveTabFilmInfo = () => {
    switch(activeTab) {
      case 'Overview':
        return (
          <>
            <div className="film-rating">
              <div className="film-rating__score">{rating}</div>
              <p className="film-rating__meta">
                <span className="film-rating__level">Very good</span>
                <span className="film-rating__count">{scoresCount} ratings</span>
              </p>
            </div>
            <div className="film-card__text">
              <p>{description}</p>
              <p className="film-card__director"><strong>Director: {director}</strong></p>
              <p className="film-card__starring"><strong>Starring: {formattedStarring}, and other</strong></p>
            </div>
          </>
        );
      case 'Details':
        return (
          <div className="film-card__text film-card__row">
            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Director</strong>
                <span className="film-card__details-value">{director}</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Starring</strong>
                <span className="film-card__details-value">
                    Bill Murray, <br/>
                    Edward Norton, <br/>
                    Jude Law, <br/>
                    Willem Dafoe, <br/>
                    Saoirse Ronan, <br/>
                    Tony Revoloru, <br/>
                    Tilda Swinton, <br/>
                    Tom Wilkinson, <br/>
                    Owen Wilkinson, <br/>
                    Adrien Brody, <br/>
                    Ralph Fiennes, <br/>
                    Jeff Goldblum
                </span>
              </p>
            </div>
            <div className="film-card__text-col">
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Run Time</strong>
                <span className="film-card__details-value">{hours}h {minutes}m</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Genre</strong>
                <span className="film-card__details-value">{genre}</span>
              </p>
              <p className="film-card__details-item">
                <strong className="film-card__details-name">Released</strong>
                <span className="film-card__details-value">{released}</span>
              </p>
            </div>
          </div>
        );
      case 'Reviews':
        return (
          <div className="film-card__reviews film-card__row">
            <div className="film-card__reviews-col">
              {firstHalfReviews.map((review) => (
                <div className="review" key={review.id}>
                  <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>
                    <footer className="review__details">
                      <cite className="review__author">{review.user}</cite>
                      <time className="review__date" dateTime={new Date(review.date).toISOString()}>
                        {new Date(review.date).toLocaleDateString()}
                      </time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{review.rating}</div>
                </div>
              ))}
            </div>

            <div className="film-card__reviews-col">
              {secondHalfReviews.map((review) => (
                <div className="review" key={review.id}>
                  <blockquote className="review__quote">
                    <p className="review__text">{review.comment}</p>
                    <footer className="review__details">
                      <cite className="review__author">{review.user}</cite>
                      <time className="review__date" dateTime={new Date(review.date).toISOString()}>
                        {new Date(review.date).toLocaleDateString()}
                      </time>
                    </footer>
                  </blockquote>
                  <div className="review__rating">{review.rating}</div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return(
    <>
      <section className="film-card film-card--full">
        <Helmet>
          <title> WTW. Film</title>
        </Helmet>
        <div className="film-card__hero">

          <Header backgroundImage="img/bg-the-grand-budapest-hotel.jpg" />


          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <a href="add-review.html" className="btn film-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs activeTab={activeTab} onTabClick={handleTabClick} />
              {renderActiveTabFilmInfo()}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg" alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-film-card catalog__films-card">
              <div className="small-film-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175" />
              </div>
              <h3 className="small-film-card__title">
                <a className="small-film-card__link" href="film-page.html">Aviator</a>
              </h3>
            </article>
          </div>
        </section>
        <Footer />
      </div>
    </>


  );
}

export default FilmScreen;
