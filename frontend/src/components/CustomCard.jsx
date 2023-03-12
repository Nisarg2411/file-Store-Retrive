import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CustomCard = ({ name, path }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`uploadFolder/${path}`}
        title="green iguaa"
      />

      {/* <iframe src={`http://localhost:4000/uploadFolder/${path}`}></iframe> */}

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
