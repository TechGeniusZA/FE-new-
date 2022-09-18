import { createTheme } from "@mui/material";

const AppTheme = createTheme({
  typography: {},
  palette: {
    primary: {
      light: "#757ce8",
      main: "#233043",
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
    // The tab component
    MuiTabs:{
      styleOverrides:{
        indicator: {
          backgroundColor: '#3e9e43',
          height: 5,
          
        },
      }
    },
    // The tab itself
    MuiTab:{
      styleOverrides:{
        root:{
          textTransform: "none"
        }
      }
    },
    MuiButtonGroup:{
      variants:[
        {
          props: { variant: "spaced"},
          style: {
            marginTop:"30px",
            "& > *:not(:last-child)": {
              marginRight: "5px"
            }
          }
        }
      ]
    },

    MuiListItemButton:{
      styleOverrides:{
        root:{
          "&.Mui-selected": {
            backgroundColor: "#2e8b57"
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#2e8b57"
          },
          ":hover": {
            backgroundColor: "#3e9e43"
          }
        }
      }
    },
    // Styles for the Top nav bar
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#233043",
          color: "white",
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
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
