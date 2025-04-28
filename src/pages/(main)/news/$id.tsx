import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
} from "@mui/material";
import { useParams, Link } from "@tanstack/react-router";
import { BlocksRenderer, type BlocksContent } from "@/components/index";
import { useNews } from "@/hooks/newsByID";
import { toast } from "sonner";
import { convertToBrazilianDateWithHours } from "@/utils/data";

export const NewsById = () => {
  const { id } = useParams({ strict: false });
  const { newsData, loading } = useNews(id);

  const [mockContent, setMockContent] = useState<BlocksContent>([]);
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDescription, setNewsDescription] = useState("");
  const [newsCreatedAt, setNewsCreatedAt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (newsData) {
      const { data } = newsData;
      const attributes = data.data;

      setMockContent(attributes.content);
      setNewsTitle(attributes.title);
      setNewsDescription(attributes.description);
      setNewsCreatedAt(attributes.createdAt);
      setImageUrl(attributes.cover?.url || "");
      toast.success("Notícia carregada com sucesso!");
    }
  }, [newsData]);

  return (
    <section
      style={{
        backgroundColor: "#F9F9F9",
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header no estilo da página principal */}
      {/* Header com estilo da home, cor personalizada e sem "Anuncie aqui" */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          backgroundColor: "#1a4b6f", // nova cor solicitada
          borderBottom: "1px solid #ccc",
        }}
      >
        {/* Letreiro clicável */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              fontFamily: "serif",
              "& span": { color: "#00aaff" },
            }}
          >
            <span>O auto da</span> capital
          </Typography>
        </Link>
      </Box>

      {/* Main Content */}
      <Box sx={{ paddingTop: 2 }}>
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
              backgroundColor: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
                px: { xs: 2, sm: 4 },
                py: 4,
                width: "100%",
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                align="center"
                fontWeight="bold"
                sx={{ mb: 2, color: "#00529B" }}
              >
                {newsTitle}
              </Typography>

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

              <Box
                sx={{
                  px: 4,
                  "& p": {
                    textAlign: "justify",
                    fontSize: "1.1rem",
                    lineHeight: 1.8,
                    mb: 3,
                    color: "#333",
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
                        children
                          ?.map((child: any) => child.props.text)
                          .join("") ?? "";
                      const isIframe = /<\/?(iframe)/.test(textContent);

                      if (isIframe) {
                        return (
                          <div
                            dangerouslySetInnerHTML={{ __html: textContent }}
                          />
                        );
                      }

                      return <p>{children}</p>;
                    },
                  }}
                />
              </Box>

              <Typography
                variant="body2"
                align="right"
                sx={{ mt: 4, color: "#555" }}
              >
                {`Publicado em ${convertToBrazilianDateWithHours(newsCreatedAt)}`}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Rodapé institucional */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          pt: 4,
          pb: 4,
          px: 2,
          backgroundColor: "#003366",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
            gap: 4,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Auto da Capital
            </Typography>
            <Typography variant="body2">
              Sua fonte confiável de notícias locais e nacionais.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Seções
            </Typography>
            <Typography variant="body2">Notícias</Typography>
            <Typography variant="body2">Política</Typography>
            <Typography variant="body2">Esportes</Typography>
            <Typography variant="body2">Cultura</Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Institucional
            </Typography>
            <Typography variant="body2">Sobre nós</Typography>
            <Typography variant="body2">Redação</Typography>
            <Typography variant="body2">Contato</Typography>
            <Typography variant="body2">Publicidade</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            borderTop: "1px solid #1a4b6f",
            mt: 3,
            pt: 2,
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#ccc",
          }}
        >
          © {new Date().getFullYear()} Auto da Capital. Todos os direitos
          reservados.
        </Box>
      </Box>
    </section>
  );
};
