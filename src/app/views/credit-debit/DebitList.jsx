import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAxios } from "../../hooks/useAxios";
import { Stack, Box, styled, IconButton } from "@mui/material";
import { Breadcrumb, MuiTable, TButton } from "app/components";
import AddCreditIcon from '@mui/icons-material/PersonAdd';
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import useAuth from "app/hooks/useAuth";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function DebitList() {
  const { apiNonAuth } = useAxios();
  const navigate = useNavigate();
  const { role } = useAuth(); 
  const [data, setData] = useState([]);  // State for storing fetched debit data

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiNonAuth.get("credit-debit/debit/list");  // GET request to fetch debits
      const transformedData = response.data
        .filter((debit) => debit.id != null)  // Ensure we don't process null debits
        .map((debit) => ({
          debitId: debit.id,
          debitNoteDate: debit.debitNoteDate,
          debitNoteNotes: debit.debitNoteNotes || 'N/A',  // Handle null debitNoteNotes
          debitAmount: debit.debitAmount,
          customerId: debit.customer || 'N/A',  // Handle null customer
          invoiceId: debit.invoiceId || 'N/A',  // Handle null invoiceId
          actions: (
            <IconButton
              onClick={() => handleViewDebit(debit)}  // Handle view action
            >
               <ViewIcon />
            </IconButton>
          ),
        }));
      setData(transformedData);  // Update state with transformed data
    } catch (err) {
      console.error("Error fetching debit data:", err);  // Log any error
    }
  };

  const handleViewDebit = (debit) => {
    navigate(`/debit/view/${debit.debitId}`);  // Navigate to the view debit page
  };

  const columns = [
    { label: "Debit ID", name: "debitId" },
    { label: "Debit Note Date", name: "debitNoteDate" },
    { label: "Debit Note Notes", name: "debitNoteNotes" },
    { label: "Debit Amount (LKR)", name: "debitAmount" },
    { label: "Customer ID", name: "customerId" },
    { label: "Invoice ID", name: "invoiceId" },
    {
      label: "Actions",
      name: "actions",
      render: (row) => row.actions, // Render the action button
    },
  ];

  // Navigate to the Create Debit page
  const handleCreateDebit = () => {
    navigate("/credit-debit/create-debit");  // Navigate to the Create Debit page
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Debit" }, { name: "List" }]} />
      </Box>

      <Stack
        sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%" }}
        spacing={5}
      >
        <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{ width: '100%' }}>
          {role === 'BACKOFFICE' ? (
            <TButton
              title={'Create Debit'}
              startIcon={<AddCreditIcon />}
              variant={'contained'}
              label={'Create Debit'}
              color={'primary'}
              fun={handleCreateDebit}  // Trigger navigation on click
            />
          ) : ''}
        </Box>
        <MuiTable title="Debits" columns={columns} data={data} />
      </Stack>
    </Container>
  );
}

export default DebitList;
