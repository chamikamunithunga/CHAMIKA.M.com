import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Button,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import {
  GitHub,
  OpenInNew,
  Web,
  PhoneAndroid,
  Code,
  DesignServices,
} from '@mui/icons-material';

gsap.registerPlugin(ScrollTrigger);

const AnimatedProjects = () => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const projectCardsRef = useRef([]);

  const projects = [
    {
      title: "FeatherFrame - Bird Identification System",
      description: "AI-powered bird identification and social platform for bird enthusiasts. Features real-time bird detection, species identification, community sharing, and detailed insights for discovering local and rare birds.",
      image: "public/imgs/p1.png",
      technologies: ["AI/ML", "Computer Vision", "React", "Python", "TensorFlow"],
      type: "AI Application",
      github: "https://github.com/chamikamunithunga/Bird-Identification-and-Detection-System-Using-Ai",
      live: "#",
      color: "#e74c3c",
    },
    {
      title: "Ashvini Diving – Explore Sri Lanka’s Underwater Wonders",
      description: "A captivating and elegant React-based website dedicated to showcasing the breathtaking underwater landscapes of Sri Lanka through the eyes of Sri Lanka’s first female Dive Master.",
      image: "public/imgs/p2.png",
      technologies: ["React", "css3", "AOS", "Vite"],
      type: "Web Application",
      github: "https://github.com/chamikamunithunga/Ashvini",
      live: "https://ashvini.vercel.app/",
      color: theme.palette.secondary.main,
    },
    {
      title: "AIInsight Engine - Intelligent AI Trend Tracker",
      description: "Track the latest AI research papers, frameworks, and models in real-time. AIInsight Engine automatically scrapes arXiv, Hugging Face, and AI blogs, intelligently categorizes trends, and delivers insights through a beautiful interactive dashboard",
      image: "public/imgs/p3.png",
      technologies: ["Python", "Streamlit ", "BeautifulSoup", "Transformers"],
      type: "web Application",
      github: "https://github.com/chamikamunithunga/AiInsight-Engine",
      live: "#",
      color: theme.palette.success.main,
    },
    {
      title: "ToniT – AI-Powered Cocktail Recommender ",
      description: "ToniT captures your mood and flavor preferences, then taps into the Gemini API by Google to generate creative, curated cocktail recommendations tailored just for you.",
      image: "public/imgs/p4.png",
      technologies: ["React", "Material-UI", "Node.js", "Gemini’s generative model"],
      type: "Website",
      github: "#",
      live: "#",
      color: theme.palette.warning.main,
    },
    {
      title: "Blockchain Front-End Development",
      description: "Real-time chat application with group messaging, file sharing, and emoji reactions built with modern web technologies.",
      image: "public/imgs/p5.png",      
      technologies: ["Socket.io", "React", "Web3", "Material-UI"],
      type: "Web Application",
      github: "#",
      live: "#",
      color: "#9747d7",
    },
    {
      title: "TuskerOne.AI",
      description: "A groundbreaking system designed to protect Sri Lanka’s villages and farmlands from the risks posed by wild elephants. Powered by Lankan Travalester",
      image: "public/imgs/p6.png", 
      technologies: ["React", "Satcom", "python", "Docker"],
      type: "Ai Application",
      github: "#",
      live: "#",
      color: "#f57763",
    },
    {
      title: "TrunkTracker: Wild Elephant Detection System Using Satellite Data",
      description: "This project utilizes advanced satellite imagery and geospatial data to track and monitor elephant movements near human-populated areas, providing valuable insights to protect both wildlife and communities.",
      image: "public/imgs/p7.png",       
      technologies: ["react", "Firebase", "python", "Satcom"],
      type: "Ai Application",
      github: "#",
      live: "#",
      color: "#4fcaf5",
    },
    {
      title: "Satellite Data Summarizer ",
      description: "Satellite Data Summarizer – A Sub-Project of My Wild Elephant Detection System Using AI-Powered Satellite Imagery Analysis.",
      image: "public/imgs/p8.png",      
      technologies: ["Python", "TensorFlow", "NLP", "OpenAI"],
      type: "AI Application",
      github: "#",
      live: "#",
      color: "#f0936b",
    },
    {
      title: "Feather Frame",
      description: "AI birding that blends computer vision with a social field journal & social networking platform with posts, comments, likes, and real-time notifications.",
      image: "public/imgs/p9.png",      
      technologies: ["React+ vite", "Express", "MUI", "firebase"],
      type: "Ai Application",
      github: "#",
      live: "#",
      color: "#e63945",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards
      projectCardsRef.current.forEach((card, index) => {
        gsap.fromTo(card, 
          { 
            opacity: 0, 
            y: 100,
            rotationY: -15,
          },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Add 3D hover effect
        gsap.set(card, { transformOrigin: "center center" });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      id="projects"
      ref={sectionRef}
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              fontWeight: 700,
              background: theme.palette.background.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Projects
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            A showcase of my recent work and side projects
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {projects.map((project, index) => (
            <Card
              key={index}
              ref={el => projectCardsRef.current[index] = el}
              sx={{
                flex: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 21.33px)' },
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px) rotateX(5deg)',
                  boxShadow: `0 20px 40px ${project.color}20`,
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={project.image}
                alt={project.title}
                sx={{
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              />
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    icon={project.type === "Mobile Application" ? <PhoneAndroid /> : <Web />}
                    label={project.type}
                    size="small"
                    sx={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      fontWeight: 500,
                    }}
                  />
                </Box>
                
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {project.title}
                </Typography>
                
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {project.description}
                </Typography>

                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
                  {project.technologies.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: project.color,
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    component="a"
                    href={project.github}
                    target="_blank"
                    sx={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      '&:hover': {
                        backgroundColor: project.color,
                        color: 'white',
                      },
                    }}
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={project.live}
                    target="_blank"
                    sx={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      '&:hover': {
                        backgroundColor: project.color,
                        color: 'white',
                      },
                    }}
                  >
                    <OpenInNew />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AnimatedProjects;
