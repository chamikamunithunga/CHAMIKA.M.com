import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, LinearProgress, Chip, useTheme, Grid, Card, CardContent, Avatar } from '@mui/material';
import { Code, Design, DataObject, Language, Psychology, School } from '@mui/icons-material';
import { motion } from 'framer-motion';

const InteractiveResume = () => {
  const theme = useTheme();
  const [activeSection, setActiveSection] = useState('skills');
  const [skillProgress, setSkillProgress] = useState({});

  const skills = [
    { name: 'React', level: 95, icon: <Code />, color: '#61dafb' },
    { name: 'JavaScript', level: 90, icon: <Code />, color: '#f7df1e' },
    { name: 'Node.js', level: 85, icon: <DataObject />, color: '#339933' },
    { name: 'Python', level: 80, icon: <DataObject />, color: '#3776ab' },
    { name: 'UI/UX Design', level: 88, icon: <Design />, color: '#ff6b6b' },
    { name: 'TypeScript', level: 82, icon: <Code />, color: '#3178c6' },
    { name: 'GraphQL', level: 75, icon: <DataObject />, color: '#e10098' },
    { name: 'Machine Learning', level: 70, icon: <Psychology />, color: '#ff9800' },
  ];

  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      period: '2022 - Present',
      description: 'Leading frontend development team, implementing React applications with advanced animations and user interactions.',
      achievements: ['Increased user engagement by 40%', 'Reduced load time by 60%', 'Mentored 5 junior developers']
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2020 - 2022',
      description: 'Developed full-stack applications using React, Node.js, and MongoDB. Implemented real-time features and API integrations.',
      achievements: ['Built 10+ production applications', 'Implemented CI/CD pipeline', 'Achieved 99.9% uptime']
    },
    {
      title: 'Junior Developer',
      company: 'WebSolutions',
      period: '2018 - 2020',
      description: 'Started career as junior developer, learning modern web technologies and best practices.',
      achievements: ['Completed 50+ projects', 'Learned 15+ technologies', 'Received Employee of the Year award']
    }
  ];

  const education = [
    {
      degree: 'Master of Computer Science',
      school: 'University of Technology',
      year: '2018',
      gpa: '3.8/4.0',
      relevant: ['Advanced Algorithms', 'Machine Learning', 'Software Engineering']
    },
    {
      degree: 'Bachelor of Information Technology',
      school: 'Tech Institute',
      year: '2016',
      gpa: '3.6/4.0',
      relevant: ['Web Development', 'Database Systems', 'Network Security']
    }
  ];

  const projects = [
    {
      name: 'E-Commerce Platform',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      description: 'Full-stack e-commerce solution with real-time inventory management and payment processing.',
      impact: '500+ active users'
    },
    {
      name: 'Task Management App',
      tech: ['React Native', 'Firebase', 'Redux'],
      description: 'Cross-platform mobile app with real-time collaboration and offline support.',
      impact: '10k+ downloads'
    },
    {
      name: 'AI Chatbot',
      tech: ['Python', 'TensorFlow', 'NLP', 'WebSocket'],
      description: 'Intelligent chatbot with natural language processing and machine learning capabilities.',
      impact: '95% accuracy rate'
    }
  ];

  useEffect(() => {
    // Animate skill bars on mount
    skills.forEach((skill, index) => {
      setTimeout(() => {
        setSkillProgress(prev => ({
          ...prev,
          [skill.name]: skill.level
        }));
      }, index * 200);
    });
  }, []);

  const SkillBar = ({ skill }) => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ color: skill.color }}>{skill.icon}</Box>
          <Typography variant="body1" fontWeight="medium">
            {skill.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {skillProgress[skill.name] || 0}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={skillProgress[skill.name] || 0}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'rgba(255,255,255,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: skill.color,
            borderRadius: 4,
          }
        }}
      />
    </Box>
  );

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        mb: 4
      }}>
        🎯 Interactive Resume
      </Typography>

      {/* Navigation Tabs */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        {['skills', 'experience', 'education', 'projects'].map((section) => (
          <Chip
            key={section}
            label={section.charAt(0).toUpperCase() + section.slice(1)}
            onClick={() => setActiveSection(section)}
            color={activeSection === section ? 'primary' : 'default'}
            variant={activeSection === section ? 'filled' : 'outlined'}
            sx={{ 
              textTransform: 'capitalize',
              cursor: 'pointer',
              '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white' }
            }}
          />
        ))}
      </Box>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeSection === 'skills' && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Code /> Technical Skills
                </Typography>
                {skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Language /> Languages
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>English</Typography>
                    <Chip label="Native" size="small" color="primary" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>Spanish</Typography>
                    <Chip label="Fluent" size="small" color="secondary" />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>French</Typography>
                    <Chip label="Intermediate" size="small" color="default" />
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {activeSection === 'experience' && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {experience.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card elevation={3}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" color="primary">
                          {job.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {job.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.period}
                        </Typography>
                      </Box>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {job.title.charAt(0)}
                      </Avatar>
                    </Box>
                    <Typography variant="body1" paragraph>
                      {job.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {job.achievements.map((achievement, idx) => (
                        <Chip key={idx} label={achievement} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        )}

        {activeSection === 'education' && (
          <Grid container spacing={3}>
            {education.map((edu, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card elevation={3}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                          <School />
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{edu.degree}</Typography>
                          <Typography variant="subtitle1" color="text.secondary">
                            {edu.school}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {edu.year} • GPA: {edu.gpa}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" gutterBottom>
                        Relevant Coursework:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {edu.relevant.map((course, idx) => (
                          <Chip key={idx} label={course} size="small" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}

        {activeSection === 'projects' && (
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {project.tech.map((tech, idx) => (
                          <Chip key={idx} label={tech} size="small" color="primary" variant="outlined" />
                        ))}
                      </Box>
                      <Typography variant="body2" fontWeight="medium" color="success.main">
                        Impact: {project.impact}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </Box>
  );
};

export default InteractiveResume;
