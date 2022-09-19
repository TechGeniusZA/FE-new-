import axios from "axios"
//Entities
export const entityFilter = async ({queryKey})=>{
   try {
    const {Type, Active} = queryKey[1]

    const res = await axios.get(`/ManageEntities/GetEntitiesList?EntityType=${Type}&Active=${Active}`)
    console.log(res)
    const data = res.data
    

    console.log(data)
    return data
    
   } catch (error) {
    console.log(error)
    
   } 
}


 // Business Units
export const businessFilter = async ({queryKey}) =>{
   try {
      const {Entity, ShopType, Active} = queryKey[1]
  
      const res = await axios.get(`/BusinessUnits/GetBusinessUnits?Entity=${Entity}&ShopType=${ShopType}&Active=${Active}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}

//Shops
export const ShopFilter = async ({queryKey}) =>{
   try {
      const {Client, ShopGrouping, Location, Active} = queryKey[1]
  
      const res = await axios.get(`/Shops/GetManageShops?Client=${Client}&ShopGrouping=${ShopGrouping}&Location=${Location}&Active=${Active}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data.data
      
     } catch (error) {
      console.log(error)
      
     } 
}

//ShopSplits
export const ShopSplits = async ({queryKey}) =>{
   try {
      const {Client, ShopGrouping, Location, Active} = queryKey[1]
  
      const res = await axios.get(`/ShopSplits/GetManageShopSplits?Client=${Client}&ShopGrouping=${ShopGrouping}&Location=${Location}&Active=${Active}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data.data
      
     } catch (error) {
      console.log(error)
      
     } 
}

//Shop Groupings
export const ShopGrouping = async ({queryKey}) =>{
   try {
      console.log(queryKey)
      const {Industry, Client,  Active} = queryKey[1]
  
      const res = await axios.get(`ShopGroupings/GetManageShopGroupings?Industry=${Industry}&Client=${Client}&Active=${Active}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}

//SKU Brands
export const SKUBrands = async ({queryKey}) =>{
   try {
      console.log(queryKey)
      const {ShopID, Level,  Active} = queryKey[1]
  
      const res = await axios.get(`/api/inventory/GetSKUBrands?ActiveStatus=${Active}&ShopID=${ShopID}&Level=${Level}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}

export const PurchaseCategory = async ({queryKey}) =>{
   try {
      console.log(queryKey)
      const {ActiveStatus} = queryKey[1]
  
      const res = await axios.get(`/api/inventory/GetSKUCategoriesTree?ActiveStatus=${ActiveStatus}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}
export const UnitOfMeasure = async () =>{
   try {
   
  
      const res = await axios.get(`api/inventory/GetUoMTree`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}
export const Packaging = async ({queryKey}) =>{
   try {
      console.log(queryKey)
      const {ActiveStatus} = queryKey[1]
   
  
      const res = await axios.get(`/api/inventory/GetSKUPackaging?activeStatus=${ActiveStatus}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}

export const SKU = async ({queryKey}) =>{
   try {
      console.log("packaged called")
      const{Active, Category, Product, DisplayName, Brand} = queryKey[1]
  
      const res = await axios.get(`/api/inventory/GetSKUs?DisplayName=${DisplayName}&Category=${Category}&Brand=${Brand}&Product=${Product}&ActiveStatus=${Active}&MainItemFilter=1&ReturnableItemFilter=ALL`)
      const packageData = res.data
      console.log("SKU", packageData.data)
      return packageData.data
      
     } catch (error) {
      console.log(error)
      
     } 
}
//MarketPlace

export const SkuPrices= async ({queryKey}) =>{
   try {
      const {Supplier, Category, Brand} = queryKey[1]
  
      const res = await axios.get(`/MarketPlace/GetSKUPrices?Supplier=${Supplier}&Category=${Category}&Brand=${Brand}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}

export const SkuSpecials = async ({queryKey}) =>{
   try {
      const {Supplier, Category, Brand, ActiveSpecial} = queryKey[1]
  
      const res = await axios.get(`/MarketPlace/GetSKUSpecials?Supplier=${Supplier}&Category=${Category}&ActiveSpecial=${ActiveSpecial}&Brand=${Brand}`)
      console.log(res)
      const data = res.data
      console.log(data)
      return data
      
     } catch (error) {
      console.log(error)
      
     } 
}