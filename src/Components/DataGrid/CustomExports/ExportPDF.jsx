import { MenuItem } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  gridVisibleColumnFieldsSelector,
  gridFilteredSortedRowIdsSelector,
  useGridApiContext
} from "@mui/x-data-grid";

export default function ExportPDF() {
  // A built in MUI hook for getting the state of the current table
  const apiRef = useGridApiContext();
  const filteredSortedRowIds = gridFilteredSortedRowIdsSelector(apiRef);
  const visibleColumnsField = gridVisibleColumnFieldsSelector(apiRef);

  // Format the data. Incase the user has hidden some columns in the data grid
  const data = filteredSortedRowIds.map((id) => {
    const row = {};
    visibleColumnsField.forEach((field) => {
      row[field] = apiRef.current.getCellParams(id, field).value;
    });
    return row;
  });

  // Functions to export the data to pdf
  const exportPDF = async () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    // Set the font size
    doc.setFontSize(15);

    // name of the PDF doc at the top
    const title = "Data Export";

    // Dynamically get all the headers for the table from the data
    const headers = [Object.keys(data[0]).map((e) => e)];

    // Get the rows for the PDF
    const pdfData = data.map((e) => Object.values(e).map((x) => x));

    // The content of the PDF
    let content = {
      startY: 50,
      head: headers,
      body: pdfData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    // The name of the document
    doc.save("tableDownload.pdf");
  };
  return <MenuItem onClick={exportPDF}>PDF</MenuItem>;
}
