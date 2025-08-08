// src/app/(dashboard)/dashboard/page.tsx
"use client"

import { 
  Box, 
  Grid2 as Grid,  // Grid2 importieren
  Paper, 
  Typography, 
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Chip,
  Button,
  IconButton,
  Divider
} from '@mui/material'
import {
  TrendingUp,
  QuestionAnswer,
  Description,
  Group,
  ArrowForward,
  Refresh
} from '@mui/icons-material'

const stats = [
  {
    title: 'Anfragen heute',
    value: '124',
    change: '+12%',
    icon: QuestionAnswer,
    color: 'primary'
  },
  {
    title: 'Verarbeitete Dokumente',
    value: '3,456',
    change: '+8%',
    icon: Description,
    color: 'success'
  },
  {
    title: 'Aktive Nutzer',
    value: '48',
    change: '+2',
    icon: Group,
    color: 'info'
  },
  {
    title: 'Durchschn. Antwortzeit',
    value: '1.2s',
    change: '-0.3s',
    icon: TrendingUp,
    color: 'warning'
  }
]

const recentQueries = [
  { 
    question: "Welche Anforderungen stellt MaRisk an das Risikocontrolling?",
    user: "Max Müller",
    time: "vor 5 Min.",
    document: "MaRisk"
  },
  { 
    question: "Eigenkapitalanforderungen nach CRR für Marktrisiko?",
    user: "Anna Schmidt",
    time: "vor 12 Min.",
    document: "CRR"
  },
  { 
    question: "KWG §25a Abs. 1 - Besondere organisatorische Pflichten",
    user: "Thomas Weber",
    time: "vor 23 Min.",
    document: "KWG"
  }
]

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Dashboard
      </Typography>

      <Grid container spacing={3} mb={4}>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography color="text.secondary" variant="body2" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Chip 
                        label={stat.change} 
                        size="small" 
                        color={stat.change.startsWith('+') ? 'success' : 'error'}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                    <Box 
                      sx={{ 
                        p: 1.5, 
                        borderRadius: 2,
                        backgroundColor: `${stat.color}.light`,
                        opacity: 0.3
                      }}
                    >
                      <Icon sx={{ color: `${stat.color}.main` }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold">
                Aktuelle Anfragen
              </Typography>
              <IconButton size="small">
                <Refresh />
              </IconButton>
            </Box>
            
            <Stack spacing={2}>
              {recentQueries.map((query, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 2, 
                    border: 1, 
                    borderColor: 'divider',
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Typography variant="body1" fontWeight="medium" mb={1}>
                    {query.question}
                  </Typography>
                  <Box display="flex" gap={2} alignItems="center">
                    <Chip label={query.document} size="small" variant="outlined" />
                    <Typography variant="caption" color="text.secondary">
                      {query.user} • {query.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
            
            <Button 
              fullWidth 
              endIcon={<ArrowForward />}
              sx={{ mt: 2 }}
            >
              Alle Anfragen anzeigen
            </Button>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Nutzungsübersicht
            </Typography>
            
            <Stack spacing={3}>
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Tägliches Limit</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    124 / 500
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={24.8} 
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
              
              <Box>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Monatliches Limit</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    3.2k / 10k
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={32} 
                  sx={{ height: 8, borderRadius: 1 }}
                  color="success"
                />
              </Box>
              
              <Divider />
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Verfügbare Dokumente
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  <Chip label="KWG" size="small" color="primary" />
                  <Chip label="MaRisk" size="small" color="primary" />
                  <Chip label="CRR" size="small" color="primary" />
                </Stack>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Vertrag
                </Typography>
                <Chip label="ENTERPRISE" color="success" />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}