import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

function ConfirmationDialogRaw(props) {
  const [interns, setInterns] = React.useState([]);
  React.useEffect(() => {
    axios.get("http://localhost:5000/api/users?user=intern").then((response) => {
      const interns = response.data.map((intern) => {
        return {
          id: intern.id,
          name: intern.first_name + " " + intern.last_name,
        };
      });

      setInterns(interns);
    });
  }, []);
  console.log(interns);

  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOk = () => {
    onClose(value);
  };

  React.useEffect(() => {
    console.log(value);
    props.handleId(value);
  }, [value]);

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "80%",
          maxHeight: 435,
        },
        zIndex: 1500,
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Interns</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {interns.map((intern) => (
            <FormControlLabel
              value={intern.id}
              key={intern.id}
              control={<Radio />}
              label={intern.name}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function SelectInternDialog({
  open,
  setOpen,
  handleId
}) {
  const [value, setValue] = React.useState("");

  const handleClose = (newValue) => {
    setOpen(false);
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ConfirmationDialogRaw
        id="intern-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        handleId={handleId}
      />
    </Box>
  );
}
