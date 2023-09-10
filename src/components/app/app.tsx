import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';

type AppScreenProps = {
  filmscardsCount: number;
}

function App({filmscardsCount}: AppScreenProps): JSX.Element {
  return(
    <WelcomeScreen filmscardsCount={filmscardsCount} />
  );
}

export default App;
