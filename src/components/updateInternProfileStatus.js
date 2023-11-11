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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
  Backdrop,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function createData(name, university, GPA, accomplishments, protein) {
  return { name, university, GPA, accomplishments, protein };
}

const data = [
  { name: "Frozen yoghurt", university: 159, GPA: 6.0, accomplishments: 24, protein: 4.0 },
  { name: "Ice cream sandwich", university: 237, GPA: 9.0, accomplishments: 37, protein: 4.3 },
  { name: "Eclair", university: 262, GPA: 16.0, accomplishments: 24, protein: 6.0 },
  { name: "Cupcake", university: 305, GPA: 3.7, accomplishments: 67, protein: 4.3 },
  { name: "Gingerbread", university: 356, GPA: 16.0, accomplishments: 49, protein: 3.9 },
];

const rows = data.map(item => createData(item.name, item.university, item.GPA, item.accomplishments, item.protein));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateUserAccountDialog({
  title,
  open,
  handleClickOpen,
  handleClose: parentHandleClose,
}) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSave = () => {
    console.log("Selected Status:", selectedStatus);
    handleClose();
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
            <Button autoFocus color="inherit" onClick={handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ margin: "60px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">University</TableCell>
                  <TableCell align="right">GPA</TableCell>
                  <TableCell align="right">Accomplishments</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.university}</TableCell>
                    <TableCell align="right">{row.GPA}</TableCell>
                    <TableCell align="right">{row.accomplishments}</TableCell>
                    <TableCell align="right">
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id={`status-label-${row.name}`}>
                          Status
                        </InputLabel>
                        <Select
                          labelId={`status-label-${row.name}`}
                          id={`status-${row.name}`}
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          label="Status"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Approved">Approved</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
