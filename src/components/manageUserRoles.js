import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

function createData(id, name, email, role_id) {
  return { id, name, email, role_id };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ManageUserRoles({
  title,
  open,
  handleClickOpen,
  handleClose: parentHandleClose,
}) {
  // State for managing the selected roles map
  const [selectedRolesMap, setSelectedRolesMap] = useState({});

  // State for managing the loading state
  const [loading, setLoading] = React.useState(false);

  // Handler for saving the changes
  const handleSave = () => {
    console.log("Selected Role Map:", selectedRolesMap);
    window.location.reload(); // Reload the page to reflect the changes
    handleClose();
  };

  // Handler for closing the dialog
  const handleClose = () => {
    parentHandleClose(); // Call the parent's handleClose function
  };

  // Handler for changing the role of a user
  const handleRoleChange = (id, selectedValue) => {
    // Update the selected roles map with the new role
    setSelectedRolesMap((prev) => ({
      ...prev,
      [id]: selectedValue,
    }));
    console.log("Selected Role for User ID:", id, selectedValue);

    // Make a PUT request to the server to update the role of the user
    axios
      .put(`http://localhost:5000/api/users/${id}`, {
        role_id: selectedValue,
      })
      .then((response) => {
        console.log(response);
        // Show a success toast if the request was successful
        toast.success("Role updated successfully", {
          autoClose: 2800,
        });
      })
      .catch((error) => {
        console.log(error);
        // Show an error toast if the request failed
        toast.error("Failed to update role", {
          autoClose: 2800,
        });
      });
  };

  // State for managing the data
  const [data, setData] = useState([{}]);

  // Create rows from the data
  const rows = data.map((item) =>
    createData(item.id, item.name, item.email, item.role_id)
  );

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");

        const users = response.data.map((item) => ({
          id: item.id,
          name: `${item.first_name} ${item.last_name}`,
          email: item.email,
          role_id: item.role_id,
        }));

        console.log("users", users);

        // Initialize selectedRolesMap here
        const initialRoleMap = {};
        users.forEach((row) => {
          initialRoleMap[row.id] = row.role_id;
        });
        setSelectedRolesMap(initialRoleMap);

        setData(users);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchData();
  }, []);

  const roleOptions = [
    { id: 1, label: "Admin" },
    { id: 2, label: "Evaluator" },
    { id: 3, label: "Mentor" },
    { id: 4, label: "Intern" },
    { id: 6, label: "Management" },
  ];

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ margin: "60px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  {/* <TableCell align="right">Role ID</TableCell> */}
                  <TableCell align="right">Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                      {console.log("row", row)}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    {/* <TableCell align="right">{row.role_id}</TableCell> */}
                    <TableCell align="right">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id={`role-label-${row.id}`}>Role</InputLabel>
                        <Select
                          labelId={`role-label-${row.id}`}
                          id={`role-${row.id}`}
                          value={selectedRolesMap[row.id] || ""}
                          onChange={(e) => handleRoleChange(row.id, e.target.value)}
                          label="Role"
                        >
                          {roleOptions.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
