import * as Yup from 'yup'


export const SkuBrandValidation = Yup.object().shape({
    DisplayName: Yup.string().required("Required"),
    Level: Yup.number(),
    ShopSplitID: Yup.number().when("Number",{
        is: 2,
        then: Yup.number().required("Required")
    })
})