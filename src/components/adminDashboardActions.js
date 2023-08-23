import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import {
  PersonAdd,
  Mail,
  Settings,
  PostAdd,
  ListAlt,
  AssignmentInd,
  AccountCircle,
  School,
  ManageAccounts,
} from "@mui/icons-material";
import CreateUserAccountDialog from "./createUserAccountDialog";
import CreateInternProfile from "./createInternProfile";
import axios from "axios";

const buttonStyle = {
  display: "flex",
  width: "240px",
  height: "180px",
  borderRadius: "16px",
};

const iconStyle = {
  fontSize: "4.2rem",
};

const AdminDashboardActions = () => {
  const [userAccountOpen, setUserAccountOpen] = React.useState(false);
  const [internAccountOpen, setInternAccountOpen] = React.useState(false);

  const handleUserAccountClickOpen = () => {
    setUserAccountOpen(true);
  };

  const handleUserAccountClose = () => {
    setUserAccountOpen(false);
  };

  const handleInternAccountClickOpen = () => {
    setInternAccountOpen(true);
  };

  const handleInternAccountClose = () => {
    setInternAccountOpen(false);
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" gutterBottom>
          Admin Dashboard
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              onClick={handleUserAccountClickOpen}
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              sx={{
                ...buttonStyle,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              startIcon={<PersonAdd style={iconStyle} />}
            >
              Create User Account
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              sx={{
                ...buttonStyle,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              startIcon={<Mail style={iconStyle} />}
            >
              Invite New Users
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              onClick={handleInternAccountClickOpen}
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              sx={{
                ...buttonStyle,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              startIcon={<School style={iconStyle} />}
            >
              Create an intern profile
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              sx={{
                ...buttonStyle,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              startIcon={<PostAdd style={iconStyle} />}
            >
              Create Evaluation Form
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              sx={{
                ...buttonStyle,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              startIcon={<ManageAccounts style={iconStyle} />}
            >
              Update intern profile status
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ ...buttonStyle, gridColumn: "span 2" }}
              sx={{
                ...buttonStyle,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                },
              }}
              startIcon={<AssignmentInd style={iconStyle} />}
            >
              Assign Evaluators and Mentors
            </Button>
          </Grid>
        </Grid>
      </Container>

      <CreateInternProfile
        title={"Create Intern Profile"}
        handleClickOpen={handleInternAccountClickOpen}
        handleClose={handleInternAccountClose}
        open={internAccountOpen}
      />
      <CreateUserAccountDialog
        title={"Create User Account"}
        handleClickOpen={handleUserAccountClickOpen}
        handleClose={handleUserAccountClose}
        open={userAccountOpen}
      />
    </>
  );
};

export default AdminDashboardActions;
