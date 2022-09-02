import axios from "axios";




export const getWithFilters = async ({queryKey})=>{
    console.log("Called")
    const {Active,shopID,level} = queryKey[1]
   // console.log("API URL : " ,`/Inventory/GetSKUBrands?ActiveStatus=${Active}&ShopID=${shopID}&Level=${level}`)
    // level (All = 0,  global = 1,shop groping =2  ,  shop split = 3.)
    // Active (All = 0, true = 1, false = 2)
    // Shop ID is the ID of the shop
    const res = await fetch(`/Inventory/GetSKUBrands?ActiveStatus=${Active}&ShopID=${shopID}&Level=${level}`)
    const data = await res.json()
    return data.data
}
export const createSKUBrand = async()=>{
   return "Ok"
}