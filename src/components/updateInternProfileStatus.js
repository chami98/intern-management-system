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

function createData(name, university, gpa, accomplishments, status) {
  return { name, university, gpa, accomplishments, status };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUserAccountDialog({
  title,
  open,
  handleClickOpen,
  handleClose: parentHandleClose,
}) {
  const [selectedStatusMap, setSelectedStatusMap] = useState({});
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    console.log("Selected Status Map:", selectedStatusMap);
    handleClose();
  };

  const handleClose = () => {
    parentHandleClose();
  };

  const handleStatusChange = (rowName, selectedValue) => {
    setSelectedStatusMap((prev) => ({
      ...prev,
      [rowName]: selectedValue,
    }));

    console.log("Selected Status Map:", selectedStatusMap);
  };

  const [data, setData] = useState([{}]);

  const rows = data.map((item) =>
    createData(
      item.name,
      item.university,
      item.gpa,
      item.accomplishments,
      item.status
    )
  );

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interns");
        const interns = response.data.map((item) => {
          return {
            name: item.first_name + " " + item.last_name,
            university: item.university,
            gpa: item.gpa,
            accomplishments: item.accomplishments,
            status: item.status,
          };
        });
        console.log("interns", interns);
  
        // Initialize selectedStatusMap here
        const initialStatusMap = {};
        interns.forEach((row) => {
          initialStatusMap[row.name] = row.status;
        });
        setSelectedStatusMap(initialStatusMap);
  
        setData(interns);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };
  
    fetchData();
  }, []);
  

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
                  <TableCell align="right">University</TableCell>
                  <TableCell align="right">gpa</TableCell>
                  <TableCell align="right">Accomplishments</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.university}</TableCell>
                    <TableCell align="right">{row.gpa}</TableCell>
                    <TableCell align="right">{row.accomplishments}</TableCell>
                    <TableCell align="right">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id={`status-label-${row.name}`}>
                          Status
                        </InputLabel>
                        <Select
                          labelId={`status-label-${row.name}`}
                          id={`status-${row.name}`}
                          value={selectedStatusMap[row.name] || ""}
                          onChange={(e) =>
                            handleStatusChange(row.name, e.target.value)
                          }
                          label="Status"
                        >
                          {Array.from(
                            new Set(rows.map((row) => row.status))
                          ).map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
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
