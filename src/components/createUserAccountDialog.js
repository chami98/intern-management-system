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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUserAccountDialog({
  title,
  open,
  handleClickOpen,
  handleClose,
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    role: null,
    password: "",
  });
  const [role, setRole] = useState("");
  const [emailError, setEmailError] = useState("");

  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Log the input value when it changes
  const handleRoleChange = (event, newInputValue) => {
    setRole(newInputValue);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    if (id === "email") {
      // Check email validation when handling email input
      if (!emailRegex.test(value)) {
        setFormData((prevFormData) => ({
              ...prevFormData,
              [id]: value,
              role: role,
            }));
        setEmailError("Please enter a valid email address");
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [id]: value,
          role: role,
        }));
        setEmailError("");
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
        role: role,
      }));
    }
  };

  const handleSave = () => {
    axios
      .post("http://localhost:5000/api/register", formData)
      .then((response) => {
        console.log("Response from the server:", response.data);
        // Close the dialog after saving
        handleClose();
      })
      .catch((error) => {
        console.error("Error occurred during the request:", error);
      });

    console.log("Form data to be sent:", formData);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();

  const roles = [
    { label: "Intern" },
    { label: "Evaluator" },
    { label: "Admin" },
    { label: "Mentor" },
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
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              onChange={handleChange}
              error={!!emailError}
              helperText={emailError}
            />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                disablePortal
                id="role"
                options={roles}
                sx={{ width: "100%" }}
                onInputChange={handleRoleChange}
                renderInput={(params) => <TextField {...params} label="Role" />}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}
