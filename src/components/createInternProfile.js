import * as React from "react";
import { useState } from "react";
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
  Grid,
  TextField,
  InputAdornment,
  InputLabel,
  FormControl,
  Autocomplete,
  Chip,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateInternProfile({
  title,
  open,
  handleClickOpen,
  handleClose,
}) {
  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    role: null,
    password: "",
  });

  const [university, setUniversity] = useState("");
  const [mentor, setMentor] = useState("");
  const [team, setTeam] = useState("");

  const handleChange = (event) => {};

  const handleUniversity = (event, newInputValue) => {
    setUniversity(newInputValue);
  };

  const handleMentor = (event, newInputValue) => {
    setMentor(newInputValue);
  };

  const handleTeam = (event, newInputValue) => {
    setTeam(newInputValue);
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/register", formData)
      .then((response) => {
        console.log("Response from the server:", response.data);

        toast.success("User account created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Close the dialog after saving
        handleClose();
      })
      .catch((error) => {
        toast.error(
          "Error occurred during the request. Please try again later.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.error("Error occurred during the request:", error);
      });

    console.log("Form data to be sent:", formData);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [evaluation1Score, setEvalution1Score] = useState("");
  const [evaluation2Score, setEvalution2Score] = useState("");
  const [evaluation1Feedback, setEvalution1Feedback] = useState("");
  const [evaluation2Feedback, setEvalution2Feedback] = useState("");

  const [feedback, setFeedback] = useState("");

  const handleEvalution1ScoreChange = (event) => {
    setEvalution1Score(event.target.value);
  };

  const handleEvalution2ScoreChange = (event) => {
    setEvalution2Score(event.target.value);
  };

  const handleEvalution1FeedbackChange = (event) => {
    setEvalution1Feedback(event.target.value);
  };

  const handleEvalution2FeedbackChange = (event) => {
    setEvalution2Feedback(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const theme = useTheme();

  const universities = [
    { label: "University of Colombo" },
    { label: "University of Peradeniya" },
    { label: "University of Moratuwa" },
    { label: "University of Sri Jayewardenepura" },
    { label: "University of Kelaniya" },
    { label: "University of Ruhuna" },
    { label: "University of Jaffna" },
    { label: "University of Sabaragamuwa" },
    { label: "University of Wayamba" },
    { label: "University of Rajarata" },
    { label: "South Eastern University of Sri Lanka" },
    { label: "Eastern University, Sri Lanka" },
    { label: "Open University of Sri Lanka" },
    { label: "Uva Wellassa University" },
    { label: "General Sir John Kotelawala Defence University" },
    { label: "Sri Lanka Institute of Information Technology (SLIIT)" },
    { label: "National Institute of Business Management (NIBM)" },
    { label: "Sri Lanka Institute of Development Administration (SLIDA)" },
    { label: "Wayamba University of Sri Lanka" },
    { label: "Rajarata University of Sri Lanka" },
    { label: "Sabaragamuwa University of Sri Lanka" },
    { label: "Ruhuna University of Sri Lanka" },
    {
      label: "Sri Lanka Institute of Advanced Technological Education (SLIATE)",
    },
    { label: "University of Vocational Technology (UNIVOTEC)" },
    { label: "University of Sri Jayewardenepura, Faculty of Graduate Studies" },
  ];

  const mentors = [
    { label: "Peshala Liyanage" },
    { label: "Nishara Ramasinghe" },
    { label: "Banura Perera" },
    { label: "Afaz Deen" },
    { label: "Yasanka Jayawardane" },
    { label: "Kushan Hansika" },
    { label: "Kushan Rathnayaka " },
  ];

  const teams = [
    { label: "BUS" },
    { label: "Boligmappa" },
    { label: "Hex" },
    { label: "Compello" },
    { label: "Devgrade" },
    { label: "Hatteland" },
    { label: "Super Office" },
    { label: "Visolit" },
    { label: "Carcare" },
    { label: "Unimicro" },
    { label: "Superglu" },
    { label: "Parkly" },
    { label: "Whatif" },
    { label: "Chat GPT" },
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
        <Box sx={{ margin: "60px", marginTop: "30px" }}>
          <Typography variant="h6" gutterBottom>
            Personal Information:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="firstname"
                label="First Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="lastname"
                label="Last Name"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                id="university"
                options={universities}
                sx={{ width: "100%" }}
                onInputChange={handleUniversity}
                renderInput={(params) => (
                  <TextField {...params} label="University" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="gpa"
                label="GPA"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="accomplishments"
                label="Accomplishments"
                multiline
                fullWidth
                maxRows={5}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "18px" }}>
            <Typography variant="h6" gutterBottom>
              Project Details:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  disablePortal
                  id="mentor"
                  options={mentors}
                  sx={{ width: "100%" }}
                  onInputChange={handleMentor}
                  renderInput={(params) => (
                    <TextField {...params} label="Mentor" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  disablePortal
                  id="team"
                  options={teams}
                  sx={{ width: "100%" }}
                  onInputChange={handleMentor}
                  renderInput={(params) => (
                    <TextField {...params} label="Team" />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ marginTop: "18px" }}>
              <Typography variant="h6" gutterBottom>
                Evolution Information:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="interview_score"
                    label="Interview Score I"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                    id="evalution1_feedback1"
                    label={`Evolution  Feedback II`}
                    variant="outlined"
                    value={evaluation1Feedback}
                    multiline
                    onChange={handleEvalution1FeedbackChange}
                    fullWidth
                    
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="Evolution1_score"
                    label={`Evolution Score II`}
                    variant="outlined"
                    value={evaluation1Score}
                    onChange={handleEvalution1ScoreChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="evalution1_feedback"
                    label={`Evolution  Feedback II`}
                    variant="outlined"
                    value={evaluation2Feedback}
                    multiline
                    onChange={handleEvalution2FeedbackChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
