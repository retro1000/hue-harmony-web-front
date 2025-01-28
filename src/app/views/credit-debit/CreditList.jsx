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

function CreditList() {
  const { apiNonAuth } = useAxios();
  const navigate = useNavigate();
  const { role } = useAuth(); // Assuming you are getting the role from the hook

  const [data, setData] = useState([]); // State for storing fetched credit data

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiNonAuth.get("credit-debit/credit/list"); // GET request to fetch credits
      const transformedData = response.data
        .filter((credit) => credit.id != null) // Ensure we don't process null credits
        .map((credit) => ({
          creditId: credit.id,
          creditNoteDate: credit.creditNoteDate,
          creditNoteNotes: credit.creditNoteNotes || 'N/A', // Handle null creditNoteNotes
          creditAmount: credit.creditAmount,
          customerId: credit.customer || 'N/A', // Handle null customer
          invoiceId: credit.invoiceId || 'N/A', // Handle null invoiceId
          actions: (
            <IconButton
              onClick={() => handleViewCredit(credit)} // Handle view action
            >
              <ViewIcon />
            </IconButton>
          ),
        }));
      setData(transformedData); // Update state with transformed data
    } catch (err) {
      console.error("Error fetching credit data:", err); // Log any error
    }
  };

  const handleViewCredit = (credit) => {
    navigate("/credit/view"); // Navigate to the view credit page
  };

  const columns = [
    { label: "Credit ID", name: "creditId" },
    { label: "Credit Note Date", name: "creditNoteDate" },
    { label: "Credit Note Notes", name: "creditNoteNotes" },
    { label: "Credit Amount (LKR)", name: "creditAmount" },
    { label: "Customer ID", name: "customerId" },
    { label: "Invoice ID", name: "invoiceId" },
    {
      label: "Actions",
      name: "actions",
      render: (row) => (
        <TButton
          title="View Credit"
          variant="outlined"
          color="primary"
          onClick={() => handleViewCredit(row)}
        >
          View
        </TButton>
      ),
    },
  ];

  // Navigate to the Create Credit page
  const handleCreateCredit = () => {
    console.log("Navigating to Create Credit"); // Log to verify if this function is triggered
    navigate("/credit-debit/create-credit"); // Navigate to the Create Credit page
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Credit" }, { name: "List" }]} />
      </Box>

      <Stack
        sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", width: "100%" }}
        spacing={5}
      >
        {/* Conditionally render the Create Credit button based on the role */}
        <Box gap={'0.5em'} display={'flex'} flexWrap={'wrap'} sx={{ width: '100%' }}>
          {role === 'BACKOFFICE' ? (
            <TButton
              title={'Create Credit'}
              startIcon={<AddCreditIcon />}
              variant={'contained'}
              label={'Create Credit'}
              color={'primary'}
              fun={handleCreateCredit}  // Trigger navigation on click
            />
          ) : ''}
        </Box>

        <MuiTable title="Credits" columns={columns} data={data} />
      </Stack>
    </Container>
  );
}

export default CreditList;
