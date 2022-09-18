import { createTheme } from "@mui/material";



const AppTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "'Poppins'",
      textTransform: "none",
      color: "#444545",
    },
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#42a5f5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    text: {
      disabled: "#000000",
    },
  },
  components: {
  MuiAccordion:{
    styleOverrides:{
      root:{
        border:"none",
        boxShadow:"none",
        
      }
    }
  },

  
  
    // The tab component
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#42a5f5",
          height: 5,
        },
      },
    },
    // The tab itself
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color:"black"
        },
      },
    },
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: "spaced" },
          style: {
            marginTop: "30px",
            "& > *:not(:last-child)": {
              marginRight: "5px",
            },
          },
        },
      ],
    },

    // Styles for the Side  nav bar
    MuiDrawer: {
      styleOverrides: {
        paper: {},
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          border: "none",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: "10px 10px 0px 10px",
          backgroundColor: "#FFFFFF",
          "& .MuiDataGrid-columnsContainer": {
            padding: "0px 5px 0px 5px",
            borderRadius: 4,
            borderBottom: 1,
          },

          // Edit each cell
          "& .MuiDataGrid-cell": {
            fontSize: "13px",
          },
          '& .MuiDataGrid-cell:focus': {
            outline: 0,
          },
          "& .MuiDataGrid-columnHeaders": {
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row.even": {
            backgroundColor: "WhiteSmoke",
          },
          // Toolbar
        },
      },
    },
  },
});

export default AppTheme;
