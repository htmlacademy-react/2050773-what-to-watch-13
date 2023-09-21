import { TTab } from '../../types/tabs';
import { TABS } from '../../const';
import { TFilms } from '../../types/films';
import { TReview } from '../../types/review';
import Overview from '../../components/overview/overview';
import Details from '../../components/details/details';
import Reviews from '../../components/reviews/reviews';


type TabsProps = {
  activeTab: TTab;
  onTabClick: (tab: TTab) => void;
  film: TFilms;
  reviews: TReview[];
}


function Tabs({activeTab, onTabClick, film, reviews}: TabsProps): JSX.Element {

  return(
    <div>
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(TABS).map((tab) => (
            <li
              className={`film-nav__item ${activeTab === tab ? 'film-nav__item--active' : ''}`}
              key={tab}
            >
              <a
                href="#"
                className="film-nav__link"
                onClick={(e) => {
                  e.preventDefault();
                  onTabClick(tab as TTab);
                }}
              >
                {tab}
              </a>
            </li>
          ))}

        </ul>
      </nav>
      {activeTab === TABS.OVERVIEW && <Overview film={film} />}
      {activeTab === TABS.DETAILS && <Details film={film} />}
      {activeTab === TABS.REVIEWS && <Reviews reviews={reviews} />}
    </div>
  );
}

export default Tabs;
