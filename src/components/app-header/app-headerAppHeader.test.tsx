import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { AppHeader } from './app-header';
import userReducer from '../../services/slices/userSlice';

const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: {
    user: { user: { name: 'Тестовый пользователь' }, userRequest: false, userFailed: false, userError: null, isAuthChecked: true, isLoading: false } as any
  }
});

describe('<AppHeader />', () => {
  it('renders', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <AppHeader />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 