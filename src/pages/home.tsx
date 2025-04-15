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
  Skeleton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { useJornals } from "@/hooks/journals";
import Icon from "@/assets/img/logo_visao.png";
import { Link, useNavigate } from "@tanstack/react-router";
import { convertToBrazilianDateWithHours } from "@/utils/data";

export const Home = () => {
  const { jornalData, isLoading } = useJornals();
  const [bannerNews, setBannerNews] = useState<any>({});

  const autores = [
    "Ludmilla",
    "João Caetano",
    "Daniella Ribeiro",
    "Hugo",
  ];

  const devs = ["Walter Moura", "Alison"];

  const navigate = useNavigate();

  useEffect(() => {
    if (jornalData?.success) {
      const tempList = [...jornalData.data.data];
      setBannerNews(tempList.shift());
    }
  }, [jornalData]);

  return (
    <Box sx={{ bgcolor: "#f3f4f6", minHeight: "100%", width: "100%" }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1} sx={{ backgroundColor: "#282828" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "80px",
          }}
        >
          {/* Lado esquerdo */}
          <Box>
      <IconButton edge="start" color="inherit" onClick={() => console.log("Abrir menu")}>
        <MenuIcon sx={{ color: "#fff" }} />
      </IconButton>
    </Box>

          {/* Centro - Logo */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <img
              src={Icon}
              alt="Logo"
              onClick={() => navigate({ to: "/" })}
              style={{
                width: 150,
                cursor: "pointer",
              }}
            />
          </Box>

          {/* Lado direito */}
          <Box>
            <IconButton edge="end" color="inherit" onClick={() => console.log("Notificação")}>
              <NotificationsIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content - Banner */}
      <Box sx={{ p: 2 }}>
        {isLoading || !bannerNews?.title ? (
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton width="60%" />
              <Skeleton width="80%" />
              <Skeleton width="40%" />
            </CardContent>
          </Card>
        ) : (
          <Card sx={{
            maxWidth: "800px",  // Limita a largura do banner
            margin: "0 auto",   // Centraliza o banner na tela
            borderRadius: "2px", // (opcional) se você quiser arredondar as bordas
          }}>
            <Link
              style={{ cursor: "pointer", color: "#000" }}
              to={`/news/${bannerNews?.documentId}`}
            >

              
              <CardMedia
                component="img"
                height="200"
                image={bannerNews?.cover?.url}
                alt="news"
              />
            </Link>
            <CardContent>
            <CardContent>
  <Link
    style={{ cursor: "pointer", color: "#000" }}
    to={`/news/${bannerNews?.documentId}`}
  >
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Lado esquerdo - Título e Data */}
      <Box>
        <Typography variant="caption" color="textSecondary">
          {convertToBrazilianDateWithHours(bannerNews?.publishedAt)}
        </Typography>
        <Typography variant="h6">{bannerNews?.title}</Typography>
      </Box>

      {/* Lado direito - Texto */}
      <Box sx={{ maxWidth: "60%", paddingLeft: 2 }}>
        <Typography variant="body2" color="textSecondary">
          {bannerNews?.description}
        </Typography>
      </Box>
    </Box>
  </Link>
</CardContent>

            </CardContent>
          </Card>
        )}
      </Box>

      {/* Espaço entre o Banner e as Últimas Notícias */}

      <Box
  sx={{
    height: "400px",
    backgroundColor: "#282828",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    gap: 4,
  }}
>
  {/* Imagem à esquerda */}
  <Box sx={{ flex: 1, maxWidth: 400 }}>
    <img
      src={bannerNews?.cover?.url}
      alt="Notícia"
      style={{
        width: "100%",
        height: "auto",
        objectFit: "cover",
      }}
    />
  </Box>

  {/* Conteúdo à direita - com link */}
  <Link
    to={`/news/${bannerNews?.documentId}`}
    style={{ flex: 2, textDecoration: "none", color: "inherit" }}
  >
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#fff",
        paddingY: 2,
      }}
    >
      {/* Título e texto */}
      <Box>
        <Typography
          variant="h5"
          fontSize="18px"
          fontWeight="bold"
          gutterBottom
          sx={{ textAlign: "left", marginBottom: "50px"}}
        >
          {bannerNews?.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            maxWidth: "90%",
            marginX: "auto",
          }}
        >
          {bannerNews?.description}
        </Typography>
      </Box>

      {/* Data */}
      <Box sx={{ alignSelf: "flex-end", marginTop: 20, }}>
        <Typography variant="caption" color="gray">
          {convertToBrazilianDateWithHours(bannerNews?.publishedAt)}
        </Typography>
      </Box>
    </Box>
  </Link>
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
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} sx={{ display: "flex", paddingBottom: 0 }}>
                  <Skeleton variant="rectangular" width={300} height={200} />
                  <CardContent sx={{ flex: 1 }}>
                    <Skeleton width="30%" />
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                    <Skeleton width="50%" />
                  </CardContent>
                </Card>
              ))
            : jornalData?.data.data.map((item: any) => (
                <Card key={item.id} sx={{ display: "flex", paddingBottom: 0 }}>
                  <Link
                    style={{ cursor: "pointer", color: "#000" }}
                    to={`/news/${item?.documentId}`}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: "300px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      image={item?.cover?.url}
                      alt="news"
                    />
                  </Link>
                  <CardContent>
                    {item?.categories.map((category: any, index: number) => (
                      <Typography
                        key={index}
                        variant="caption"
                        color="var(--pink)"
                        fontWeight="bold"
                        style={{ marginRight: "0.2rem" }}
                      >
                        {index === item.categories.length - 1
                          ? category.name
                          : `${category.name},`}
                      </Typography>
                    ))}

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

        {/* Responsáveis */}
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
                {[...autores, ...devs].map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem disablePadding>
                      <ListItemText
                        primary={
                          <>
                            <Typography component="span" color="primary">
                              {index < autores.length
                                ? "Autor"
                                : "Desenvolvedor"}
                            </Typography>{" "}
                            {item}
                          </>
                        }
                      />
                    </ListItem>
                    {index < autores.length + devs.length - 1 && <Divider />}
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
