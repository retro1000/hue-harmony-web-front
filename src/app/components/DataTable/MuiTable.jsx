import React from 'react'
import { useState, useEffect } from 'react';

import { Chip, Grid, Button, IconButton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MUIDataTable from 'mui-datatables'

// const CustomMuiTable = styled(MUIDataTable)({
//   '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.css-1idn90j-MuiGrid-root': {
//       padding: '0'
//   },
//   '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.tss-11quiee-MUIDataTable-paper.tss-1x5mjc5-MUIDataTable-root.custom_styles_footer.custom_styles_shadow.css-12kyv6a-MuiPaper-root': {
//       boxShadow: 'none'
//   }
// });

const theme = () => createTheme({
  components: {
    MuiGrid: {
      styleOverrides:{
        root: {
          paddingLeft: '0'
        }
      }
    },
    MUIDataTable: {
      styleOverrides:{
        root: {
          boxShadow: 'none', // Remove box shadow
        },
        // paper: {
        //   boxShadow: 'none', // Remove box shadow from paper (optional, depending on your use case)
        // },
        // tableCell: {
        //   paddingLeft: '0px', // Remove left padding
        // },
      }
    },
  }
})


const renderButtons = (buttonsConfig, rowIndex) => {
  return buttonsConfig.map((buttonConfig, index) => {
    const { type, label, color, size, icon: Icon, onClick } = buttonConfig;
    
    if (type === 'icon') {
      return (
        <IconButton
          key={index}
          color={color}
          size={size}
          onClick={() => onClick(rowIndex)}
        >
          <Icon />
        </IconButton>
      );
    } else {
      return (
        <Button
          key={index}
          variant="contained"
          color={color}
          size={size}
          onClick={() => onClick(rowIndex)}
          style={{ marginLeft: 8 }}
        >
          {label}
        </Button>
      );
    }
  });
};

const renderStatusChip = (status) => {
  let color;
  switch (status) {
    case 'Active':
    case 'Available':
      color = '#4caf50';
      break;
    case 'Inactive':
      color = '#ffbc00';
      break;
    case 'Pending':
      color = 'blue';
      break;
    case 'Banned':
    case 'Canceled':
    case 'Blocked':
    case 'Failed':
      color = 'red';
      break;
    default:
      color = 'gray';
  }
  return <Chip label={status} sx={{background: color, color: 'white', height: '2em', border: 'none'}} variant="outlined" />;
};

export default function MuiTable({ search, download, print, dataTableData, columns, filterType, selectableRows, title }){

  const [updatedCols, setUpdatedCols] = useState([])

  useEffect(() => {
    const newCols = columns.filter(val=>val.name!=='Actions'&&val.name!=='Status')
    const option = columns.find(val=>val.name==='Actions')
    const statusOption = columns.find(val=>val.name==='Status')
    if(statusOption){
      newCols.push({
        name: 'Status',
        label: 'Status',
        options: {
          customBodyRender: (value) => renderStatusChip(value)
        }
      })
    }
    if(option){
      newCols.push({
        name: 'Actions',
        label: 'Actions',
        options: {
          customBodyRender: (value, tableMeta) => {
            const rowIndex = tableMeta.rowIndex;
            return <Grid sx={{display: 'flex', gap: '0.3em'}}>{renderButtons(option.options.buttonsConfig, rowIndex)}</Grid>;
          }
        }
      })
    }
    setUpdatedCols(newCols)
  }, [columns])

  return (
      <Grid container sx={{width: '100%'}}>
        <Grid item xs={12}>
          <ThemeProvider theme={theme}>
                <MUIDataTable
                    title={title}
                    data={dataTableData}
                    columns={updatedCols}
                    options={{
                      selectableRows: selectableRows,
                      sort: true,
                      print: print,
                      download: download,
                      search: search,
                      filterType: filterType,
                      responsive: 'simple'
                    }}
                    // className='custom_styles_footer custom_styles_shadow'
                />
          </ThemeProvider>
        </Grid>
      </Grid>
  )
}
