import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {theme} from './theme';
import Navigation from './navigations';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={'#A4D1DF'} />
      <Navigation />
    </ThemeProvider>
  );
};

export default App;
