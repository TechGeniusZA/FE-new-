import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from '../../../../../Components/DataGrid/CustomToolbar'
import React, { useEffect, useState } from "react";
import ActivateButton from '../../../../../Components/DataGrid/CustomRenders/ActivateButton'
import EditButton from '../../../../../Components/DataGrid/CustomRenders/EditButton'
import {Alert, Grid} from "@mui/material";
import TableChip from '../../../../../Components/General/TableChip'
import SelectFilter from "../../Filters/SelectFilter";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { getWithFilters, createSKUBrand } from "../../../../../API/SKU.api";
import PopUp from "../../../Components/Create/PopUp";
import { useQuery, useMutation } from "@tanstack/react-query";
import PageContainer from '../../../../../Components/General/PageContainer'
import { string } from "prop-types";
import FormModal from "../../../../../Components/General/FormModal";
import SKUBrandForm from "./Components/Form/SKUBrandForm";


function SKUBrands() {
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const formData = useFormik({
    initialValues: {
      filters: {
        Active: "0",
        level: "0",
        shopID: "0",
      },
    },
    onSubmit: (values) => {},
  });

  const {
    data: skuBrands = [],
    isLoading,
    error,
    refetch,
    status,
  } = useQuery(["skuBrands", formData.values.filters], getWithFilters);

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
      setSelectedForUpdate(skuBrands.find(x=>x.ID == id))
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
      field: "DisplayName",
      headerName: "Brand Name",
      editable: false,
      flex: 1,
    },
    {
      field: "Level",
      headerName: "Level",
      flex: 1,
      editable: false,
    },
    {
      field: "Shop",
      headerName: "Shop Grouping/ Shop Split",
      editable: false,
      flex: 1,
    },
    {
      field: "IsActive",
      headerName: "IsActive",
      flex: 1,
      sortable: true,
      valueGetter: ({ row }) => {
        return row.IsActive ? "Active" : "Inactive"
      },
      renderCell: ({ row }) => {
        return <TableChip label={row.IsActive ? "Active" : "Inactive"} color={row.IsActive ? "#3e9e43" : "default"} />;
      },
    },
  ];
  return (
   <PageContainer>
    <FormModal setOpen={setOpen} open={open} label={"Create SKU Brand"}>
      {/** Pass form to the modal */}
      <SKUBrandForm selectedForUpdate={selectedForUpdate} setOpen={setOpen}/>
    </FormModal>
      <Grid item xs={12}>
        <SelectFilter formData={formData}></SelectFilter>
      </Grid>
    
      <Grid item xs={12}>
      
        <DataGrid
          autoHeight
          localeText={{
            toolbarColumns:"Columns",
            toolbarFilters: "Filters",
            toolbarDensity: "Rows",
            toolbarExport: "Exports"
          }}
          rows={skuBrands}
          loading={isLoading}
          columns={columns}
          components={{
            Toolbar: CustomToolbar
          }}
          componentsProps={{
            toolbar:{
              create:()=>{setOpen(true)},
            },
           
          }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          getRowHeight={() => 'auto'}
          getRowId={(row) => row.ID}
          onCellEditStop={(_, e) => console.log(e.target)}
          initialState={{
            sorting: {
              sortModel: [
                {
                  field: 'DisplayName',
                  sort: 'asc',
                },
              ],
            },
          }}
        />
      </Grid>

      {/* <PopUp setOpen={setOpen} open={open}></PopUp> */}
      </PageContainer>
  );
}

export default SKUBrands;
