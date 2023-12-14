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
  Avatar,
  AvatarGroup,
} from "@mui/material";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import EvaluationForm from "./evaluationForm";

function createData(
  id,
  name,
  email,
  university,
  gpa,
  accomplishments,
  assigned_team,
  cv_url
) {
  return {
    id,
    name,
    email,
    university,
    gpa,
    accomplishments,
    assigned_team,
    cv_url,
  };
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
  const [selectedRow, setSelectedRow] = useState({
    id: "",
    name: "",
  }); // Added state to track the selected row
  const [evaluationFormsOpen, setEvaluationFormsOpen] = React.useState(false);

  const handleEvaluationFormOpen = () => {
    setEvaluationFormsOpen(true);
  };

  const handleEvaluationFormClose = () => {
    setEvaluationFormsOpen(false);
  };
  const handleSave = () => {
    console.log("Selected Status Map:", selectedStatusMap);
    handleClose();
    window.location.reload();
  };

  const handleClose = () => {
    parentHandleClose();
  };

  const handleStatusChange = (internId, selectedValue) => {
    setSelectedStatusMap((prev) => ({
      ...prev,
      [internId]: selectedValue,
    }));
    console.log("Selected Status :", internId, selectedValue);

    axios
      .put(`http://localhost:5000/api/interns/${internId}`, {
        status: selectedValue,
      })
      .then((response) => {
        console.log(response);
        toast.success("Status updated successfully", {
          autoClose: 2800,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update status", {
          autoClose: 2800,
        });
      });
  };

  const [data, setData] = useState([{}]);

  const rows = data.map((item) =>
    createData(
      item.id,
      item.name,
      item.email,
      item.university,
      item.gpa,
      item.accomplishments,
      item.assigned_team,
      item.cv_url
    )
  );

  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/interns");

        const interns = response.data.map((item) => ({
          id: item.id,
          name: `${item.first_name} ${item.last_name}`,
          email: item.email,
          university: item.university,
          gpa: item.gpa,
          accomplishments: item.accomplishments,
          assigned_team: item.assigned_team,
          cv_url: item.cv_url,
        }));

        console.log("interns", interns);

        // Initialize selectedStatusMap here
        const initialStatusMap = {};
        interns.forEach((row) => {
          initialStatusMap[row.id] = row.status;
        });
        setSelectedStatusMap(initialStatusMap);

        setData(interns);
      } catch (error) {
        console.error("Error fetching data from the backend:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Check if the pressed key is the Enter key
      if (event.key === "Enter") {
        // Call the handleSave function
        handleSave();
      }
    };

    // Add event listener for keypress
    window.addEventListener("keypress", handleKeyPress);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleSave]);

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    if (!name) {
      return null;
    }

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

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
        <Box
          sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "20px" }}
        >
          {data.length > 0 && (
            <AvatarGroup total={data.length}>
              {rows.map((row) => (
                <Avatar key={row.id} {...stringAvatar(row.name)} />
              ))}
            </AvatarGroup>
          )}

          <Box sx={{ marginTop: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>University</TableCell>
                    <TableCell>GPA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      onClick={() => {
                        setEvaluationFormsOpen(true);
                        setSelectedRow({ id: row.id, name: row.name }); // Update the selectedRow state
                      }}
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": {
                          backgroundColor: "#f0f0f0",
                          cursor: "pointer",
                        }, // Add hover effect here
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.university}</TableCell>
                      <TableCell>{row.gpa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <EvaluationForm
        title={`Evaluation Form for ${selectedRow.name}`}
        id={selectedRow.id}
        handleClickOpen={handleEvaluationFormOpen}
        handleClose={handleEvaluationFormClose}
        open={evaluationFormsOpen}
      />
    </div>
  );
}
