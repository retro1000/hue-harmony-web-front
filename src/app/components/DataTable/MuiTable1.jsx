import React from "react";
import { Grid, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none", // Remove box shadow
        },
      },
    },
  },
});

const MuiTable = ({
  title = "Table",
  columns = [],
  data = [],
  onUpdate = () => {},
  onDelete = () => {},
  options = {},
}) => {
  // Add the constant Action column
  const updatedColumns = [
    ...columns,
    {
      name: "Action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta) => {
          const rowIndex = tableMeta.rowIndex;
          return (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onUpdate(rowIndex)}
              >
                Update
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => onDelete(rowIndex)}
              >
                Delete
              </Button>
            </div>
          );
        },
        filter: false,
        sort: false,
      },
    },
  ];

  return (
    <Grid container sx={{ width: "100%", padding: 2 }}>
      <Grid item xs={12}>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title={title}
            data={data}
            columns={updatedColumns}
            options={{
              selectableRows: "none",
              responsive: "standard",
              rowsPerPage: 10,
              tableBodyMaxHeight: "100%",
              fixedHeader: true,
              ...options, // Spread additional options for flexibility
            }}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default MuiTable;
