import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomCard from "./CustomCard";

const AllData = () => {
  const { fetchedUser } = useSelector((state) => state.user);

  return (
    <Box mt={2}>
      {fetchedUser.length ? (
        <>
          <Typography variant="h5" m={2}>
            YOUR IMAGES ARE HERE
          </Typography>
          <Grid container spacing={2} mt={2}>
            {fetchedUser.map((user) => (
              <Grid item lg={4} md={6} sm={6} xs={12} key={user._id}>
                <CustomCard name={user.name} path={user.fileName} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <p>EMPTY</p>
      )}
    </Box>
  );
};

export default AllData;
