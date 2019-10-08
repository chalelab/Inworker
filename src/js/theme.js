import { createMuiTheme } from '@material-ui/core/styles';
import {} from '@material-ui/core/colors';

export default createMuiTheme({
  spacing: 4,
  palette: {
    primary: {
      main:'#3d5afe'
    },
    secondary:{
      main:'#8bc34a',
      contrastText:'#ffff'
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});