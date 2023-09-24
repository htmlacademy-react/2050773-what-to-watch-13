import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';
import { AppRoute } from '../../const';


function SignInScreen(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if(loginRef.current !== null && passwordRef.current !== null) {
      dispatch(loginAction(
        {
          login: loginRef.current.value,
          password: passwordRef.current.value
        }
      ));
      navigate(AppRoute.MyList);
    }
  };

  return(
    <div className="user-page">
      <Helmet>
        <title>WTW. Sign in</title>
      </Helmet>
      <Header/>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={loginRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" >Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignInScreen;
