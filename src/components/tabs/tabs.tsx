import { TTab } from '../../types/tabs';


type TabsProps = {
  activeTab: TTab;
  onTabClick: (tab: TTab) => void;
}


function Tabs({activeTab, onTabClick}: TabsProps): JSX.Element {

  return(
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {['Overview', 'Details', 'Reviews'].map((tab) => (
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
  );
}

export default Tabs;
