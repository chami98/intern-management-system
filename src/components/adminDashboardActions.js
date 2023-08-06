import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import {
  PersonAdd,
  Mail,
  Settings,
  PostAdd,
  ListAlt,
  AssignmentInd,
} from "@mui/icons-material";
import CreateUserAccountDialog from "./createUserAccountDialog";

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              onClick={handleClickOpen}
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
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
              startIcon={<Mail style={iconStyle} />}
            >
              Invite New Users
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
              startIcon={<Settings style={iconStyle} />}
            >
              Upgrade/Downgrade Permission Levels
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
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
              startIcon={<ListAlt style={iconStyle} />}
            >
              Define Evaluation Criteria
            </Button>
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ ...buttonStyle, gridColumn: "span 2" }}
              startIcon={<AssignmentInd style={iconStyle} />}
            >
              Assign Evaluators and Mentors
            </Button>
          </Grid>
        </Grid>
      </Container>

      <CreateUserAccountDialog title={"Create User Account"} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>
    </>
  );
};

export default AdminDashboardActions;
