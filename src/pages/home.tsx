import React, { useEffect, useState } from "react";
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
import Icon from "@/assets/img/icon.png";
import { Link, useNavigate } from "@tanstack/react-router";
import { convertToBrazilianDateWithHours } from "@/utils/data";

export const Home = () => {
  const { jornalData } = useJornals();
  const [bannerNews, setBannerNews] = useState(
    {} as {
      title: string;
      createdAt: string;
      content: [{}];
      description: string;
      documentId: string;
      id: number;
      publishedAt: string;
      updatedAt: string;
    }
  );

  const autores = [
    "Ingrid Thauane Santos Oliveira",
    "Isabela de Moura Costa",
    "Matheus Borges Ribeiro",
    "Raquel Soares Miguel de Azevedo",
  ];

  const devs = [
    "Artur Dantas Martins",
    "Paulo Abdiel Sardinha de Sousa Santos",
  ];

  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_PUBLIC_HOST;

  useEffect(() => {
    if (jornalData?.success) {
      const tempList = [...jornalData.data.data];
      setBannerNews(tempList.shift());
    }
  }, [jornalData]);

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100%", width: "100%" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography style={{ display: "flex" }} variant="h6" component="div">
            <img
              onClick={() => navigate({ to: "/" })}
              style={{ width: "30px", marginRight: "20px", cursor: "pointer" }}
              src={Icon}
              alt=""
            />
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
          <Link
            style={{ cursor: "pointer", color: "#000" }}
            to={`/news/${bannerNews?.documentId}`}
          >
            <CardMedia
              component="img"
              height="200"
              image={baseURL + bannerNews?.cover?.url}
              alt="news"
            />
          </Link>
          <CardContent>
            <Link
              style={{ cursor: "pointer", color: "#000" }}
              to={`/news/${bannerNews?.documentId}`}
            >
              <Typography variant="caption" color="textSecondary">
                {convertToBrazilianDateWithHours(bannerNews?.publishedAt)}
              </Typography>
              <Typography variant="h6">{bannerNews?.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {bannerNews?.description}
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>

      {/* News Grid */}
      <section style={{ display: "flex" }}>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",
            width: "100%",
          }}
        >
          <h1>Últimas notícias:</h1>
          {jornalData?.data.data.map((item: any) => (
            <Card key={item.id} sx={{ display: "flex", paddingBottom: 0 }}>
              <Link
                style={{ cursor: "pointer", color: "#000" }}
                to={`/news/${item?.documentId}`}
              >
                <CardMedia
                  component="img"
                  sx={{ width: "300px", height: "200px", objectFit: "cover" }}
                  image={baseURL + item?.cover?.url}
                  alt="news"
                />
              </Link>
              <CardContent>
                  <Typography
                    variant="caption"
                    color="var(--pink)"
                    fontWeight="bold"
                  >
                    {item.slug}
                  </Typography>
                <Link
                  style={{ cursor: "pointer", color: "#000" }}
                  to={`/news/${item?.documentId}`}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {convertToBrazilianDateWithHours(item.createdAt)}
                  </Typography>
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        <Grid sx={{ padding: "1rem" }} item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="var(--pink)"
              >
                Responsáveis
              </Typography>
              <List dense>
                {autores.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <>
                            <Typography component="span" color="primary">
                              Autor
                            </Typography>{" "}
                            {item}
                          </>
                        }
                      />
                    </ListItem>
                    {item.length < 2 && <Divider />}
                  </React.Fragment>
                ))}
                {devs.map((item) => (
                  <React.Fragment key={item.id}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <>
                            <Typography component="span" color="primary">
                              Desenvolvedor
                            </Typography>{" "}
                            {item}
                          </>
                        }
                      />
                    </ListItem>
                    {item.id < 2 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </section>
    </Box>
  );
};
