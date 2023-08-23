import * as React from "react";
import Box from "@mui/material/Box";

import MiniDrawer from "./drawer";
import CustomAppBar from "./app-bar";
import DrawerHeader from "./drawer-header";

export default function Layout({ children, title }) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex",}}>
      <CustomAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        title={title}
      />
      <MiniDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
