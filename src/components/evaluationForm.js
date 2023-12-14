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
  Backdrop,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EvaluationForm({
  title,
  open,
  handleClickOpen,
  handleClose: parentHandleClose,
  id,
}) {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSend = async () => {
    if (!formData.name || !formData.email) {
      // If either name or email is empty, show an error message
      toast.error("Please enter both name and email before saving.");
      return;
    }
    setLoading(true);
    try {
      // Send a POST request with the form data
      await axios.post("http://localhost:5000/api/invite", formData);

      // Handle success, e.g., show a success message
      window.location.reload();
      toast.success("Invitation sent successfully!");
    } catch (error) {
      // Handle errors, e.g., show an error message
      toast.error("Error sending invitation. Please try again.");
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // prevent the default behavior of the Enter key
      handleSend();
    }
  };

  const handleClose = () => {
    parentHandleClose();
  };

  const theme = useTheme();

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
            <Button autoFocus color="inherit" onClick={handleSend}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ margin: "60px", marginTop: "30px" }}>
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "10px", fontSize: "17px" }}
          >
            Technical Competence:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="coding_skills"
                options={[
                  "Insufficient",
                  "Basic",
                  "Proficient",
                  "Advanced",
                  "Expert",
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Coding Skills"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="problem_solving"
                options={[
                  "Needs Improvement",
                  "Satisfactory",
                  "Good",
                  "Excellent",
                ]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Problem Solving"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                id="algorithmic_understanding:"
                options={["Limited", "Adequate", "Strong", "Exceptional"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Algorithmic Understanding:"
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ marginTop: "18px" }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "10px", fontSize: "17px" }}
            >
              Project Contribution:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="meeting_deadlines"
                  options={[
                    "Often Delays",
                    "Occasionally Delays",
                    "Meets Expectations",
                    "Often Exceeds Expectations",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Meeting Deadlines"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="quality_of_code"
                  options={[
                    "Below Average",
                    "Average",
                    "Above Average",
                    "Outstanding",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quality of Code"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="innovative_solutions"
                  options={[
                    "Rarely",
                    "Occasionally",
                    "Frequently",
                    "Consistently",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Innovative Solutions"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "18px" }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "10px", fontSize: "17px" }}
            >
              Communication and Collaboration:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="team_ollaboration:"
                  options={[
                    "Limited Contribution",
                    "Collaborates Effectively",
                    "Actively Participates",
                    "Strong Collaborator",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Team Collaboration"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="documentation_skills"
                  options={[
                    "Needs Improvement",
                    "Satisfactory",
                    "Good",
                    "Excellent",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Documentation Skills"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="communication_clarity"
                  options={["Unclear", "Adequate", "Clear", "Very Clear"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Communication Clarity"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ marginTop: "18px" }}>
            <Typography
              variant="h6"
              gutterBottom
              style={{ marginBottom: "10px", fontSize: "17px" }}
            >
              Learning and Adaptability:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="quick_grasping:"
                  options={[
                    "Slow Learner",
                    "Average Learner",
                    "Fast Learner",
                    "Exceptional Learner",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Quick Grasping"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  id="adaptability_to_changes"
                  options={[
                    "Resistant",
                    "Acceptable",
                    "Highly Adaptable",
                    "Embraces Change",
                  ]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Adaptability to Changes"
                      onChange={handleChange}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* Loading animation */}
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </div>
  );
}
