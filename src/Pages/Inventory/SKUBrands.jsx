import { Box, Container} from "@mui/system";
import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FormControl, TextField,  Dialog, DialogActions, MenuItem, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import {Button} from "@mui/material";
import {useFormik} from 'formik'
import PopUp from "../../Components/Create/PopUp";
const columns = [
  { field: "", headerName: "", width: 90 },
  {
    field: "DisplayName",
    headerName: "Brand Name",
    editable: false,
    flex: 1,
  },
  {
    field: "Level",
    headerName: "Level",
    editable: false,
  },
  {
    field: "Shop",
    headerName: "Shop Grouping/ Shop Split",
    editable: false,
  },
  {
    field: "IsActive",
    headerName: "IsActive",
    sortable: false,
    valueGetter:({row})=>{
      return row.IsActive ? "Active" : "Inactive"
    },
    
  },
];



function SKUBrands() {
const formData = useFormik({
  initialValues:{
  
    filters:{
      Active:true,
      level:"All",
      ShopGrouping:"",
      ShopSplit:""
    }

   
  },
  onSubmit:(values)=>{

  }
})


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTextValue, updateFilterText]=useState('All')

  
  async function fetchData() {
    setLoading(true)
    const res = await fetch(
      "/Inventory/GetSKUBrands?ActiveStatus=1&ShopID=0&Level=0"
    );
    const data = await res.json();
    setLoading(false)
    console.log(data)

    formData.values.Active != "All" ?  setData(data.data.filter(x=>x.IsActive ===formData.values.filters.Active)) : setData(data.data)
    formData.values.ShopGrouping != "All" ? setData(data.data.filter(x=>x.ShopGroupingID === formData.values.filters.ShopGrouping)): setData(data.data)
    formData.values.ShopSplit != "All" ? setData(data.data.filter(x=>x.ShopSplitID === formData.values.filters.ShopSplit)): setData(data.data)
  }
  

  useEffect(()=>{
    
  console.log(formData.values)
    fetchData()

  },[formData.values])
  useEffect(()=>{

  },[])
  
 

  return (      
    <Container>
      
    <SelectFilter formData={formData} updateFilterText={updateFilterText}></SelectFilter>

      <FormControl sx={{width:"100%"}}  >
      

      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data}
          loading={loading}
          columns={columns}
          getRowId={(row) => row.ID}
          onCellEditStop={(_, e) => console.log(e.target)}
          componentsProps={{ toolbar: { csvOptions: { allColumns: true } } }}
        
        />
      </Box>
      
      </FormControl>

      <PopUp></PopUp>

    </Container>
  );
}

export default SKUBrands;
