import React, { useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  useTheme,
  Avatar,
  Chip,
  Stack,
} from '@mui/material';
import {
  Person,
  School,
  Work,
  Favorite,
  EmojiEvents,
  Timeline,
} from '@mui/icons-material';

const AnimatedAbout = () => {
  const theme = useTheme();
  const sectionRef = useRef(null);

  const aboutCards = [
    {
      icon: <Person />,
      title: "About Me",
      content: "Passionate full-stack developer with 2+ years of experience creating innovative digital solutions.",
      color: theme.palette.primary.main,
    },
    {
      icon: <School />,
      title: "Education",
      content: "Computer Science graduate with First Class Honours and continuous learning in modern technologies and frameworks.",
      color: theme.palette.secondary.main,
    },
    {
      icon: <Work />,
      title: "Experience",
      content: "Worked with startups to enterprise companies, building scalable and maintainable applications and my own projects.",
      color: theme.palette.success.main,
    },
    {
      icon: <Favorite />,
      title: "Passion",
      content: "Love creating beautiful, functional, and user-friendly applications that make a difference.",
      color: theme.palette.error.main,
    },
  ];

  const skills = [
    "React", "Node.js", "JavaScript", "TypeScript", "Python", "MongoDB",
    "PostgreSQL", "AWS", "Docker", "Git", "GraphQL", "Next.js"
  ];

  useEffect(() => {
    // Component mounted - no animations needed
  }, []);

  return (
    <Box
      id="about"
      ref={sectionRef}
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
        position: 'relative',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 }, width: '100%' }}>
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
            About Me
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Get to know more about my journey, skills, and passion for development
          </Typography>
        </Box>

        {/* Profile Image Section */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 4, md: 8 }, mb: 6, flexWrap: 'wrap' }}>
          <Box sx={{ flex: { xs: '100%', md: '0 0 400px' }, textAlign: 'center', mt: { xs: 0, md: -16 }, ml: { xs: 0, md: -18 } }}>
            <Box
              component="img"
              src="/imgs/Adobe Express - file.png"
              alt="Profile Photo"
              sx={{
                width: { xs: 500, md: 800 },
                height: { xs: 500, md: 800 },
                borderRadius: '8px',
                objectFit: 'contain',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '400px' }, pl: { xs: 0, md: 4 }, px: { xs: 2, md: 0 } }}>
            <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, color: theme.palette.primary.main, textShadow: '2px 2px 4px rgba(0,0,0,0.1)', fontSize: { xs: '2rem', md: '3rem' } }}>
              Hi, I'm a Ai and ML Developer
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.3rem' }, lineHeight: 1.9, color: theme.palette.text.primary, fontWeight: 500, letterSpacing: '0.5px' }}>
              I'm a passionate and innovative Ai and ML Developer with over 2+ years of experience 
              crafting exceptional digital solutions that drive real-world impact. My expertise lies 
              in architecting and building scalable, high-performance applications using cutting-edge 
              technologies and modern development practices.
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, fontSize: { xs: '0.9rem', md: '1.2rem' }, lineHeight: 1.8, color: theme.palette.text.secondary, fontWeight: 400 }}>
              I love turning complex problems into simple, beautiful, and intuitive designs. 
              When I'm not coding, you can find me exploring new technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
            </Typography>
            
            {/* Professional Experience Section */}
            <Box sx={{ 
              mb: 6, 
              textAlign: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0,
              }
            }}>
            </Box>


          </Box>
        </Box>

        {/* My Skills Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8, 
          mb: 6,
          px: { xs: 2, md: 4 }
        }}>
          <Typography variant="overline" sx={{ 
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.palette.text.secondary,
            letterSpacing: '0.1em',
            mb: 1
          }}>
            SKILLS
          </Typography>
          <Typography variant="h3" sx={{ 
            mb: 3, 
            fontWeight: 700, 
            color: theme.palette.text.primary,
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            My Skills
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 6,
            maxWidth: '800px',
            margin: '0 auto',
            color: theme.palette.text.secondary,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6
          }}>
            Embark on a journey through captivating digital landscapes with a skilled artisan in HTML5, CSS, and JavaScript. 
            With an eye for detail and a passion for creativity, I sculpt stunning websites that transcend the ordinary, 
            fusing sleek design with seamless functionality.
          </Typography>
          <br />

          {/* Skills Grid */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { name: 'React', percentage: 85 },
              { name: 'HTML & CSS, SCSS', percentage: 95 },
              { name: 'JavaScript', percentage: 90 },
              { name: 'Node.js', percentage: 80 },
              { name: 'C++', percentage: 90 },
              { name: 'Python & Machine Learning', percentage: 88 },
              { name: 'Java & PHP', percentage: 92 },
              { name: 'WordPress', percentage: 83 },
              { name: 'SEO', percentage: 70 }
            ].map((skill, index) => (
              <Box
                key={index}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: '12px',
                  p: 3,
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <Typography variant="h6" sx={{ 
                  mb: 3, 
                  fontWeight: 600,
                  color: theme.palette.text.primary
                }}>
                  {skill.name}
                </Typography>
                <Box sx={{ 
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 120,
                  height: 120
                }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: `conic-gradient(#4CAF50 0deg, #4CAF50 ${skill.percentage * 3.6}deg, #E0E0E0 ${skill.percentage * 3.6}deg, #E0E0E0 360deg)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.background.paper,
                      }
                    }}
                  />
                  <Typography variant="h4" sx={{ 
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    zIndex: 1
                  }}>
                    {skill.percentage}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Certifications Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8, 
          mb: 6,
          px: { xs: 2, md: 4 }
        }}>
          <Typography variant="overline" sx={{ 
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.palette.text.secondary,
            letterSpacing: '0.1em',
            mb: 1
          }}>
            CERTIFICATIONS
          </Typography>
          <Typography variant="h3" sx={{ 
            mb: 3, 
            fontWeight: 700, 
            color: theme.palette.text.primary,
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            My Certifications
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 6,
            maxWidth: '800px',
            margin: '0 auto',
            color: theme.palette.text.secondary,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6
          }}>
            Validated expertise across various technologies and platforms through industry-recognized certifications.
          </Typography>

          {/* Certifications Grid */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
            gap: 3,
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            {[
                              { name: 'Power apps & Approval Workflow', issuer: 'Microsoft', color: '#0078D4', image: '/imgs/c1.png' },
              { name: 'Certified in Code Generation with LLMs ', issuer: 'Styava', color: '#FF9900', image: '/imgs/c2.png' },
              { name: 'Certified in Data Science and Analytics ', issuer: 'HP', color: '#4285F4', image: '/imgs/c3.png' },
              { name: 'Generative AI for Educators', issuer: 'GOOGLE', color: '#326CE5', image: '/imgs/c4.png' },
              { name: 'Certified in Scaling with Google Cloud Operations ', issuer: 'google cloud & simple learn with skillup', color: '#61DAFB', image: '/imgs/c5.png' },
              { name: 'Certified in Azure AI Fundamentals, providing foundational knowledge of AI concepts and services in Azure', issuer: 'MLSA', color: '#339933', image: '/imgs/c6.png' },
              { name: 'Certified in Computer Networking - Local Area Networks and the OSI Model ', issuer: 'Alison', color: '#3776AB', image: '/imgs/c7.png' },
              { name: 'Certified in Computer Networking - Digital Network Security from Alison', issuer: 'Alison', color: '#47A248', image: '/imgs/c8.png' },
              { name: 'Certified in Introduction to C++ Programming Language from Alison', issuer: 'Alison', color: '#0DB7ED', image: '/imgs/c9.png' },
              { name: 'Certified in Develop Solutions with Azure AI Document Intelligence ', issuer: 'Microsoft', color: '#E10098', image: '/imgs/c10.png' },
              { name: 'Certified in Azure AI Computer Vision ', issuer: 'Microsoft', color: '#0056D2', image: '/imgs/c11.png' },
              { name: 'Certified in Fundamentals of Machine Learning ', issuer: 'Microsoft', color: '#756717', image: '/imgs/c12.png' },
              { name: 'Certified in Introduction to DevOps ', issuer: 'Microsoft', color: '#919717', image: '/imgs/c13.png' },
              { name: 'Certified in Fundamentals of Responsible Generative AI', issuer: 'Microsoft', color: '#641517', image: '/imgs/c14.png' },
            ].map((cert, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  background: `linear-gradient(135deg, ${cert.color}05, ${cert.color}10)`,
                  borderRadius: '20px',
                  p: 4,
                  textAlign: 'center',
                  border: `2px solid ${cert.color}15`,
                  backdropFilter: 'blur(20px)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle, ${cert.color}20 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.4s ease',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.6s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-12px) scale(1.02)',
                    borderColor: cert.color,
                    boxShadow: `0 20px 60px ${cert.color}40, 0 8px 32px ${cert.color}30`,
                    background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}25)`,
                    '&::before': {
                      opacity: 1,
                    },
                    '&::after': {
                      transform: 'translateX(100%)',
                    },
                    '& .cert-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 12px 36px ${cert.color}40`,
                      '& img': {
                        transform: 'scale(1.1)',
                      }
                    },
                    '& .cert-name': {
                      color: cert.color,
                      transform: 'translateY(-2px)',
                    },
                    '& .cert-issuer': {
                      transform: 'scale(1.05)',
                    },
                  }
                }}
              >
                {/* Floating particles */}
                {[...Array(3)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      position: 'absolute',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: cert.color,
                      top: `${20 + i * 30}%`,
                      left: `${10 + i * 25}%`,
                      opacity: 0,
                      transition: 'all 0.6s ease',
                      boxShadow: `0 0 10px ${cert.color}`,
                      '&:hover': {
                        opacity: 0.6,
                        transform: 'translateY(-10px)',
                      }
                    }}
                  />
                ))}

                <Box
                  className="cert-icon"
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: 200,
                    borderRadius: '20px',
                    background: `linear-gradient(135deg, ${cert.color}10, ${cert.color}20)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: `0 8px 24px ${cert.color}20`,
                    overflow: 'hidden',
                    border: `2px solid ${cert.color}30`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -2,
                      borderRadius: '20px',
                      padding: '2px',
                      background: `linear-gradient(135deg, ${cert.color}40, transparent)`,
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '16px',
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1), transparent)`,
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                    },
                    '&:hover::after': {
                      opacity: 1,
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={cert.image}
                    alt={cert.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '16px',
                      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  />
                  <Box
                    sx={{
                      display: 'none',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}40)`,
                    }}
                  >
                    <Typography variant="h2" sx={{ color: cert.color, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
                      🎓
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography 
                    className="cert-name"
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 700,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1rem', md: '1.15rem' },
                      transition: 'all 0.3s ease',
                      lineHeight: 1.4,
                      minHeight: '3.5em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {cert.name}
                  </Typography>
                  <Box
                    className="cert-issuer"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2.5,
                      py: 1,
                      borderRadius: '25px',
                      background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}25)`,
                      border: `1px solid ${cert.color}30`,
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: cert.color,
                        boxShadow: `0 0 8px ${cert.color}`,
                      }
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: cert.color,
                        fontWeight: 600,
                        fontSize: { xs: '0.8rem', md: '0.85rem' }
                      }}
                    >
                      {cert.issuer}
                    </Typography>
                  </Box>
                </Box>

                {/* Verified badge */}
                <Box sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${cert.color}, ${cert.color}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${cert.color}40`,
                  opacity: 0,
                  transform: 'scale(0)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                    transform: 'scale(1)',
                  }
                }}>
                  <Typography sx={{ fontSize: '1.2rem' }}>✓</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Badges Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8, 
          mb: 6,
          px: { xs: 2, md: 4 }
        }}>
          <Typography variant="overline" sx={{ 
            fontSize: '0.875rem',
            fontWeight: 600,
            color: theme.palette.text.secondary,
            letterSpacing: '0.1em',
            mb: 1
          }}>
            ACHIEVEMENTS
          </Typography>
          <Typography variant="h3" sx={{ 
            mb: 3, 
            fontWeight: 700, 
            color: theme.palette.text.primary,
            fontSize: { xs: '2rem', md: '3rem' }
          }}>
            My Badges
          </Typography>
          <Typography variant="body1" sx={{ 
            mb: 6,
            maxWidth: '800px',
            margin: '0 auto',
            color: theme.palette.text.secondary,
            fontSize: { xs: '1rem', md: '1.1rem' },
            lineHeight: 1.6
          }}>
            Special achievements and recognitions earned through dedication and expertise.
          </Typography>

          {/* Badges Grid */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                title: 'Microsoft Learn Student Ambassador',
                description: 'Recognized for leadership and technical excellence in the developer community',
                
                gradient: 'linear-gradient(135deg, #0078D4, #1E88E5, #42A5F5)',
                year: '2024',
                image: '/imgs/b1.png'
              },
              {
                title: 'HP LIFE Ambassador',
                description: 'Leading technology training and community building on HP',
                
                gradient: 'linear-gradient(135deg, #181717, #2F1E1E, #423B39)',
                year: '2024',
                image: '/imgs/b2.png'
              },
              {
                title: 'MICROSOFT LEARN CHALLENGE BUILD EDITION',
                description: 'During the Microsoft Learn Challenge Build Edition in June',
                
                gradient: 'linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77)',
                year: '2024',
                image: '/imgs/b3.png'
              }
            ].map((badge, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  background: badge.gradient,
                  borderRadius: '20px',
                  p: 4,
                  color: 'white',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s ease',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -30,
                    left: -30,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.4s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-10px) scale(1.02)',
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.25)',
                    '&::before': {
                      top: -30,
                      right: -30,
                      width: 180,
                      height: 180,
                    },
                    '&::after': {
                      bottom: -20,
                      left: -20,
                      width: 120,
                      height: 120,
                    },
                    '& .badge-icon': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
                      '& img': {
                        transform: 'scale(1.05)',
                      }
                    },
                  }
                }}
              >
                <Box
                  className="badge-icon"
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 250,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    mb: 3,
                    background: badge.gradient,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'transform 0.4s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={badge.image}
                    alt={badge.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '14px',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <Box
                    sx={{
                      display: 'none',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: badge.gradient,
                    }}
                  >
                    <Typography variant="h1" sx={{ color: 'white', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                      {badge.icon}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h5" sx={{ 
                  mb: 2, 
                  fontWeight: 700,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  textAlign: 'center',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                }}>
                  {badge.title}
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: 3,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  textAlign: 'center',
                  opacity: 0.95,
                  lineHeight: 1.6,
                }}>
                  {badge.description}
                </Typography>
                <Box sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 3,
                  py: 1,
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {badge.year}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* GitHub Statistics Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mt: 8, 
          mb: 6,
          px: { xs: 2, md: 4 }
        }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #20B2AA, #00CED1)',
            p: 3,
            borderRadius: '12px',
            mb: 4
          }}>
            <Typography variant="h4" sx={{ 
              color: 'white',
              fontWeight: 700,
              mb: 1,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}>
              THIS IS MY GITHUB STATS
            </Typography>
          </Box>

          {/* GitHub Stats Grid */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(3, 1fr)' },
            gap: 4,
            maxWidth: '1400px',
            margin: '0 auto'
          }}>
            
            {/* GitHub Stats Panel */}
            <Box sx={{
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              p: 4,
              color: 'white',
              textAlign: 'left'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'white'
              }}>
                H.D Chamika Munithunga's GitHub Stats
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 1, color: '#ccc' }}>
                  Total Stars Earned: <span style={{ color: '#FFD700' }}>101</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#ccc' }}>
                  Total Commits (2024): <span style={{ color: '#4CAF50' }}>463</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#ccc' }}>
                  Total PRs: <span style={{ color: '#2196F3' }}>3</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#ccc' }}>
                  % Merged PRs Percentage: <span style={{ color: '#FF9800' }}>33.33%</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#ccc' }}>
                  Total Issues: <span style={{ color: '#F44336' }}>0</span>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1, color: '#ccc' }}>
                  Contributed to (last year): <span style={{ color: '#9C27B0' }}>2</span>
                </Typography>
              </Box>

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                mt: 3
              }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '4px solid #FFD700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255, 215, 0, 0.1)'
                }}>
                  <Typography variant="h4" sx={{ 
                    color: '#FFD700',
                    fontWeight: 700
                  }}>
                    B
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Most Used Languages Panel */}
            <Box sx={{
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              p: 4,
              color: 'white',
              textAlign: 'left'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'white'
              }}>
                Most Used Languages
              </Typography>
              
              {/* Language Bar */}
              <Box sx={{ 
                height: '20px', 
                borderRadius: '10px', 
                overflow: 'hidden',
                mb: 3,
                background: '#333'
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  height: '100%',
                  '& > div': { height: '100%' }
                }}>
                  <Box sx={{ width: '47.15%', background: '#3776AB' }}></Box>
                  <Box sx={{ width: '19.41%', background: '#9C27B0' }}></Box>
                  <Box sx={{ width: '15.44%', background: '#FF9800' }}></Box>
                  <Box sx={{ width: '8.96%', background: '#E91E63' }}></Box>
                  <Box sx={{ width: '7.01%', background: '#F7DF1E' }}></Box>
                  <Box sx={{ width: '1.64%', background: '#607D8B' }}></Box>
                </Box>
              </Box>

              {/* Language List */}
              <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#3776AB', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>Python 47.15%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#9C27B0', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>CSS 19.41%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#FF9800', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>HTML 15.44%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#E91E63', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>SCSS 8.96%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#F7DF1E', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>JavaScript 7.01%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#795548', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>Java 0.77%</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: '#3F51B5', mr: 2 }}></Box>
                  <Typography variant="body2" sx={{ color: '#ccc' }}>PHP 0.74%</Typography>
                </Box>
              </Box>
            </Box>

            {/* GitHub Contributor Stats Panel */}
            <Box sx={{
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              p: 4,
              color: 'white',
              textAlign: 'left'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 3, 
                fontWeight: 500,
                color: 'white'
              }}>
                H.D Chamika Munithunga's GitHub Contributor Stats
              </Typography>
              
              {/* Repository Header */}
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2,
                borderBottom: '1px solid #333',
                pb: 1
              }}>
                <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600, mr: 2 }}>
                  Repository
                </Typography>
                <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 600 }}>
                  Grade
                </Typography>
              </Box>

              {/* Repository List */}
              <Box>
                {[
                  'Chatbot_ai',
                  'Movie_recomandation', 
                  'chamikamunithunga',
                  'Fitness_Zone',
                  'population-of-sri-lanka'
                ].map((repo, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2,
                    p: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.05)'
                    }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#4CAF50',
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
                          👤
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: '#ccc' }}>
                        {repo}
                      </Typography>
                    </Box>
                    <Box sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="caption" sx={{ color: 'white', fontWeight: 700 }}>
                        B
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

          </Box>
        </Box>

        

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 6 }}>
          {aboutCards.map((card, index) => (
            <Card
              key={index}
              sx={{
                flex: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 24px)' },
                minHeight: 250,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: `0 20px 40px ${card.color}20`,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: card.color,
                },
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    backgroundColor: `${card.color}20`,
                    color: card.color,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {card.icon}
                </Avatar>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {card.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>


      </Container>
    </Box>
  );
};

export default AnimatedAbout;
