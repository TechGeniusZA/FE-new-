import React from "react";
import { useState, useEffect } from "react";
import Nestable from "react-nestable";
import axios from "axios";
import AddCircle from '@mui/icons-material/AddCircleOutline';
import FieldSkeleton from "../../../../../Components/General/FieldSkeletion";
import ContentContainer from "../../../../../Components/General/ContentContainer";
// this usually goes once
// to the entry point of the whole app
// (e.g. src/index.js)
import "react-nestable/dist/styles/index.css";
import { getPurchaseCategory } from "../../../../../API/SKU.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import CategoryFilter from "../../../../Inventory/Components/Filters/CategoryFilter";
import AddIcon from "@mui/icons-material/Add";
import { IconButton ,Grid,Button, Tooltip} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import PageContainer from "../../../../../Components/General/PageContainer";
import FormModal from "../../../../../Components/General/FormModal";
import PurchaseCategoryForm from "./Components/Forms/PurchaseCategoryForm";
const renderItem = ({ item }) => item.text;

function PurchaseCategory() {
  const [selectedForUpdate, setSelectedForUpdate] = useState(null);
  const [open, setOpen] = React.useState(false);
  const formData = useFormik({
    initialValues: {
      filters: {
        Active: "0",
      },
    },
    onSubmit: (values) => {},
  });
  const {
    data: PurchaseCategory = [],
    isLoading,
    error,
    refetch,
    status,
  } = useQuery(
    ["PurchaseCategory", formData.values.filters],
    getPurchaseCategory,
    {
      onSuccess: (da) => {
        console.log("PC DATA", da);
      },
    }
  );

  useEffect(() => {
    console.log(status);
  }, [status]);

  useEffect(() => {
    console.log(formData.values.filters);
  }, [formData.values]);
  
  const handleSelected = (id)=>{
    setSelectedForUpdate(PurchaseCategory.find(x=>x.ID == id))
    setOpen(true)
}

  return (
    <PageContainer>
      <FormModal setOpen={setOpen} open={open} label={"Create Purchase Category"}>
      {/** Pass form to the modal */}
      <PurchaseCategoryForm selectedForUpdate={selectedForUpdate} setOpen={setOpen}/>
    </FormModal>
      <Grid item xs={12}>  <CategoryFilter formData={formData}></CategoryFilter></Grid>
    
      <ContentContainer> 
        <Grid item xs={12}>
      <Button  sx={{border:"none",fontWeight:"bold"}}  startIcon={<AddCircle />}>
        Create
      </Button></Grid>
      <Grid item xs={12}  >
        {isLoading ? <FieldSkeleton/> :  <Nestable
        //collapsed={true}
        items={PurchaseCategory}
        renderItem={({ item, collapseIcon }) => (
          <>
            <div
              style={{ backgroundColor: "#f2f4f7 ", padding: "8px" }}
              className="listMenu"
            >
              {collapseIcon}
              {item.displayName}
              <div style={{ position: "absolute", top: "0px", right: "0px" }}>
              <Tooltip placement={"top"} title="Add">
                <IconButton
                  color="primary"
                  
                 
                  fontSize="small"
                  onClick={() => {
                    alert("add");
                  }}
                >
                  <AddIcon />

                </IconButton></Tooltip>
                <Tooltip placement={"top"} title="Edit">
                <IconButton
                  color="primary"
                  
                 
                  fontSize="small"
                  edit={()=>{
                    handleSelected(item.ID)
                  }}
                >
                  <EditIcon />
                </IconButton></Tooltip>
                <Tooltip placement={"top"} title="Deactivate">
                <IconButton
                  color="primary"
                 
                
                  fontSize="small"
                  onClick={() => {
                    alert("Deactivate");
                  }}
                >
                  <ClearIcon />
                </IconButton></Tooltip>
              </div>
            </div>
          </>
        )}
        onChange={(e) => {
          console.log(e);
        }}
      />}
         
      </Grid>
      </ContentContainer>
   
    </PageContainer>
  );
}

export default PurchaseCategory;
