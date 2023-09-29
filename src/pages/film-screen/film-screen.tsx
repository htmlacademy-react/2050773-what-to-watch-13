import Header from '../../components/header/header';
import { Helmet } from 'react-helmet-async';
import { TFilm, TFilms } from '../../types/films';
import Footer from '../../components/footer/footer';
import Tabs from '../../components/tabs/tabs';
import { TTab } from '../../types/tabs';
import { TReview } from '../../types/review';
import { useSearchParams } from 'react-router-dom';
import { TABS } from '../../const';
import FilmCardsList from '../../components/film-cards-list/film-cards-list';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/index';
import { useEffect } from 'react';
import { fetchFilmByIdAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

type FilmCardProps = {
  reviews: TReview[];
  films: TFilms;
};


function FilmScreen({ reviews, films }: FilmCardProps): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    film,
    isFilmDataLoading,
  } = useAppSelector((state) => ({
    film: state.film,
    isFilmDataLoading: state.isFilmDataLoading,
  }));

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmByIdAction(id));
    }
  }, [id, dispatch]);

  if (isFilmDataLoading) {
    return <LoadingScreen />;
  }

  if (!film) {
    return <p>No film found!</p>;
  }

  const { name, genre, released } = film;
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || TABS.OVERVIEW;

  const handleTabClick = (tab: TTab) => {
    setSearchParams({ tab });
  };

  return (
    <>
      <Helmet>
        <title>WTW. Film</title>
      </Helmet>
      <Header backgroundImage="img/bg-the-grand-budapest-hotel.jpg" />

      {/* We could extract the below section into a separate FilmInfo component for better modularity */}
      <section className="film-card film-card--full">
        {/* ... (rest of the content) */}
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmCardsList films={films} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;
