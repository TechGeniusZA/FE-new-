import React from 'react'
import { DataGrid } from "@mui/x-data-grid";
import CustomToolBar from '../CustomToolbar';
function DataGrid({columns=[], rows=[],create=()=>{}}) {
  return (
    <DataGrid
    autoHeight
    rows={rows}
    columns={columns}
    pageSize={20}
    components={{
      Toolbar: CustomToolBar
    }}
    componentsProps={{
      toolbar: {
        open: () => {
            create
        },
        csvOptions: { allColumns: false }
      }
    }}
    getRowId={(row) => row.id}
    getRowHeight={()=>"auto"}
    rowsPerPageOptions={[20,50,100]}
    disableSelectionOnClick
    experimentalFeatures={{ newEditingApi: true }}
  />
  )
}

export default DataGrid