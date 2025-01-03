import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import useSettings from "app/hooks/useSettings";
import '@fontsource/poppins'; 

const MatxTheme = ({ children }) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  const customTheme = createTheme({
    ...activeTheme,
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif', // Apply the font globally
      h1: { fontFamily: 'Poppins, Arial, sans-serif' }, // Customize specific heading styles (optional)
      h2: { fontFamily: 'Poppins, Arial, sans-serif' },
      body1: { fontFamily: 'Poppins, Arial, sans-serif' },
    },
    components: {
      ...activeTheme.components,
      MuiTextField: {
        defaultProps: {
          size: 'small'
        }
      },
      // MuiSvgIcon: {
      //   styleOverrides: {
      //     root: {
      //       fontSize: '0.15rem', // Adjust this size as needed (e.g., small size)
      //     },
      //   },
      //   defaultProps: {
      //     fontSize: 'small', // Sets the default fontSize prop to "small"
      //   },
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          }
        },
        variants: [
          {
            props: { variant: 'rose' },
            style: {
              backgroundColor: '#4caf50',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#388e3c',
              },
              '&:active': {
                backgroundColor: '#2e7d32',
              },
              '&:focus': {
                backgroundColor: '#1b5e20',
              },
            },
          },
          {
            props: { variant: 'red' },
            style: {
              backgroundColor: '#f44336',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              '&:active': {
                backgroundColor: '#c62828',
              },
              '&:focus': {
                backgroundColor: '#b71c1c',
              },
            },
          },
        ],
      }
    }
  })

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MatxTheme;
