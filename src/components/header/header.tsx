import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { useAppDispatch } from '../../hooks/index';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selector';
import { memo } from 'react';
import { getUserAvatar } from '../../store/user-process/user-process.selector';

type HeaderSignInProps = {
  isSignInPage: boolean;
  isAuthorized: boolean;
}


function HeaderSignAction({ isSignInPage, isAuthorized}: HeaderSignInProps): JSX.Element {
  const dispatch = useAppDispatch();
  const userAvatar = useAppSelector(getUserAvatar);


  if(isSignInPage) {
    return (
      <h1 className="page-title user-page__title">Sign in</h1>
    );
  }

  return isAuthorized ? (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.MyList}>
          <div className="user-block__avatar">
            <img src={userAvatar} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      </li>
      <li className="user-block__item">
        <Link to={AppRoute.Root} className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >Sign out
        </Link>
      </li>
    </ul>
  ) : (
    <div className='user-block'>
      <Link to={AppRoute.SignIn} className='user-block__link'>Sign In</Link>
    </div>
  );
}

function HeaderRaw({children}: PropsWithChildren): JSX.Element {
  const {pathname} = useLocation();
  const isIndexPage = pathname === AppRoute.Root;
  const isSignInPage = pathname === AppRoute.SignIn;
  const isFilmPage = pathname.split('/')[1] === AppRoute.Film.split('/')[1];
  const isMyListPage = pathname === AppRoute.MyList;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return(

    <header className={`page-header ${ isIndexPage || isFilmPage ? 'film-card__head' : ''} ${isSignInPage || isMyListPage ? 'user-page__head' : ''}`}>

      <div className="logo">
        {
          isIndexPage ? (
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          )
            : (
              <Link to={AppRoute.Root} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            )
        }
      </div>

      { children ? children : null }
      <HeaderSignAction isAuthorized={authorizationStatus === AuthorizationStatus.Auth} isSignInPage={isSignInPage} />


    </header>

  );
}
const Header = memo(HeaderRaw);

export default Header;
