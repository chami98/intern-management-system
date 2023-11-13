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
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CreateUserAccountDialog from "./createUserAccountDialog";
import CreateInternProfile from "./createInternProfile";
import axios from "axios";
import UpdateInternProfileStatusAccountDialog from "./updateInternProfileStatus";

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
  const [updateInternProfileStatusOpen, setUpdateInternProfileStatusOpen] = React.useState(false);

  const handleUserAccountClickOpen = () => {
    setUserAccountOpen(true);
  };

  const handleUserAccountClose = () => {
    setUserAccountOpen(false);
  };

  const handleUpdateInternProfileStatusClickOpen = () => {
    setUpdateInternProfileStatusOpen(true);
  };

  const handleUpdateInternProfileStatusClose = () => {
    setUpdateInternProfileStatusOpen(false);
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
              onClick={handleUpdateInternProfileStatusClickOpen}
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
              startIcon={<AutorenewIcon style={iconStyle} />}
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
              Manage User Roles
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
      <UpdateInternProfileStatusAccountDialog
        title={"Update Intern Profile Status"}
        handleClickOpen={handleUpdateInternProfileStatusClickOpen}
        handleClose={handleUpdateInternProfileStatusClose}
        open={updateInternProfileStatusOpen}
      />
    </>
  );
};

export default AdminDashboardActions;
