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
import EvaluationForms from "./evaluationForms";
import ViewInternProfiles from "./viewInternProfiles";

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
  const [viewInternProfilesOpen, setViewInternProfilesOpen] =
    React.useState(false);
  const [evaluationFormsOpen, setEvaluationFormsOpen] = React.useState(false);

  const handleEvaluationFormOpen = () => {
    setEvaluationFormsOpen(true);
  };

  const handleEvaluationFormClose = () => {
    setEvaluationFormsOpen(false);
  };

  const handleViewInternProfilesOpen = () => {
    setViewInternProfilesOpen(true);
  };

  const handleViewInternProfilesClose = () => {
    setViewInternProfilesOpen(false);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom>
          Mentor Dashboard
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} sm={6}>
            <Button
              onClick={handleEvaluationFormOpen}
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
              onClick={handleViewInternProfilesOpen}
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

      <EvaluationForms
        title={"Evaluation Forms"}
        handleClickOpen={handleEvaluationFormOpen}
        handleClose={handleEvaluationFormClose}
        open={evaluationFormsOpen}
      />

      <ViewInternProfiles
        title={"Intern Profiles"}
        handleClickOpen={handleViewInternProfilesOpen}
        handleClose={handleViewInternProfilesClose}
        open={viewInternProfilesOpen}
      />
    </>
  );
}

export default MentorDashboard;
