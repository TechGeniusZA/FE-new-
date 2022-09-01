import { createTheme} from "@mui/material";

const AppTheme = createTheme({
    palette: {
     primary: {
       light: '#757ce8',
       main: '#233043',
       dark: '#002884',
       contrastText: '#fff'
     },
     secondary: {
       light: '#ff7961',
       main: '#f44336',
       dark: '#ba000d',
       contrastText: '#000',
     },
     text: {
       disabled: '#000000',
       fontSize:10
     }
     },
    components: {
      MuiPaper:{
        
      }
    }
})

export default AppTheme