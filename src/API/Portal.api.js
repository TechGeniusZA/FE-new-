import axios from "axios";

export const industryFilter = async ({queryKey})=>{
    console.log("called")
    const {MainIndustry, SubIndustry}= queryKey[1]

    const res = axios.get(`/ManageIndustries/GetManageIndustries?MainIndustry=${MainIndustry}&SubIndustry=${SubIndustry}`)
    const data = await (await res).data
    return data.data
}

export const locationFilter = async ({queryKey})=>{
    console.log("called")
    const {MainIndustry, SubIndustry}= queryKey[1]

    const res = axios.get(`/ManageIndustries/GetManageIndustries?MainIndustry=${MainIndustry}&SubIndustry=${SubIndustry}`)
    const data = await (await res).data
    return data.data
}

export const salesFilter = async ({queryKey})=>{
    console.log("called")
    const {MainIndustry, SubIndustry}= queryKey[1]

    const res = axios.get(`/ManageIndustries/GetManageIndustries?MainIndustry=${MainIndustry}&SubIndustry=${SubIndustry}`)
    const data = await (await res).data
    return data.data
}
export const userFilter = async ({queryKey})=>{
    console.log("called")
    const {Entity, BusinessUnit, ShopGrouping, ShopSplit, Shop, Active}= queryKey[1]

    const res = axios.get(`/General/GetPORUsers?Entity=${Entity}&BusinessUnit=${BusinessUnit}&ShopGrouping=${ShopGrouping}&ShopSplit=${ShopSplit}&Shop=${Shop}&Active=${Active}`)
    const data = await (await res).data
    return data.data
}
