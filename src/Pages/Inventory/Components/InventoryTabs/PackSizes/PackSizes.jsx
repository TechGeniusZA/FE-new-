import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import React, {useEffect, useState} from 'react'
import { Button, Chip, Grid, IconButton } from "@mui/material";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getPacksizes } from "../../../../../API/SKU.api";
import PacksizeFilter from "../../../Components/Filters/PacksizeFilter";
import CreatePackSize from "../../../Components/Create/CreatePackSize";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from '@mui/icons-material/Clear';
import CustomToolBar from "../../../../../Components/DataGrid/CustomToolbar";
import FormModal from "../../../../../Components/General/FormModal";
import PackSizesForm from "./Component/Form/PackSizesForm";
import EditButton from "../../../../../Components/DataGrid/CustomRenders/EditButton";
import ActivateButton from "../../../../../Components/DataGrid/CustomRenders/ActivateButton";

function PackSize(){
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const formData = useFormik({
    initialValues: {
      filters: {
        PurchaseCategory: "0",
        SKU:""
      },
    },
    onSubmit: (values) => {},
  });

  const {
    data: PackSizes = [],
    isLoading,
    error,
    refetch,
    status,

  } = useQuery(["PackSize", formData.values.filters], getPacksizes.apply,{onSuccess:(d)=>{
    console.log("packsizes",d)
  }})
  
  useEffect(() => {
    console.log(status);
  }, [status]);

  
  useEffect(()=>{
    console.log(formData.values.filters);

  }, [formData.values]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelected = (id)=>{
    setSelectedForUpdate(PackSize.find(x=>x.ID == id))
    setOpen(true)
}
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
          field: "PurchaseCategory",
          headerName: "Purchase Category",
          editable: false,
          minWidth: 200,
          flex: 1,
        },
        {
          field: "SKU",
          headerName: "SKU",
          editable: false,
          flex: 1,
        },
         {
          field: "QtyInUoM",
          headerName: "Quantity in UoM",
          editable: false,
          flex: 1,
        },
        {
          field: "Level",
          headerName: "Level",
          editable: false,
          flex: 1,
        },
        {
          field: "isProduct",
          headerName: "Product/Service",
          editable: false,
          flex: 1,
        },
        {
          field: "PackSize",
          headerName: "PackSize",
          editable: false,
          flex: 1,
          
        },
        {
          field: "Barcodes",
          headerName: "# Barcodes",
          editable: false,
          flex: 1,
        },
        {
          field: "SyncID",
          headerName: "SyncID",
          editable: false,
          flex: 1,
        },
        {
          field: "isMainItem",
          headerName: "Main / Sub",
          editable: false,
          flex: 1,
        },
        {
          field: "isReturnableItem",
          headerName: "Returnable",
          editable: false,
          flex: 1,
        },
        {
          field: "shop",
          headerName: "Has Bundle",
          editable: false,
          flex: 1,
        },
        {
          field: "isActive",
          headerName: "Active",
          editable: false,
          flex: 1,
          valueGetter: ({ row }) => {
            return row.IsActive ? "Active" : "Inactive";
          },
          renderCell: ({ row }) => {
            return row.IsActive ? 
              <Chip sx={{ width: 120 }} label={"Active"} color="success" />
            : <Chip sx={{ width: 120 }} label={"InActive"} color="success" style={{backgroundColor:'grey'}} />
          }
        },
  
  ]   



  return(
    <Grid container rowGap={2}>
      <FormModal setOpen={setOpen} open={open} label={"Create PackSize"}>
      {/** Pass form to the modal */}
      <PackSizesForm selectedForUpdate={selectedForUpdate} setOpen={setOpen}/>
    </FormModal>
         <Grid item xs={12}>
        <PacksizeFilter formData={formData}></PacksizeFilter>
      </Grid>

    <Grid item xs={12}>
        <DataGrid autoHeight
        rows={PackSizes}
        loading={isLoading}
        columns={columns}
        getRowId={(row)=> row.ID}
        onCellEditStop={(_, e) => console.log(e.target)}
        // componentsProps={{ toolbar: { csvOptions: { allColumns: true } },  open: () => {
        //   <CreatePackSize setOpen={setOpen} open={open} ></CreatePackSize> 
        // }, }}
        componentsProps={{
          toolbar:{
            create:()=>{handleClickOpen()}
          }
        }}
        components={{
          Toolbar: CustomToolBar
        }}
        >

        </DataGrid>
    </Grid>


    </Grid>
  )
}
export default PackSize