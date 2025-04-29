import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  IconButton,
  Grid,
} from "@mui/material";
import { useJornals } from "@/hooks/journals";
import { Link } from "@tanstack/react-router";
import { convertToBrazilianDateWithHours } from "@/utils/data";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface NewsItem {
  id: string;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  cover?: {
    url: string;
  };
  categories?: {
    name: string;
  }[];
}

export const Home = () => {
  const { jornalData, loading } = useJornals();
  const destaqueNoticias = (jornalData?.data?.data || []) as NewsItem[];
  const outrasMiniaturas = destaqueNoticias.slice(5, 11);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const autores = [
    "Lyvia Martins",
    "João Vitor Teles",
    "Dáleth Aiello",
    "Kaely S.",
  ];
  const devs = ["João Pedro"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        destaqueNoticias.length > 0 ? (prev + 1) % destaqueNoticias.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [destaqueNoticias]);

  const goToNext = () => {
    setCarouselIndex((prev) =>
      destaqueNoticias.length > 0 ? (prev + 1) % destaqueNoticias.length : 0
    );
  };

  const goToPrevious = () => {
    setCarouselIndex((prev) =>
      destaqueNoticias.length > 0
        ? (prev - 1 + destaqueNoticias.length) % destaqueNoticias.length
        : 0
    );
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", color: "#000" }}>
      {/* Topbar */}
      <AppBar position="static" sx={{ backgroundColor: "#00529B" }}>
        <Toolbar variant="dense">
          <Typography variant="body2" sx={{ ml: 2 }}>
            Um site de notícias
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#fff",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#000",
            fontFamily: "serif",
            "& span": { color: "#0074D9" },
          }}
        >
          <span>O auto da</span> capital
        </Typography>

        <Box
          sx={{
            backgroundColor: "#2b2b2b",
            padding: "1rem",
            color: "#00aaff",
            minWidth: "300px",
          }}
        >
          <Typography variant="h6">O auto da capital</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#fff", fontWeight: "bold" }}
          >
            Anuncie aqui
          </Typography>
        </Box>
      </Box>

      {/* Menu */}
      <AppBar
        position="static"
        elevation={1}
        sx={{ backgroundColor: "#00529B" }}
      >
        <Toolbar variant="dense" sx={{ justifyContent: "left", gap: 4 }}>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>
            Home
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>
            Notícias
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>
            Sobre
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer" }}>
            Contato
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Carrossel e Miniaturas */}
      <Box sx={{ display: "flex", p: 2, gap: 2, height: 400 }}>
        {/* Carrossel */}
        <Box sx={{ flex: "1 1 65%", position: "relative" }}>
          {destaqueNoticias.length > 0 && (
            <Link
              to="/news/$id"
              params={{ id: destaqueNoticias[carouselIndex]?.documentId }}
              style={{ textDecoration: "none" }}
            >
              <img
                src={destaqueNoticias[carouselIndex]?.cover?.url}
                alt="Destaque"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  padding: "0.5rem",
                  borderRadius: "4px",
                }}
              >
                {destaqueNoticias[carouselIndex]?.title}
              </Typography>
            </Link>
          )}
          <IconButton
            onClick={goToPrevious}
            sx={{
              position: "absolute",
              top: "50%",
              left: "10px",
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton
            onClick={goToNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: "10px",
              color: "#fff",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        {/* Miniaturas Laterais */}
        <Box
          sx={{
            flex: "1 1 35%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: 1,
          }}
        >
          {destaqueNoticias.slice(1, 5).map((item, i) => (
            <Link
              key={item?.id || i}
              to="/news/$id"
              params={{ id: item?.documentId }}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  backgroundColor: "#000",
                }}
              >
                <img
                  src={item?.cover?.url}
                  alt="Miniatura"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    padding: "0.5rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                >
                  {item?.title?.length > 60
                    ? item.title.slice(0, 60) + "..."
                    : item.title}
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      {/* Lista de Notícias */}
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, padding: "1rem" }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Últimas notícias:
          </Typography>

          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} sx={{ display: "flex", mb: 2 }}>
                  <Skeleton variant="rectangular" width={300} height={200} />
                  <CardContent sx={{ flex: 1 }}>
                    <Skeleton width="30%" />
                    <Skeleton width="60%" />
                    <Skeleton width="80%" />
                    <Skeleton width="50%" />
                  </CardContent>
                </Card>
              ))
            : outrasMiniaturas.map((item) => (
                <Link
                  key={item?.id}
                  to="/news/$id"
                  params={{ id: item?.documentId }}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ display: "flex", mb: 2 }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 300, height: 200, objectFit: "cover" }}
                      image={item?.cover?.url || ""}
                      alt="news"
                    />
                    <CardContent>
                      {item?.categories?.map((cat, idx) => (
                        <Typography
                          key={idx}
                          variant="caption"
                          color="primary"
                          fontWeight="bold"
                          sx={{ mr: 0.5 }}
                        >
                          {cat.name}
                          {idx < (item?.categories?.length ?? 0) - 1 ? "," : ""}
                        </Typography>
                      ))}
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{ mt: 1 }}
                      >
                        {item?.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item?.description}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {convertToBrazilianDateWithHours(item?.createdAt)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </Box>

        {/* Responsáveis */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent sx={{ padding: "1rem" }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Responsáveis
                </Typography>
                <List dense>
                  {[...autores, ...devs].map((item, index) => (
                    <div key={index}>
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
                    </div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Rodapé */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "#00529B",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} O auto da capital. Todos os direitos
          reservados.
        </Typography>
      </Box>
    </Box>
  );
};
