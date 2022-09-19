import axios from "axios";

import React, { useEffect, useState } from "react";


// SKU BRANDS

export const getWithFilters = async ({queryKey})=>{
    console.log("Called")
    const {Active,shopID,level} = queryKey[1]
   // console.log("API URL : " ,`/inventory/GetSKUBrands?ActiveStatus=${Active}&ShopID=${shopID}&Level=${level}`)
    // level (All = 0,  global = 1,shop groping =2  ,  shop split = 3.)
    // Active (All = 0, true = 1, false = 2)
    // Shop ID is the ID of the shop
    const res = await axios.get(`/api/inventory/GetSKUBrands?ActiveStatus=${Active}&ShopID=${shopID}&Level=${level}`)
    const data = await res.data
    return data.data
}
export const createSKUBrand = async(myForm)=>{
    let makingItFormDataLikeOldSchool = new FormData();
    Object.entries(myForm).forEach(([key, value]) => {
      makingItFormDataLikeOldSchool.append(key, value);
    });

    try {
      let res = await axios.post(
        "/api/inventory/AddEditBrand",
        makingItFormDataLikeOldSchool,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      let data = res.data;
      console.log(data);
      return res.data
    } catch (err) {
      console.log(err.response.data);
    }
    }
export const updateSkuBrand = async(myForm)=>{
      try{
        let res = axios.put("/api/inventory/AddEditBrand", myForm)
        let updatedData = res.data;
        console.log(updatedData)
        return updatedData    
    }catch (err){
      console.log(err.reponse.data)
    }
    } 
    
    
  // SKU PACKAGING  
    
export const createSKUPackage = async(myForm)=>{
      let makingItFormDataLikeOldSchool = new FormData();
      Object.entries(myForm).forEach(([key, value]) => {
        makingItFormDataLikeOldSchool.append(key, value);
      });
  
      try {
        let res = await axios.post(
          "/api/inventory/AddEditBrand",
          makingItFormDataLikeOldSchool,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
  
        let data = res.data;
        console.log(data);
        return res.data
      } catch (err) {
        console.log(err.response.data);
      }
    }
      
export const packagingFilters = async ({queryKey})=>{
  console.log("packaged called")
    const{Active} = queryKey[1]

    const res = await axios.get(`/api/inventory/GetSKUPackaging?activeStatus=${Active}`)
    const packageData = res.data
    console.log(packageData.data)
    return packageData.data


}
  // SKU
export const skuFilters = async ({queryKey})=>{
  console.log("packaged called")
    const{Active, Category, Product, DisplayName, Brand} = queryKey[1]

    const res = await axios.get(`/api/inventory/GetSKUs?DisplayName=${DisplayName}&Category=${Category}&Brand=${Brand}&Product=${Product}&ActiveStatus=${Active}&MainItemFilter=1&ReturnableItemFilter=ALL`)
    const packageData = res.data
    console.log("SKU", packageData.data)
    return packageData.data
}
export const createSKU = async(myForm)=>{
  let makingItFormDataLikeOldSchool = new FormData();
  Object.entries(myForm).forEach(([key, value]) => {
    makingItFormDataLikeOldSchool.append(key, value);
  });

  try {
    let res = await axios.post(
      "/api/inventory/AddEditBrand",
      makingItFormDataLikeOldSchool,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    let data = res.data;
    console.log(data);
    return res.data
  } catch (err) {
    console.log(err.response.data);
  }
}

  // BUNDLES 
export const bundleFilters =async ({queryKey})=>{
  const{Category, MainSku, MainPackSize} =queryKey[1]

  const res = await axios.get(`/api/inventory/GetSKUBundles?Category=${Category}&MainSKUID=${MainSku}&MainSKUPacksize=${MainPackSize}`)
  const bundleData = res.data
  console.log(bundleData.data)
  return bundleData.data  
}


export const createSKUBundle = async(myForm)=>{
  let makingItFormDataLikeOldSchool = new FormData();
  Object.entries(myForm).forEach(([key, value]) => {
    makingItFormDataLikeOldSchool.append(key, value);
  });

  try {
    let res = await axios.post(
      "/api/inventory/AddEditBrand",
      makingItFormDataLikeOldSchool,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    let data = res.data;
    console.log(data);
    return res.data
  } catch (err) {
    console.log(err.response.data);
  }
  }

//Packsizes

export const getPacksizes = async ({queryKey})=>{

  try{
    console.log("called")
  const{PurchaseCategory, SKU} = queryKey[1]
  const res = await axios.get(`/api/inventory/GetPackSizes?PurchaseCategoryID=${PurchaseCategory}&MainSKUID=${SKU}&SKUPacksize=0`)
  const data = res.data
  console.log(data.data)
  return data.data

  }catch(err){
    console.log(err)
  }
  
}

export const createPackSize = async(myForm)=>{
  let makingItFormDataLikeOldSchool = new FormData();
  Object.entries(myForm).forEach(([key, value]) => {
    makingItFormDataLikeOldSchool.append(key, value);
  });

  try {
    let res = await axios.post(
      "/api/inventory/AddEditBrand",
      makingItFormDataLikeOldSchool,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    let data = res.data;
    console.log(data);
    return res.data
  } catch (err) {
    console.log(err.response.data);
  }
  }

  //Purchase Category


  export const getPurchaseCategory = async ({queryKey})=>{

    try{
      console.log("called")
    const{Active} = queryKey[1]
    const res = await axios.get(`/api/inventory/GetSKUCategoriesTree?ActiveStatus=${Active}`)
    const data = res.data
    console.log(data)
    return data
  
    }catch(err){
      console.log(err)
    }
    
  }