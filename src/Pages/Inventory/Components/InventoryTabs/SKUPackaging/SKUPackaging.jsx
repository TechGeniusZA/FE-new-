import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import React, {useEffect, useState} from 'react'
import { Button, Chip, Grid, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { packagingFilters } from "../../../../../API/SKU.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import PackageFilter from "../../../Components/Filters/packageFilter";
import CreatePackage from "../../../Components/Create/CreatePackage";
import { getWithFilters, createSKUBrand } from "../../../../../API/SKU.api";
import axios from "axios";

import CustomToolBar from "../../../../../Components/DataGrid/CustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from '@mui/icons-material/Clear';
import EditButton from "../../../../../Components/DataGrid/CustomRenders/EditButton";
import ActivateButton from "../../../../../Components/DataGrid/CustomRenders/ActivateButton";
import TableChip from "../../../../../Components/General/TableChip";
import FormModal from "../../../../../Components/General/FormModal";
import SKUPackagingForm from "./Components/form/SKUPackagingForm";


function SKUpackaging(){
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const formData = useFormik({
    initialValues: {
      filters: {
        Active: "0"
      },
    },
    onSubmit: (values) => {},
  });

  const {
    data: skuPackaging = [],
    isLoading,
    error,
    refetch,
    status,

  } = useQuery(["skuPackaging", formData.values.filters], packagingFilters)
  
  useEffect(() => {
    console.log(status);
  }, [status]);

  
  useEffect(()=>{
    console.log(formData.values.filters);

  }, [formData.values]);

  const handleSelected = (id)=>{
    setSelectedForUpdate(skuPackaging.find(x=>x.ID == id))
    setOpen(true)
}

  const handleClickOpen = () => {
    setOpen(true);
  };

  const columns = [
    { field: "action", headerName: "Actions", width: 90,
    renderCell: ({ row }) => {
      return (
        <>
        <EditButton edit={()=>{
          handleSelected(row.ID)
        }}/>
        <ActivateButton row={row} />
          
  
          
        </>
      ); }
   },
    {
        field: "DisplayName",
        headerName: "Display Name",
        editable: false,
        flex: 1,
      },
      {
        field: "isActive",
        headerName: "Status",
        editable: false,
        flex: 1,
        sortable: false,
        valueGetter: ({ row }) => {
          return row.IsActive ? "Active" : "Inactive";
        },
        renderCell: ({ row }) => {
          return  <TableChip label={row.IsActive ? "Active" : "Inactive"} color={row.IsActive ? "success" : "default"} />;
        }
      },
]


  return(
    <Grid container rowGap={2}>
       <FormModal setOpen={setOpen} open={open} label={"Create SKU Packaging"}>
      {/** Pass form to the modal */}
      <SKUPackagingForm selectedForUpdate={selectedForUpdate} setOpen={setOpen}/>
    </FormModal>
         <Grid item xs={12}>
        <PackageFilter formData={formData}></PackageFilter>
      </Grid>
 
   
      <Grid item xs={12}>
        <DataGrid autoHeight
        rows={skuPackaging}
        loading={isLoading}
        localeText={{
          toolbarColumns:"Columns",
          toolbarFilters: "Filters",
          toolbarDensity: "Rows",
          toolbarExport: "Exports"
        }}
        columns={columns}
        getRowId={(row)=> row.ID}
        onCellEditStop={(_, e) => console.log(e.target)}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        getRowHeight={() => 'auto'}
        components={{
          Toolbar: CustomToolBar
        }}
        componentsProps={{
          toolbar:{
            create:handleClickOpen
          }
        }}
       />
</Grid>
       

    </Grid>
  )
}
export default SKUpackaging