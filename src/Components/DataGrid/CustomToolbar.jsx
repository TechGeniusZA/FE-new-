import AddCircle from '@mui/icons-material/AddCircleOutline';
import {
    GridToolbarExportContainer,
    GridCsvExportMenuItem,
    GridPrintExportMenuItem,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarQuickFilter
  } from "@mui/x-data-grid";
  import { MenuItem, Tooltip ,Button} from "@mui/material";
  import ExportPDF from "./CustomExports/ExportPDF";
  export default function CustomToolbar(
    { create, csvOptions, rows, printOptions, ColDef, ...other },
    props
  ) {
    return (
      <div style={{borderRadius:2,width:"100%",height:"60px",display:"flex",justifyContent:"space-between",padding:5}}>
        <div>
        <Button onClick={create} sx={{border:"none",fontWeight:"bold"}}  startIcon={<AddCircle />}>
        Create
      </Button>
        </div>
        <div>
        <GridToolbarQuickFilter sx={{color:"white"}} />
        </div>
        <div>
        {/**All the other toolbar options we want */}
        <Tooltip placement="top" title="Column Selector">
        <GridToolbarColumnsButton/></Tooltip>
      
        <Tooltip placement="top" title="Adjust Row Density">
        <GridToolbarDensitySelector /></Tooltip>
        {/**THis is the export drop down */}
        <Tooltip placement="top" title="Export Options">
        <GridToolbarExportContainer {...other}>
          <GridCsvExportMenuItem options={csvOptions} />
  
          <GridPrintExportMenuItem options={printOptions} />
          <ExportPDF options={props} />
        
        </GridToolbarExportContainer></Tooltip>
        </div>
      
      
      
      </div>
    );
  }
  