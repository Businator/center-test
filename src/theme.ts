import { createTheme } from '@mui/material';

export const themeOptions = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h1: {
      fontSize: 32,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: 16,
      lineHeight: 1.2,
    },
  },
});
