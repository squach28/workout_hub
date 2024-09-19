import { Box, Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Navbar from "../components/Navbar";
import joggingImg from "../assets/images/people_jogging.svg";
import talkingImg from "../assets/images/people_talking.svg";
import workoutImg from "../assets/images/person_squat.svg";

const Landing = () => {
  const cardContent = [
    {
      title: "Share your workouts",
      description: "Give others insight on your workouts",
      imageUrl: talkingImg,
    },
    {
      title: "Find workouts",
      description: "Get inspiration from other peoples' plans",
      imageUrl: workoutImg,
    },
    {
      title: "Build a community",
      description: "Find others and build relationships",
      imageUrl: joggingImg,
    },
  ];
  return (
    <Box>
      <Navbar />
      <Typography textAlign="center" variant="h4" sx={{ mt: 3 }}>
        Discover and share your workouts with others
      </Typography>
      <Grid
        container
        spacing={{ xs: 4, sm: 6 }}
        sx={{
          my: 4,
          p: { sm: 1, md: 3 },
          flexDirection: { sm: "column", md: "row" },
        }}
      >
        {cardContent.map((content) => (
          <Grid size={{ xs: 11, sm: 7, md: 4, lg: 4 }} sx={{ mx: "auto" }}>
            <Card
              sx={{
                flexGrow: 1,
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyItems: "center",
                }}
              >
                <Typography variant="h5" sx={{ textAlign: "center" }}>
                  {content.title}
                </Typography>
                <img
                  width={200}
                  height={200}
                  src={content.imageUrl}
                  alt="a guy and a girl running in the park"
                />
                <Typography variant="body1">{content.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Landing;
