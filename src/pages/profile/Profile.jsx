import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ResponsiveAppBar from "../../component/navbar/MenuAppBar";
import homeImg from "../../assets/imges/home1.png";
import { Avatar, CircularProgress } from "@mui/material";
import AxiosIntanse from "../../AxiosIntanse";

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const getProfile = async () => {
    try {
      const response = await AxiosIntanse.get("/Users/profile");
      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  const DrawerList = (
    <Box sx={{ width: 280, p: 2, color: "#333" }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
         My Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {isLoading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />
      ) : userData ? (
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "primary.main",
              mx: "auto",
              mb: 2,
            }}
          >
            {userData.firstName?.[0] || "U"}
          </Avatar>
          <Typography variant="h6">
            {userData.firstName} {userData.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Username: {userData.userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {userData.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {userData.role}
          </Typography>
        </Box>
      ) : (
        <Typography color="error">Failed to load user data.</Typography>
      )}
    </Box>
  );

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          backgroundImage: `url(${homeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100%",
          color: "#fff",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            onClick={toggleDrawer(true)}
            sx={{ backgroundColor: "#000" }}
          >
            Open Profile
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
