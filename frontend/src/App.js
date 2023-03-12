import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Backdrop,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AllData from "./components/AllData";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile, getAll } from "./redux/userSlice";

function App() {
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState();
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { isSuccess, isError, message, isLoading } = useSelector(
    (state) => state.user
  );

  const dataChanged = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("username", name);
    formData.set("uploadFile", uploadedFile);

    dispatch(uploadFile(formData));

    fileRef.current.value = null;
    setName("");
    setUploadedFile("");
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if (isSuccess) {
      toast.success("ADDED!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [isError, message, isSuccess]);

  if (isLoading) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <Stack gap={1} justifyContent="center" alignItems="center">
            <CircularProgress color="inherit" />
            <Typography>Loading...</Typography>
          </Stack>
        </Backdrop>
      </div>
    );
  }
  return (
    <>
      <Container sx={{ border: "1px solid black", padding: 2 }}>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Grid
            container
            spacing={2}
            p={2}
            direction={"column"}
            display={"flex"}
            align="center"
            justifyContent={"center"}
          >
            <Grid item>
              <TextField
                label="Enter your name"
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <input
                type="file"
                name="uploadFile"
                ref={fileRef}
                onChange={dataChanged}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <AllData />
      </Container>
      <ToastContainer />
    </>
  );
}

export default App;
