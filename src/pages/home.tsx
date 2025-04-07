import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useJornals } from "@/hooks/journals";

export const Home = () => {
  const { jornalData } = useJornals();

  useEffect(() => {
    if (jornalData?.success) {
      console.log(jornalData);
    }
  }, [jornalData]);

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100vh", width: "100vw" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            NINGUÉM PERGUNTOU
          </Typography>
          <IconButton edge="end" color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Section Title */}
      <Box
        sx={{
          bgcolor: "var(--pink)",
          color: "white",
          px: 2,
          py: 1,
          fontWeight: "bold",
        }}
      >
        Distrito Federal
      </Box>

      {/* Main Content - Carousel substitute */}
      <Box sx={{ p: 2 }}>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image="/news1.jpg"
            alt="news"
          />
          <CardContent>
            <Typography variant="caption" color="textSecondary">
              02:26:52 AM
            </Typography>
            <Typography variant="h6">Lorem ipsum dolor sit amet</Typography>
            <Typography variant="body2" color="textSecondary">
              In laoreet semper odio ut mollis. Suspendisse laoreet ultricies
              ligula non eleifend.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* News Grid */}
      <Grid container spacing={2} sx={{ px: 2, pb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ display: "flex" }}>
            <CardMedia
              component="img"
              sx={{ width: 128, height: 128, objectFit: "cover" }}
              image="/news2.jpg"
              alt="news"
            />
            <CardContent>
              <Typography
                variant="caption"
                color="var(--pink)"
                fontWeight="bold"
              >
                Esfoça
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography variant="body2" color="textSecondary">
                In laoreet semper odio ut mollis. Suspendisse laoreet ultricies
                ligula non eleifend.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="var(--pink)"
              >
                Novidades
              </Typography>
              <List dense>
                {[1, 2, 3].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <>
                            <Typography component="span" color="primary">
                              Autor
                            </Typography>{" "}
                            - In malesuada est non elit varius.
                          </>
                        }
                      />
                    </ListItem>
                    {idx < 2 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
