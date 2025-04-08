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
  Skeleton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useNews } from "@/hooks/newsByID";
import { toast } from "sonner";

const baseURL = import.meta.env.VITE_PUBLIC_HOST;
import Icon from "@/assets/img/icon.png";

export const NewsById = () => {
  // Conteúdo simulado vindo do CMS
  const { id } = useParams({ strict: false });
  const { newsData, loading, error } = useNews(id);
  const [mockContent, setMockContent] = useState<BlocksContent>([]);
  const [newsTitle, setNewsTitle] = useState<string>("");
  const [newsDescription, setNewsDescription] = useState<string>("");
  const [newsCreatedAt, setNewsCreatedAt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (newsData) {
      toast.success("Notícia carregada com sucesso!");
      const { data } = newsData;
      setMockContent(data.data.content); // Acessando os atributos corretamente
      setNewsTitle(data.data.title); // Acessando os atributos corretamente
      setNewsDescription(data.data.description); // Acessando os atributos corretamente
      setNewsCreatedAt(data.data.createdAt); // Acessando os atributos corretamente
      setImageUrl(data.data?.cover?.url); // Acessando os atributos corretamente
      console.log(baseURL + data.data?.cover?.url);
    }
  }, [newsData]);

  return (
    <section
      style={{
        background: "#f3f4f6",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        boxSizing: "border-box", // essencial
      }}
    >
      {/* Header */}
      <AppBar
        style={{ width: "100%", boxSizing: "border-box" }}
        position="static"
        color="default"
        elevation={1}
      >
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
          width: "100%",
        }}
      >
        Distrito Federal
      </Box>

      {/* Main Content */}
      <Box>
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
            style={{
              display: "flex",
              width: "100%",
              maxWidth: "100%",
              flexDirection: "column",
              padding: 16, // use um valor mais confortável, em px
              boxSizing: "border-box", // essencial
              overflowX: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="300"
              width={"100%"}
              image={baseURL + imageUrl}
              alt="news"
            />
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                flexWrap: "wrap",
              }}
            >
              <Typography
                sx={{ textAlign: "start" }}
                variant="caption"
                color="textSecondary"
              >
                {newsCreatedAt}
              </Typography>
              <Typography variant="h6">{newsTitle}</Typography>
              <Typography variant="body2" color="textSecondary">
                {newsDescription}
              </Typography>

              {/* Aqui entra o conteúdo dinâmico vindo do CMS */}
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  "& p": {
                    lineHeight: "1.8",
                    fontSize: "1rem",
                    marginBottom: "1em",
                    textAlign: "justify",
                  },
                  "& iframe": {
                    width: "50% !important",
                    display: "flex",
                    justifySelf: "center",
                    maxWidth: "100%",
                    height: "auto",
                    aspectRatio: "16/9", // Mantém a proporção
                  },
                }}
              >
                <BlocksRenderer
                  content={mockContent}
                  blocks={{
                    paragraph: ({ children, ...rest }) => {
                      const textContent =
                        children?.map((child) => child.props.text).join("") ??
                        "";

                      // Verifica se é um HTML embutido (como <iframe>)
                      const hasHTML = /<\/?(iframe)/.test(textContent);
                      if (hasHTML) {
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
