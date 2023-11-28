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
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CreateUserAccountDialog from "./createUserAccountDialog";
import CreateInternProfile from "./createInternProfile";
import axios from "axios";
import UpdateInternProfileStatusAccountDialog from "./updateInternProfileStatus";
import ManageUserRoles from "./manageUserRoles";
import InviteNewUsers from "./inviteNewUsers";

const buttonStyle = {
  display: "flex",
  width: "240px",
  height: "180px",
  borderRadius: "16px",
};

const iconStyle = {
  fontSize: "4.2rem",
};

function MentorDashboard() {
    const [userAccountOpen, setUserAccountOpen] = React.useState(false);
  const [internAccountOpen, setInternAccountOpen] = React.useState(false);
  const [updateInternProfileStatusOpen, setUpdateInternProfileStatusOpen] =
    React.useState(false);
  const [manageUserRolesOpen, setManageUserRolesOpen] = React.useState(false);
  const [inviteNewUsersOpen, setInviteNewUsersOpen] = React.useState(false);

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

  const handleManageUserRolesClickOpen = () => {
    setManageUserRolesOpen(true);
  };

  const handleManageUserRolesClose = () => {
    setManageUserRolesOpen(false);
  };

  const handleInviteNewUsersClickOpen = () => {
    setInviteNewUsersOpen(true);
  }

  const handleInviteNewUsersClose = () => {
    setInviteNewUsersOpen(false);
  }
    return (
        <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom>
          Mentor Dashboard
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} sm={6}>
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
                startIcon={<PostAdd style={iconStyle} />}
            >
              Evaluation Forms
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sm={6}>
            <Button
              onClick={handleManageUserRolesClickOpen}
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
              View Intern Profiles
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
}

export default MentorDashboard;
