import { getFavoritesCount } from '../../store/films-data/films-data.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchUploadFavoriteStatusAction } from '../../store/api-actions';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';


type MyListButtonProps = {
  filmId: string;
  isFavorite: boolean;
  isAuthorized: boolean;
}

function MyListButton({filmId, isFavorite, isAuthorized}: MyListButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const favoritesCount = useAppSelector(getFavoritesCount);
  const currentAuthorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();


  const handleButtonClick = () => {
    if (currentAuthorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchUploadFavoriteStatusAction({
        id: filmId,
        status: isFavorite ? 0 : 1,
      }));
    } else {
      navigate(AppRoute.SignIn);
    }
  };

  return (
    isAuthorized ? (
      <button className="btn btn--list film-card__button" type="button" onClick={handleButtonClick}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
        </svg>
        <span>My list</span>
        <span className="film-card__count">{favoritesCount}</span>
      </button>
    ) : null
  );
}

export default MyListButton;
