import React from 'react'
import { useState, useEffect } from 'react';

import { Chip, Grid } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TButton, TIconButton } from '..';

import MUIDataTable from 'mui-datatables'
import { useAxios } from 'app/hooks/useAxios';
import { useFormatter } from 'app/hooks/useFormatter';
// import { makeStyles } from '@mui/styles';

// const CustomMuiTable = styled(MUIDataTable)({
//   '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-12.css-1idn90j-MuiGrid-root': {
//       padding: '0'
//   },
//   '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded.MuiPaper-elevation4.tss-11quiee-MUIDataTable-paper.tss-1x5mjc5-MUIDataTable-root.custom_styles_footer.custom_styles_shadow.css-12kyv6a-MuiPaper-root': {
//       boxShadow: 'none'
//   }
// });

// const useStyles = makeStyles((theme) => ({
//   oddRow: {
//       backgroundColor: '#f0f0f0',
//       '&:hover': {
//           backgroundColor: theme.palette.action.hover,
//       },
//   },
//   evenRow: {
//       backgroundColor: '#ffffff',
//       '&:hover': {
//           backgroundColor: theme.palette.action.hover,
//       },
//   },
//   tableCell: {
//       padding: '16px', // Adjust this value to make rows taller
//   },
// }));

const theme = () => createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '& .MuiTableFilter-root': {
            display: 'grid', // Set grid display
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', // Define grid columns
            gap: '16px', // Set gap between grid items
            padding: '16px', // Add padding for better spacing
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides:{
        root: {
          paddingLeft: '0',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        },
        item: {
          paddingTop: '1px !important',
        },
        container: {
          display: 'flex !important',
          alignItems: 'flex-start !important',
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

const renderUserRoleChip = (role) => {
  let color;
  switch (role) {
    case 'User':
      color = '#4caf50';
      break;
    case 'Cashier':
    case 'Back Office Staff':
      color = '#ffbc00';
      break;
    case 'Inventory Manager':
    case 'Sales Manager':
      color = 'blue';
      break;
    case 'Admin':
      color = 'red';
      break;
    default:
      color = 'gray';
  }
  return <Chip label={role} sx={{background: color, color: 'white', height: '2em', border: 'none'}} variant="outlined" />;
};

const renderButtons = (buttonsConfig, rowData, upadteDataTable) => {
  // console.log(rowIndex, dataTableData)
  return buttonsConfig.map((buttonConfig, index) => {
    const { title, type, label, color, size, icon, onClick } = buttonConfig;
    
    if (type === 'icon') {
      return (
        <TIconButton
          key={index}
          title={title}
          color={color}
          size={size}
          fun={() => onClick(rowData[0], upadteDataTable)}
          icon={icon}
        ></TIconButton>
      );
    } else {
      return (
        <TButton
          title={title}
          sx={{textTransform: 'none'}}
          key={index}
          variant="outlined"
          color={color}
          size={size}
          onClick={() => onClick(rowData[0], upadteDataTable)}
          style={{ marginLeft: 8 }}
          label={label}
        ></TButton>
      );
    }
  });
};

export default function MuiTable({ columnOrder, path, serverSide=true, rowsPerPage=true, pagination=true, filter, cols, search, download, print, columns, filterType, selectableRows, title }){

  // const classes = useStyles();

  const [updatedCols, setUpdatedCols] = useState([])

  const [loading, setLoading] = useState(false)

  const [dataTableData, setDataTableData] = useState([
    // ['111', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Available'],
    //   ['2', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Inactive'],
    //   ['3', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Pending'],
    //   ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Blocked'],
    //   ['D#45er', 'Wall paint', 'Dulux', 'Paint', 'Red', '4 Ltr', '11000.00', '13', 'Sold'],
    //   ['Kaui Ignace', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Esperanza Susanne', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Christian Birgitte', 'Example Inc.', 'Tampa', 'FL'],
    //   ['Meral Elias', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Deep Pau', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Sebastiana Hani', 'Example Inc.', 'Dallas', 'TX'],
    //   ['Marciano Oihana', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Brigid Ankur', 'Example Inc.', 'Dallas', 'TX'],
    //   ['Anna Siranush', 'Example Inc.', 'Yonkers', 'NY'],
    //   ['Avram Sylva', 'Example Inc.', 'Hartford', 'CT'],
    //   ['Serafima Babatunde', 'Example Inc.', 'Tampa', 'FL'],
    //   ['Gaston Festus', 'Example Inc.', 'Tampa', 'FL'],
  ])

  const [totalCount, setTotalCount] = useState(dataTableData.length)

  const [tableOptions, setTableOptions] = useState({
    page: 0,
    rowsPerPage: 10,
    search: '',
    filter: {},
    sort: {}
  });

  const { api, apiNonAuth } = useAxios()

  const { CamelCaseWordFormat2 } = useFormatter()

  const upadteDataTable = (id) => {
    setDataTableData(dataTableData.filter(p => p[0]!==id))
  }


  useEffect(() => {

    const fetchData = async () => {
      const { page, rowsPerPage, search, filter, sort } = tableOptions;
      setLoading(true)
      // Example API call
      await apiNonAuth.get(
        `/${path}/filter?page=${page}&limit=${rowsPerPage}${search && search!=='' && '&search='+search}${
        filter && Object.keys(filter).length>0 ? '&'+Object.keys(filter).map(key => key+'='+(Array.isArray(filter[key]) ? filter[key].join(',') : filter[key])).join('&') : ''}${
        sort && Object.keys(sort).length>0 ? '&sortCol='+CamelCaseWordFormat2(sort.name)+'&sortOrder='+sort.direction.toUpperCase() : ''}`
      )
        .then(response => {
          if(response.status===200){
            setDataTableData(response.data.content.map(i => columnOrder.map(key => i[key])));
            setTotalCount(response.data.totalElements);
          }
          if(response.status===204){
            setDataTableData([]);
            setTotalCount(0);   
          }
        })
        .catch(error => {})
        .finally(() => {})
  
      // Update your data table with the fetched data
       // For pagination
    };
  
    fetchData();
  }, [tableOptions]);
  

  useEffect(() => {
    const newCols = columns.filter(val=>val.name!=='Actions'&&val.name!=='Status'&&val.name!=='Role')
    const option = columns.find(val=>val.name==='Actions')
    const statusOption = columns.find(val=>val.name==='Status')
    const roleOption = columns.find(val=>val.name==='Role')
    if(statusOption){
      newCols.push({
        name: 'Status',
        label: 'Status',
        options: {
          customBodyRender: (value) => renderStatusChip(value)
        }
      })
    }
    if(roleOption){
      newCols.push({
        name: 'Role',
        label: 'Role',
        options: {
          customBodyRender: (value) => renderUserRoleChip(value)
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
            const rowData = tableMeta.rowData;
            return <Grid sx={{display: 'flex', gap: '0.3em'}}>{renderButtons(option.options.buttonsConfig, rowData, upadteDataTable)}</Grid>;
          },
          filter: false,
          sort: false
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
                      loading,
                      selectableRows: selectableRows,
                      onTableChange: (action, tableState) => {
                        switch (action) {
                          case 'changePage':
                            setTableOptions((prev) => ({ ...prev, page: tableState.page }));
                            break;
                          case 'changeRowsPerPage':
                            setTableOptions((prev) => ({
                              ...prev,
                              rowsPerPage: tableState.rowsPerPage,
                              page: 0, // Reset to the first page
                            }));
                            break;
                          case 'search':
                            setTableOptions((prev) => ({ ...prev, search: tableState.searchText || '' }));
                            break;
                          case 'filterChange':
                            const newFilter = {};
                            tableState.filterList.forEach((value, index) => {
                              if (value.length > 0) newFilter[CamelCaseWordFormat2(tableState.columns[index].name)] = value;
                            });
                            setTableOptions((prev) => ({ ...prev, filter: newFilter }));
                            break;
                          case 'sort':
                            setTableOptions((prev) => ({ ...prev, sort: tableState.sortOrder }))
                            break;
                          default:
                            break;
                        }
                      },
                      page: tableOptions.page,
                      rowsPerPage: tableOptions.rowsPerPage,
                      searchText: tableOptions.search,
                      count: totalCount, // Set the total number of records for pagination
                      // customRowRender: (data, dataIndex, rowIndex) => {
                      //   const rowColor = rowIndex % 2 === 0 ? '#f0f0f0' : '#ffffff'; // Alternating colors
                      //   return (
                      //     <tr style={{ backgroundColor: rowColor }}>
                      //       {data.map((value, columnIndex) => (
                      //         <td key={columnIndex}>{value}</td>
                      //       ))}
                      //     </tr>
                      //   );
                      // },
                      // setRowProps: (row, dataIndex, rowIndex) => {
                      //   return {
                      //       className: rowIndex % 2 === 0 ? 'evenRow' : 'oddRow',
                      //   };
                      // },
                      sort: true,
                      print: print,
                      download: download,
                      search: search,
                      filter: filter,
                      viewColumns: cols,
                      filterType: filterType,
                      pagination: pagination,
                      // rowsPerPage: rowsPerPage,
                      responsive: 'simple',
                      serverSide: serverSide
                    }}
                    // classes={{
                    //   row: classes.tableRow,
                    // }}
                    // className='custom_styles_footer custom_styles_shadow'
                />
          </ThemeProvider>
        </Grid>
      </Grid>
  )
}
