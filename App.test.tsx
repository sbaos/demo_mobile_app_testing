import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('onboarding-screen')).toBeTruthy();
  });

  it('should show onboarding screen by default', () => {
    render(<App />);
    expect(screen.getByText('Welcome to ExamMate App')).toBeTruthy();
  });
});
