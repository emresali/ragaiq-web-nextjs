// src/app/(dashboard)/documents/page.tsx
"use client"

import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Tabs,
  Tab,
  Badge,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from '@mui/material'
import {
  Search,
  FilterList,
  Download,
  Info,
  CheckCircle,
  Schedule,
  LibraryBooks,
  Gavel,
  AccountBalance,
  Description,
  Update,
  Storage,
  Visibility
} from '@mui/icons-material'

interface Document {
  id: string
  name: string
  fullName: string
  description: string
  icon: any
  status: 'active' | 'updating' | 'scheduled'
  lastUpdate: string
  version: string
  size: string
  pages: number
  sections: string[]
  tags: string[]
}

const DOCUMENTS: Document[] = [
  {
    id: 'kwg',
    name: 'KWG',
    fullName: 'Kreditwesengesetz',
    description: 'Gesetz über das Kreditwesen mit allen aktuellen Änderungen und Ergänzungen',
    icon: Gavel,
    status: 'active',
    lastUpdate: '15.03.2024',
    version: '2024.1',
    size: '2.4 MB',
    pages: 156,
    sections: ['Begriffsbestimmungen', 'Eigenmittel', 'Liquidität', 'Großkredite'],
    tags: ['Bankenaufsicht', 'Eigenmittel', 'Zulassung']
  },
  {
    id: 'marisk',
    name: 'MaRisk',
    fullName: 'Mindestanforderungen an das Risikomanagement',
    description: 'Rundschreiben zur Ausgestaltung des Risikomanagements',
    icon: AccountBalance,
    status: 'active',
    lastUpdate: '20.03.2024',
    version: '2023.2',
    size: '1.8 MB',
    pages: 98,
    sections: ['AT 4 - Risikomanagement', 'BTO - Aufbauorganisation', 'BTR - Risikoarten'],
    tags: ['Risikomanagement', 'Compliance', 'Organisation']
  },
  {
    id: 'crr',
    name: 'CRR',
    fullName: 'Capital Requirements Regulation',
    description: 'EU-Verordnung über Aufsichtsanforderungen an Kreditinstitute',
    icon: LibraryBooks,
    status: 'updating',
    lastUpdate: '01.01.2024',
    version: '2024.0',
    size: '5.1 MB',
    pages: 488,
    sections: ['Eigenmittelanforderungen', 'Kreditrisiko', 'Marktrisiko', 'Liquidität'],
    tags: ['EU-Verordnung', 'Basel III', 'Eigenmittel']
  }
]

export default function DocumentsPage() {
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDocs, setSelectedDocs] = useState<string[]>(['kwg', 'marisk'])
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)

  const filteredDocs = DOCUMENTS.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleDocToggle = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const handleViewDetails = (doc: Document) => {
    setSelectedDoc(doc)
    setDetailsOpen(true)
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Regulatorische Dokumente
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Wählen Sie die Dokumente aus, die Sie für Ihre Compliance-Anfragen verwenden möchten
        </Typography>
      </Box>

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Dokumente durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              )
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ minWidth: 120 }}
          >
            Filter
          </Button>
        </Stack>
      </Paper>

      {/* Stats Overview */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">{selectedDocs.length}</Typography>
            <Typography variant="body2" color="text.secondary">
              Aktive Dokumente
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Storage color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">9.3 MB</Typography>
            <Typography variant="body2" color="text.secondary">
              Gesamtgröße
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Update color="info" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">20.03.2024</Typography>
            <Typography variant="body2" color="text.secondary">
              Letzte Aktualisierung
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ mb: 3 }}>
        <Tab label="Alle Dokumente" />
        <Tab 
          label={
            <Badge badgeContent={selectedDocs.length} color="primary">
              Ausgewählte
            </Badge>
          } 
        />
        <Tab label="Updates" />
      </Tabs>

      {/* Document Grid */}
      <Grid container spacing={3}>
        {filteredDocs.map(doc => {
          const Icon = doc.icon
          const isSelected = selectedDocs.includes(doc.id)
          
          return (
            <Grid item xs={12} md={6} lg={4} key={doc.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: 2,
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  position: 'relative',
                  transition: 'all 0.2s',
                  '&:hover': {
                    borderColor: 'primary.main',
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
              >
                {doc.status === 'updating' && (
                  <LinearProgress 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0 
                    }} 
                  />
                )}
                
                <CardContent>
                  <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
                    <Icon 
                      sx={{ 
                        fontSize: 40, 
                        color: isSelected ? 'primary.main' : 'action.main' 
                      }} 
                    />
                    <Box flex={1}>
                      <Typography variant="h6" gutterBottom>
                        {doc.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {doc.fullName}
                      </Typography>
                    </Box>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleDocToggle(doc.id)}
                      color="primary"
                    />
                  </Box>
                  
                  <Typography variant="body2" paragraph>
                    {doc.description}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                    {doc.tags.slice(0, 3).map(tag => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack spacing={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        Version {doc.version} • {doc.pages} Seiten
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Aktualisiert: {doc.lastUpdate}
                      </Typography>
                    </Stack>
                    
                    {doc.status === 'updating' && (
                      <Chip 
                        label="Wird aktualisiert" 
                        size="small" 
                        color="warning"
                        icon={<Schedule />}
                      />
                    )}
                  </Box>
                </CardContent>
                
                <CardActions>
                  <Button 
                    size="small" 
                    startIcon={<Visibility />}
                    onClick={() => handleViewDetails(doc)}
                  >
                    Details
                  </Button>
                  <Button 
                    size="small" 
                    startIcon={<Download />}
                    disabled={doc.status === 'updating'}
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {/* Document Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedDoc && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                {React.createElement(selectedDoc.icon, { sx: { fontSize: 32 } })}
                <Box>
                  <Typography variant="h6">{selectedDoc.fullName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedDoc.name} • Version {selectedDoc.version}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Dokumentinformationen
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><Description /></ListItemIcon>
                      <ListItemText 
                        primary="Seiten" 
                        secondary={selectedDoc.pages} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Storage /></ListItemIcon>
                      <ListItemText 
                        primary="Größe" 
                        secondary={selectedDoc.size} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><Update /></ListItemIcon>
                      <ListItemText 
                        primary="Letzte Aktualisierung" 
                        secondary={selectedDoc.lastUpdate} 
                      />
                    </ListItem>
                  </List>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Hauptabschnitte
                  </Typography>
                  <List dense>
                    {selectedDoc.sections.map(section => (
                      <ListItem key={section}>
                        <ListItemText primary={section} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {selectedDoc.tags.map(tag => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setDetailsOpen(false)}>
                Schließen
              </Button>
              <Button 
                variant="contained" 
                startIcon={<Download />}
                disabled={selectedDoc.status === 'updating'}
              >
                Dokument herunterladen
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}