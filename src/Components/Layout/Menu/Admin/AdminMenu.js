export const AdminMenu =  [
    {
        label:"Inventory",
        route:"/inventory",
        children:[
           
            
        ]
    },
    {
        label:"Financial Reports",
        route:"route4",
        children:[
            {
                label:"Finalized Reports",
                route:"route4.1",
                children:[
                    {
                        label:"I/S Business Unit",
                        route:"route4",
                    },
                    {
                        label:"I/S Consolidated",
                        route:"route4",
                    },
                    
                ]
            }
        ]
    }
]