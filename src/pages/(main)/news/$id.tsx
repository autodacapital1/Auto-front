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

import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useParams } from "@tanstack/react-router";
import { useNews } from "@/hooks/newsByID";
import { set } from "zod";

export const NewsById = () => {
    // Conteúdo simulado vindo do CMS
    const { id } = useParams({ strict: false });
    const { newsData, loading, error } = useNews(id);
    const [mockContent, setMockContent] = React.useState<BlocksContent>([]);
    const [newsTitle, setNewsTitle] = React.useState<string>("");
    const [newsDescription, setNewsDescription] = React.useState<string>("");
    const [newsCreatedAt, setNewsCreatedAt] = React.useState<string>("");

    useEffect(() => {
    if (newsData) {
        const {data} = newsData;
        console.log("Data:", data); // Verifique se os dados estão corretos
        setMockContent(data.data.content); // Acessando os atributos corretamente
        setNewsTitle(data.data.title); // Acessando os atributos corretamente
        setNewsDescription(data.data.description); // Acessando os atributos corretamente
        setNewsCreatedAt(data.data.createdAt); // Acessando os atributos corretamente
    }
    }, [newsData]);

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

      {/* Main Content */}
      <Box sx={{ p: 2 }}>
        {loading ? <Typography>Loading...</Typography> : (
            <Card>
            <CardMedia
                component="img"
                height="200"
                image="/news1.jpg"
                alt="news"
            />
            <CardContent>
                <Typography variant="caption" color="textSecondary">
                {newsCreatedAt}
                </Typography>
                <Typography variant="h6">{newsTitle}</Typography>
                <Typography variant="body2" color="textSecondary">
                {newsDescription}
                </Typography>

                {/* Aqui entra o conteúdo dinâmico vindo do CMS */}
                <Box sx={{ mt: 2 }}>
                <BlocksRenderer
                    content={mockContent}
                    blocks={{
                    image: ({ image }) => (
                        <img
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alternativeText || ""}
                        loading="lazy"
                        style={{ maxWidth: "100%", height: "auto" }}
                        />
                    ),
                    paragraph: ({ children }) => <p>{children}</p>,
                    }}
                />
                </Box>
            </CardContent>
            </Card>
        )}
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
