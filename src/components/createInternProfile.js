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
import { Box, Grid, TextField, Autocomplete } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInternDialog from "./SelectInternDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateInternProfile({
  title,
  open,
  handleClickOpen,
  handleClose,
}) {
  const [university, setUniversity] = useState("");
  const [mentor, setMentor] = useState("");
  const [team, setTeam] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [mentors, setMentors] = React.useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadButtonLabel, setUploadButtonLabel] = useState("Select PDF");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadButtonLabel(file ? file.name : "Select PDF");
  };

  const handleFirstName = (newInputValue) => {
    setFirstName(newInputValue);
  };

  const handleLastName = (newInputValue) => {
    setLastName(newInputValue);
  };

  const handleId = (newInputValue) => {
    setId(newInputValue);
  };

  const [formData, setFormData] = React.useState({
    firstname: firstName,
    lastname: lastName,
    university: university,
    gpa: "",
    accomplishments: "",
    mentor_id: mentor,
    assigned_team: team,
    interview_score: "",
    interview_feedback:"",
    evaluation1_score: "",
    evaluation2_score: "",
    evaluation1_feedback: "",
    evaluation2_feedback: "",
    project_details:'',
    status:'',
    cv_url:'',
  });

  React.useEffect(() => {
    const fetchInternData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/interns/${id}`
        );
        const intern = response.data;
        handleFirstName(intern.first_name);
        handleLastName(intern.last_name);
      } catch (error) {
        console.error("Error fetching intern data:", error);
      }
    };
    fetchInternData();
  }, [id]);

  React.useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: id,
      firstname: firstName,
      lastname: lastName,
    }));
    console.log(id);
  }, [firstName]);
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleUniversity = (event, newInputValue) => {
    setUniversity(newInputValue);
  };

  const handleMentor = (event, newInputValue) => {
    setMentor(newInputValue.id);
    console.log(mentor);
  };

  const handleTeam = (event, newInputValue) => {
    setTeam(newInputValue);
    console.log(team);
  };

  const handleSave = () => {
    const formDataToSend = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      university: university,
      gpa: formData.gpa,
      accomplishments: formData.accomplishments,
      mentor_id: mentor,
      assigned_team: team,
      interview_score:22,
      interview_feedback:'',
      evaluation1_score: parseFloat(formData.interview_1_score),
      evaluation2_score: parseFloat(formData.interview_2_score),
      evaluation1_feedback: formData.evaluation_1_feedback,
      evaluation2_feedback: formData.evaluation_2_feedback,
      cv_url: '', 
      project_details:'',
      status:'',
    };

    axios
      .post(`http://localhost:5000/api/interns/${id}`, formDataToSend)
      .then((response) => {
        console.log("Response from the server:", response.data);

        toast.success("Intern account created successfully!", {
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

    console.log("Form data to be sent:", formDataToSend);
  };

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

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/users?user=mentor")
      .then((response) => {
        const mentors = response.data.map((mentor) => {
          return {
            label: mentor.first_name + " " + mentor.last_name,
            id: mentor.id,
          };
        });
        setMentors(mentors);
      });
  }, []);
  console.log(mentors);

  const teams = [
    { label: "BUS" },
    { label: "Boligmappa" },
    { label: "Hex" },
    { label: "Facilit" },
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
    { label: "Youtello" },

  ];

  const [openSelectIntern, setOpenSelectIntern] = React.useState(false);

  const handleClickListItem = () => {
    setOpenSelectIntern(true);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", response.data.fileUrl);
        // You can handle the response as needed, such as storing the file URL.
      } catch (error) {
        console.error("Error uploading file:", error);
        // Handle the error, e.g., display an error message.
      }
    }
  };

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
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickListItem}
            sx={{ mb: 2 }}
          >
            Select An Intern
          </Button>
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
                value={firstName}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="lastname"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                InputProps={{
                  readOnly: true,
                }}
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
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <input
                accept="application/pdf"
                type="file"
                id="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file">
                <Button variant="outlined" color="primary" component="span">
                {uploadButtonLabel}
                </Button>
              </label>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleFileUpload}
              >
                Upload File
              </Button>
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
                  getOptionLabel={(option) => option.label} // Set the label for display
                  sx={{ width: "100%" }}
                  onChange={handleMentor}
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
                  onInputChange={handleTeam}
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
                    id="interview_1_score"
                    label="Interview Score I"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="evaluation_1_feedback"
                    label={`Evolution  Feedback I`}
                    variant="outlined"
                    multiline
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="interview_2_score"
                    label={`Evolution Score II`}
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="evaluation_2_feedback"
                    label={`Evolution  Feedback II`}
                    variant="outlined"
                    multiline
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Dialog>
      <SelectInternDialog
        open={openSelectIntern}
        setOpen={setOpenSelectIntern}
        handleId={handleId}
      />
    </div>
  );
}
