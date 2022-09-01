import { Box, Container } from "@mui/system";
import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  TextField,
  Dialog,
  DialogActions,
  MenuItem,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import SelectFilter from "../../Components/SelectFilter/SelectFilter";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import { getWithFilters, createSKUBrand } from "../../API/SKU.api";
import PopUp from "../../Components/Create/PopUp";
import { useQuery, useMutation } from "@tanstack/react-query";
const columns = [
  { field: "action", headerName: "Actions", width: 90 },
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
    sortable: false,
    valueGetter: ({ row }) => {
      return row.IsActive ? "Active" : "Inactive";
    },
  },
];

function SKUBrands() {
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
  } = useQuery(["skuBrands", formData.values.filters, "Hello"], getWithFilters);

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    console.log(formData.values.filters);
  }, [formData.values]);

  return (
    <Grid container rowGap={2}>
      <Grid item xs={12}>
        <SelectFilter formData={formData}></SelectFilter>
      </Grid>
      <Grid item xs={12}>
      <Button
        variant="contained"
        onClick={() => {
          setOpen(true)
        }}
      >
        Create
      </Button>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          autoHeight
          rows={skuBrands}
          loading={isLoading}
          columns={columns}
          getRowId={(row) => row.ID}
          onCellEditStop={(_, e) => console.log(e.target)}
          componentsProps={{ toolbar: { csvOptions: { allColumns: true } } }}
        />
      </Grid>

      <PopUp setOpen={setOpen} open={open}></PopUp>
    </Grid>
  );
}

export default SKUBrands;
