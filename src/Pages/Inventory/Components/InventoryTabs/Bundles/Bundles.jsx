import { DataGrid, GridLinkOperator } from "@mui/x-data-grid";
import React, {useEffect, useState} from 'react'
import { Button, Grid, IconButton } from "@mui/material";
import { useFormik } from "formik";
import BundleFilter from "../../../Components/Filters/BundleFIlter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { bundleFilters, createSKUBrand } from "../../../../../API/SKU.api";
import CreateBundle from "../../../Components/Create/CreateBundle";

import axios from "axios";
import CustomToolBar from "../../../../../Components/DataGrid/CustomToolbar";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from '@mui/icons-material/Clear';
import EditButton from "../../../../../Components/DataGrid/CustomRenders/EditButton";
import ActivateButton from "../../../../../Components/DataGrid/CustomRenders/ActivateButton";
import FormModal from "../../../../../Components/General/FormModal";
import BundlesForm from "./Components/Form/BundlesForm";


function Bundles(){
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [open, setOpen] = React.useState(false);
    const formData = useFormik({
      initialValues: {
        filters: {
          Category: "0",
          MainSku:"",
          MainPackSize:""
        },
      },
      onSubmit: (values) => {},
    });
  
    const {
      data: bundles = [],
      isLoading,
      error,
      refetch,
      status,
  
    } = useQuery(["bundles", formData.values.filters], bundleFilters)
    
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
      setSelectedForUpdate(bundles.find(x=>x.ID == id))
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
          field: "MainSKUPacksize",
          headerName: "Main SKU Packsize",
          editable: false,
          minWidth: 250,
          flex: 1,
        },
        {
          field: "ReturnableSKUPacksize",
          headerName: "Returnable SKU Packsize",
          editable: false,
          minWidth: 250,
          flex: 1,
          sortable: false,
        },
        {
          field: "Qty",
          headerName: "Qty",
          editable: false,
          minWidth: 150,
          flex: 1,
          sortable: false,
        }
  ]
  
    return(
      <Grid container rowGap={2}>
         <FormModal setOpen={setOpen} open={open} label={"Create SKU Packaging"}>
      {/** Pass form to the modal */}
      <BundlesForm selectedForUpdate={selectedForUpdate} setOpen={setOpen}/>
    </FormModal>
           <Grid item xs={12}>
          <BundleFilter formData={formData}></BundleFilter>
        </Grid>
    
      <Grid item xs={12}>
          <DataGrid autoHeight
          rows={bundles}
          loading={isLoading}
          columns={columns}
          getRowId={(row)=> row.ID}
          onCellEditStop={(_, e) => console.log(e.target)}
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
  export default Bundles