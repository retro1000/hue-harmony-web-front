import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import useSettings from "app/hooks/useSettings";

const MatxTheme = ({ children }) => {
  const { settings } = useSettings();
  let activeTheme = { ...settings.themes[settings.activeTheme] };

  const customTheme = createTheme({
    ...activeTheme,
    components: {
      ...activeTheme.components,
      MuiTextField: {
        defaultProps: {
          size: 'small'
        }
      },
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
