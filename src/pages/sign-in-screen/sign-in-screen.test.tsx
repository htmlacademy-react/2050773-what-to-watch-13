import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import SignInScreen from './sign-in-screen';
import userEvent from '@testing-library/user-event';
import { AuthorizationStatus } from '../../const';

describe('Component: SignInScreen', () => {
  const loginTestIdText = 'loginElement';
  const passwordTestIdText = 'passwordElement';
  const initialState = {
    USER: {
      authorizationStatus: AuthorizationStatus.Unknown,
    },
  };

  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<SignInScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(loginTestIdText)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestIdText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const expectedLoginValue = 'test';
    const expectedPasswordValue = '666';
    const {withStoreComponent} = withStore(<SignInScreen />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await userEvent.type(
      screen.getByTestId(loginTestIdText),
      expectedLoginValue,
    );

    await userEvent.type(
      screen.getByTestId(passwordTestIdText),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
