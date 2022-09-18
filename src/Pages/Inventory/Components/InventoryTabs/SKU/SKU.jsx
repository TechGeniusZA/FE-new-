
import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {Chip, Grid, IconButton} from "@mui/material";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { skuFilters } from "../../../../../API/SKU.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import SkuFilter from "../../../Components/Filters/SkuFilter";
import CreateSKU from "../../../Components/Create/CreateSKU";

import CustomToolBar from "../../../../../Components/DataGrid/CustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from '@mui/icons-material/Clear';
import EditButton from "../../../../../Components/DataGrid/CustomRenders/EditButton";
import ActivateButton from "../../../../../Components/DataGrid/CustomRenders/ActivateButton";
import TableChip from "../../../../../Components/General/TableChip";
import FormModal from "../../../../../Components/General/FormModal";
import SKUForm from "./Components/Form/SKUForm";





function SKU() {
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [open, setOpen] = React.useState(false);
    const formData = useFormik({
      initialValues: {
        filters: {
          Active: "0",
          Category: "0",
          Product: "0",
          DisplayName:"",
          Brand:"0",
          Main:"0",
          returnable:"0",

        },
      },
      onSubmit: (values) => {},
    });
  
    const {
      data: skus = [],
      isLoading,
      error,
      refetch,
      status,
    } = useQuery(["skus", formData.values.filters], skuFilters);
  
    useEffect(() => {
      console.log(status);
    }, [status]);
  
    useEffect(() => {
      console.log(formData.values.filters);
    }, [formData.values]);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleSelected = (id)=>{
      setSelectedForUpdate(skus.find(x=>x.ID == id))
      setOpen(true)
  }

  const columns = [
    { field: "action", headerName: "Actions", width: 100,renderCell:({row})=>{
      return  <div
      className="d-flex justify-content-between align-items-center"
      style={{ cursor: "pointer" }}
    >
      <EditButton edit={()=>{
        handleSelected(row.ID)
      }} />
      <ActivateButton row={row}/>
  
    </div>
    } },
      {
          field: "SKUID",
          headerName: "SKU ID",
          editable: false,
          minWidth:90,
        },
        {
          field: "DisplayName",
          headerName: "Display Name",
          editable: false,
          minWidth: 300, 
          flex: 1,
        },
         {
          field: "QtyinUoM",
          headerName: "Qty in UoM",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "UnitofMeasure",
          headerName: "Unit of Measure",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "Packaging",
          headerName: "Packaging",
          editable: false, 
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "Main",
          headerName: "Main / Sub",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "Returnables",
          headerName: "Returnables",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "Level",
          headerName: "Level",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        
        {
          field: "ShopGrouping ",
          headerName: "Shop Grouping / Shop ",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "Product",
          headerName: "Product / Service",
          editable: false,
          minWidth: 150, 
          flex: 1,
        },
        {
          field: "PurchaseCategory",
          headerName: "Purchase Category",
          editable: false,
          minWidth: 250, 
          flex: 1,
        },
        {
          field: "VAT",
          headerName: "VAT",
          editable: false,
          flex: 1,
          minWidth: 75, 
          valueGetter: ({ row }) => {
            return row.IsActive = "#VAT" ;
          },
        },
        
        {
          field: "PackSize",
          headerName: "PackSizes",
          editable: false,
          minWidth: 200,
          flex: 1,
        },
        {
          field: "SyncID",
          headerName: "SyncID",
          editable: false,
          minWidth: 200,
          flex: 1,
        },
        {
          field: "isActive",
          headerName: "Active",
          editable: false,
          minWidth: 150,
          flex: 1,
          sortable: false,
      valueGetter: ({ row }) => {
        return row.IsActive ? "Active" : "Inactive";
      },
      renderCell: ({ row }) => {
        return <TableChip label={row.IsActive ? "Active" : "Inactive"} color={row.IsActive ? "success" : "default"} />;
      }
        },
  
  ]
  

  return (
    <Grid container rowGap={2}>
      <FormModal setOpen={setOpen} open={open} label={"Create SKU Brand"}>
      {/** Pass form to the modal */}
      <SKUForm selectedForUpdate={selectedForUpdate} setOpen={setOpen}/>
    </FormModal>
 
      <Grid item xs={12} >
        <DataGrid
          autoHeight
          localeText={{
            toolbarColumns:"Columns",
            toolbarFilters: "Filters",
            toolbarDensity: "Rows",
            toolbarExport: "Exports"
          }}
          rows={skus}
          loading={isLoading}
          columns={columns}
          getRowId={(row) => row.ID}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          getRowHeight={() => 'auto'}
          onCellEditStop={(_, e) => console.log(e.target)}
          componentsProps={{
            toolbar:{
              create:handleClickOpen
            }
          }}
          components={{
            Toolbar: CustomToolBar
          }}
        />
      </Grid>
    </Grid>
  )
}

export default SKU