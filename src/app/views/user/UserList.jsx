import { useState } from "react";

import {
  Stack,
  Box,
  styled,
  Tabs,
  Tab,
  Typography,
  Select,
  Button,
  Grid,
  IconButton,
  Icon,
  MenuItem,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import {
  PopupFormDialog,
  SearchBarDefault,
  Breadcrumb,
  SimpleCard,
  MuiTable,
  TButton,
} from "app/components";

import { useNotistack } from "app/hooks/useNotistack";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewIcon from "@mui/icons-material/RemoveRedEye";
import AddIcon from "@mui/icons-material/AddBox";
import AddUserIcon from "@mui/icons-material/PersonAddAlt";
// import { Tooltip } from "@mui/material";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

function UserList() {
  const [selectedAction, setSelectedAction] = useState("id");

  const [searchText, setSearchText] = useState(undefined);

  const [addUserOn, setAddUserOn] = useState(false);

   

    const [editUserOn, setEditUserOn] = useState(false);
    const [currentEditUser, setCurrentEditUser] = useState(null);

    const [newUser, setNewUser] = useState({})
    const [editUser, setEditUserValues] = useState({})

  const addUserFields = [
    {
      title: "User Details",
      inputs: [
        {
          key: "f_name_text",
          required: true,
          id: "f_name_text",
          name: "firstName",
          label: "First Name",
          type: "text",
          placeholder: "Enter first name",
          value: newUser.firstName || "",
          setValue: (val) => setNewUser({ ...newUser, firstName: val }),
        },
        {
          key: "l_name_text",
          required: true,
          id: "l_name_text",
          name: "lastName",
          label: "Last Name",
          type: "text",
          placeholder: "Enter last name",
          value: newUser.lastName || "",
          setValue: (val) => setNewUser({ ...newUser, lastName: val }),
        },
        {
          key: "email",
          required: true,
          id: "email",
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter email address",
          value: newUser.email || "",
          setValue: (val) => setNewUser({ ...newUser, email: val }),
        },
        {
          key: "username_text",
          required: true,
          id: "username_text",
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "Enter username",
          value: newUser.username || "",
          setValue: (val) => setNewUser({ ...newUser, username: val }),
        },
        {
          key: "password",
          required: true,
          id: "password",
          name: "password",
          label: "Password",
          type: "password",
          value: newUser.password || "",
          setValue: (val) => setNewUser({ ...newUser, password: val }),
        },
        {
          key: "retype_password",
          required: true,
          id: "retype_password",
          name: "retypePassword",
          label: "Retype Password",
          type: "password",
          value: newUser.retypePassword || "",
          setValue: (val) => setNewUser({ ...newUser, retypePassword: val }),
        },
        {
          key: "role_select",
          id: "role_select",
          name: "role",
          label: "Role",
          required: true,
          type: "select",
          value: newUser.role || 0,
          setValue: (val) => setNewUser({ ...newUser, role: val }),
          break: true,
          options: [
            { label: "Admin", value: 1 },
            { label: "User", value: 2 },
          ],
        },
      ],
    },
    {
      title: "Additional Details",
      inputs: [
        {
          key: "adddress_text",
          required: false,
          id: "adddress_text",
          name: "address",
          label: "Address",
          type: "text",
          placeholder: "Enter address",
          value: newUser.address || "",
          setValue: (val) => setNewUser({ ...newUser, address: val }),
        },
        {
          key: "mobile_tel",
          required: false,
          id: "mobile_tel",
          name: "mobilePhone",
          label: "Mobile Phone",
          type: "tel",
          placeholder: "Enter mobile number",
          value: newUser.mobilePhone || "",
          setValue: (val) => setNewUser({ ...newUser, mobilePhone: val }),
        },
      ],
    },
  ];

    const editUserFields = [
      {
        title: 'User Details',
        inputs: [
          {key: 'f_name_text', required: true, id: 'f_name_text', name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Enter first name', value: editUser.firstName || '', setValue: (val) => setEditUserValues({...editUser, firstName: val})},
          {key: 'l_name_text', required: true, id: 'l_name_text', name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Enter last name', value: editUser.lastName || '', setValue: (val) => setEditUserValues({...editUser, lastName: val})},
          {key: 'email', required: true, id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'Enter email address', value: editUser.email || '', setValue: (val) => setEditUserValues({...editUser, email: val})},
          {key: 'username_text', required: true, id: 'username_text', name: 'username', label: 'Username', type: 'text', placeholder: 'Enter username', value: editUser.username || '', setValue: (val) => setEditUserValues({...editUser, username: val})},
          {key: 'password', required: true, id: 'password', name: 'password', label: 'Password', type: 'password', value: editUser.password || '', setValue: (val) => setEditUserValues({...editUser, password: val})},
          {key: 'retype_password', required: true, id: 'retype_password', name: 'retypePassword', label: 'Retype Password', type: 'password', value: editUser.retypePassword || '', setValue: (val) => setEditUserValues({...editUser, retypePassword: val})},
          {key: 'role_select', id: 'role_select', name: 'role', label: 'Role', required: true, type: 'select', value: editUser.role || 0, setValue: (val) => setEditUserValues({...editUser, role: val}), break:true,  options: [{label: 'Admin', value: 1}, {label: 'User', value: 2}]},
        ]
      },
      {
        title: 'Additional Details',
        inputs: [
          {key: 'adddress_text', required: false, id: 'adddress_text', name: 'address', label: 'Address', type: 'text', placeholder: 'Enter address', value: editUser.address || '', setValue: (val) => setEditUserValues({...editUser, address: val})},
          {key: 'mobile_tel', required: false, id: 'mobile_tel', name: 'mobilePhone', label: 'Mobile Phone', type: 'tel', placeholder: 'Enter mobile number', value: editUser.mobilePhone || '', setValue: (val) => setEditUserValues({...editUser, mobilePhone: val})},
        ]
      }
    ]

  const [searchResult, setSearchResult] = useState([
    ["U001", "John", "Doe", "johndoe", "Admin", "Active"],
    ["U002", "Jane", "Smith", "janesmith", "User", "Inactive"],
    ["U003", "Mike", "Brown", "mikebrown", "User", "Pending"],
  ]);

  const [datatableData, setDataTableData] = useState([
    ["U001", "John", "Doe", "johndoe", "Admin", "Active"],
    ["U002", "Jane", "Smith", "janesmith", "User", "Inactive"],
    ["U003", "Mike", "Brown", "mikebrown", "User", "Pending"],
    ["U004", "Lisa", "White", "lisawhite", "Admin", "Active"],
    ["U005", "Chris", "Green", "chrisgreen", "User", "Blocked"],
    ["U006", "Pat", "Lee", "patlee", "User", "Active"],
    ["U007", "Sam", "Kim", "samkim", "User", "Inactive"],
    ["U008", "Alex", "Taylor", "alextaylor", "Admin", "Active"],
    ["U009", "Kelly", "Jordan", "kellyjordan", "User", "Pending"],
    ["U010", "Robin", "Davis", "robindavis", "User", "Active"],
    ["U011", "Jamie", "Morgan", "jamiemorgan", "Admin", "Blocked"],
    ["U012", "Riley", "Thomas", "rileythomas", "User", "Active"],
    ["U013", "Morgan", "Hill", "morganhill", "User", "Inactive"],
    ["U014", "Casey", "Adams", "caseyadams", "Admin", "Active"],
    ["U015", "Jordan", "Brown", "jordanbrown", "User", "Blocked"],
    ["U016", "Taylor", "Lopez", "taylorlopez", "User", "Active"],
    ["U017", "Cameron", "Evans", "cameronevans", "Admin", "Pending"],
  ]);

    const [columns, setColumns] = useState([
      {
        name:'User Id',
        label: 'User Id',
      },
      {
        name:'First Name',
        label: 'First Name',
      },
      {
        name:'Last Name',
        label: 'Last Name',
      },
      {
        name:'Username',
        label: 'Username',
      },
      {
        name:'Role',
        label: 'Role',
      },
      {
        name:'Status',
        label: 'Status',
      },
      {
        name: "Actions",
        label: "Actions",
        options: {
            buttonsConfig: [
              {
                title: 'Enable user',
                type: 'text',
                label: 'Enable',
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  console.log('Enable button clicked for row', index);
                },
              },
              {
                title: 'View user',
                type: 'icon',
                icon: ViewIcon,
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  console.log('View button clicked for row', index);
                },
              },
              {
                title: 'Edit user',
                type: 'icon',
                icon: EditIcon,
                color: 'primary',
                size: 'small',
                onClick: (index) => {
                  const user = datatableData[index];
                  setCurrentEditUser(user);
                  setEditUserValues({
                    firstName: user[1],
                    lastName: user[2],
                    email: user[3],
                    username: user[4],
                    password: '',
                    retypePassword: '',
                    role: user[5],
                    address: user[6],
                    mobilePhone: user[7],
                  });
                  setEditUserOn(true);
                },
              },
              {
                title: 'Remove user',
                type: 'icon',
                icon: DeleteIcon,
                color: 'red',
                size: 'small',
                onClick: (index) => {
                  console.log('Delete icon button clicked for row', index);
                },
              }
            ]
        },
      },
    ]);

  const search = () => {};

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "User" }, { name: "List" }]} />
      </Box>

      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
        }}
        spacing={5}
      >
        <Box
          gap={"0.5em"}
          display={"flex"}
          flexWrap={"wrap"}
          sx={{ width: "100%" }}
        >
          <TButton
            title="Add new user"
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            label={"User"}
            fun={setAddUserOn}
          ></TButton>
        </Box>
        <SimpleCard sx={{ width: "100%", top: "-3em" }} title={"Search Users"}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            gap={"0.4em"}
            sx={{ width: "100%" }}
          >
            <Select
              sx={{ width: "20%" }}
              value={selectedAction}
              size="small"
              onChange={(event) => setSelectedAction(event.target.value)}
            >
              <MenuItem value={"id"}>Search by user id</MenuItem>
              <MenuItem value={"f_name"}>Search by first name</MenuItem>
              <MenuItem value={"l_name"}>Search by last name</MenuItem>
              <MenuItem value={"username"}>Search by username</MenuItem>
              <MenuItem value={"all"}>Search by all</MenuItem>
            </Select>
            <SearchBarDefault
              sx={{ width: "80%" }}
              value={searchText}
              setValue={setSearchText}
              placeholder={"Search users..."}
              search={search}
            ></SearchBarDefault>
          </Box>
          {searchResult && searchResult.length > 0 && (
            <MuiTable
              search={false}
              print={false}
              download={false}
              columns={columns}
              dataTableData={searchResult}
              selectableRows={"none"}
              filterType={"text"}
            />
          )}
        </SimpleCard>
        <SimpleCard sx={{ width: "100%" }}>
          <MuiTable
            print={true}
            download={true}
            title={"Users"}
            columns={columns}
            dataTableData={datatableData}
            selectableRows={"none"}
            filterType={"text"}
          />
        </SimpleCard>
      </Stack>

          <PopupFormDialog
                  open={addUserOn}
                  title="Add User"
                  submitButton="Add User"
                  titleIcon={<AddUserIcon />}
                  fields={addUserFields}
                  setOpen={setAddUserOn}
                  reasonCloseOn={true}
                  setValues={setNewUser}
                />

          <PopupFormDialog
              open={editUserOn}
              title="Edit User"
              submitButton="Save Changes"
              titleIcon={<EditIcon />}
              fields={editUserFields}
              setOpen={setEditUserOn}
              reasonCloseOn={true}
              setValues={setEditUserValues}
          />
        </Container>
    );
}

export default UserList;
