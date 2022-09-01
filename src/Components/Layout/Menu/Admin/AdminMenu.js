export const AdminMenu =  [
    {
        label:"Inventory",
        route:"route3",
        children:[
            {
                label:"SKU Brands",
                route:"inventory/SKUBrands"
            },
            {
                label:"child2 of Parent3",
                route:"route3.2"
            }
        ]
    },
    {
        label:"Parent4",
        route:"route4",
        children:[
            {
                label:"child1 of Parent4",
                route:"route4.1"
            },
            {
                label:"child2 of Parent4",
                route:"route4.2"
            }
        ]
    }
]