import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";


import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useNews } from "@/hooks/newsByID";
import { toast } from "sonner";

import Icon from "@/assets/img/logo_visao.png";
import { convertToBrazilianDateWithHours } from "@/utils/data";

export const NewsById = () => {
  const { id } = useParams({ strict: false });
  const { newsData, loading } = useNews(id);
  const navigate = useNavigate();

  const [mockContent, setMockContent] = useState<BlocksContent>([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsCreatedAt, setNewsCreatedAt] = useState("");
  const [category, setCategory] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (newsData) {
      const { data } = newsData;
      const attributes = data.data;

      setMockContent(attributes.content);
      setNewsTitle(attributes.title);
      setNewsDescription(attributes.description);
      setNewsCreatedAt(attributes.createdAt);
      setCategory(attributes.categories);
      setImageUrl(attributes.cover?.url || "");
      toast.success("Notícia carregada com sucesso!");
    }
  }, [newsData]);

  return (
    <section
      style={{
        background: "#F9F9F9",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
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

      {/* Main Content */}
      <Box sx={{ paddingTop: 2}}>
        {loading ? (
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="100%" />
              <Skeleton variant="rounded" height={100} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        ) : (
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowX: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={imageUrl}
              alt="news"
              sx={{ objectFit: "cover", width: "100%" }}
            />
            <CardContent
              sx={{
                px: { xs: 2, sm: 4 }, // padding menor em telas pequenas
                py: 4,
                width: '100%',
                maxWidth: '800px',
                mx: 'auto', // centraliza horizontalmente
              }}
            >

              {/* Título da Notícia */}
              <Typography
                variant="h5"
                component="h1"
                align="center"
                fontWeight="bold"
                sx={{ mb: 2 }}
              >
                {newsTitle}
              </Typography>

              {/* Descrição (subtítulo) */}
              {newsDescription && (
                <Typography
                  variant="subtitle1"
                  align="center"
                  color="textSecondary"
                  sx={{ mb: 3 }}
                >
                  {newsDescription}
                </Typography>
              )}

              {/* Localização e Data */}
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ mb: 3 }}
              >
                {`Daniela, DF, Brasília`}
                <br />
                {`Publicado em ${convertToBrazilianDateWithHours(newsCreatedAt)}`}
              </Typography>

              {/* Conteúdo da Notícia (CMS) */}
              <Box
                sx={{
                  px: 4,
                  "& p": {
                    textAlign: "justify",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                  },
                  "& iframe": {
                    width: "100% !important",
                    maxWidth: "100%",
                    aspectRatio: "16/9",
                    border: "none",
                  },
                }}
              >
                <BlocksRenderer
                  content={mockContent}
                  blocks={{
                    paragraph: ({ children }: any) => {
                      const textContent =
                        children?.map((child: any) => child.props.text).join("") ?? "";

                      const isIframe = /<\/?(iframe)/.test(textContent);

                      if (isIframe) {
                        return (
                          <div
                            dangerouslySetInnerHTML={{ __html: textContent }}
                            style={{ width: "100%" }}
                          />
                        );
                      }

                      return <p>{children}</p>;
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </section>
  );
};
