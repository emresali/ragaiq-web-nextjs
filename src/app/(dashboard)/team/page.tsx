// src/app/(dashboard)/team/page.tsx
"use client"

import { useState } from 'react'
import {
  Box,
  Grid2 as Grid,  // Grid2 verwenden
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Alert,
  LinearProgress,
  Tabs,
  Tab,
  Badge,
  AvatarGroup,
  Tooltip
} from '@mui/material'
import {
  Search,
  Add,
  MoreVert,
  Edit,
  Delete,
  PersonAdd,
  Mail,
  Shield,
  CheckCircle,
  Warning,
  Groups,
  AdminPanelSettings,
  Person,
  Business,
  TrendingUp,
  Settings
} from '@mui/icons-material'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  status: 'active' | 'invited' | 'inactive'
  lastActive: string
  usage: {
    daily: number
    monthly: number
  }
  avatar?: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Max Müller',
    email: 'max.mueller@demo-corp.com',
    role: 'ADMIN',
    status: 'active',
    lastActive: 'Vor 2 Stunden',
    usage: { daily: 45, monthly: 1250 },
    avatar: 'MM'
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@demo-corp.com',
    role: 'USER',
    status: 'active',
    lastActive: 'Vor 5 Minuten',
    usage: { daily: 78, monthly: 2100 }
  },
  {
    id: '3',
    name: 'Thomas Weber',
    email: 'thomas.weber@demo-corp.com',
    role: 'USER',
    status: 'invited',
    lastActive: 'Noch nicht angemeldet',
    usage: { daily: 0, monthly: 0 }
  }
]

export default function TeamPage() {
  const [members, setMembers] = useState(TEAM_MEMBERS)
  const [selectedTab, setSelectedTab] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editMember, setEditMember] = useState<TeamMember | null>(null)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'USER'>('USER')

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const activeMembers = filteredMembers.filter(m => m.status === 'active')
  const invitedMembers = filteredMembers.filter(m => m.status === 'invited')

  const handleInvite = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'invited',
      lastActive: 'Noch nicht angemeldet',
      usage: { daily: 0, monthly: 0 }
    }
    setMembers([...members, newMember])
    setInviteOpen(false)
    setInviteEmail('')
    setInviteRole('USER')
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, member: TeamMember) => {
    setAnchorEl(event.currentTarget)
    setSelectedMember(member)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedMember(null)
  }

  const handleDeleteMember = () => {
    if (selectedMember) {
      setMembers(members.filter(m => m.id !== selectedMember.id))
    }
    handleMenuClose()
  }

  const organizationStats = {
    totalSeats: 50,
    usedSeats: activeMembers.length,
    monthlyUsage: members.reduce((acc, m) => acc + m.usage.monthly, 0),
    monthlyLimit: 10000
  }

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Team-Verwaltung
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Verwalten Sie Ihre Teammitglieder und deren Zugriffsrechte
        </Typography>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Groups color="primary" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {organizationStats.usedSeats} / {organizationStats.totalSeats}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Genutzte Plätze
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(organizationStats.usedSeats / organizationStats.totalSeats) * 100}
              sx={{ mt: 2 }}
            />
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <CheckCircle color="success" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {activeMembers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Aktive Nutzer
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <Mail color="warning" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {invitedMembers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Einladungen
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" gap={2}>
              <TrendingUp color="info" sx={{ fontSize: 40 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {organizationStats.monthlyUsage}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Anfragen / Monat
                </Typography>
              </Box>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={(organizationStats.monthlyUsage / organizationStats.monthlyLimit) * 100}
              sx={{ mt: 2 }}
              color="info"
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Team-Mitglieder suchen..."
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
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={() => setInviteOpen(true)}
            sx={{ minWidth: 180 }}
          >
            Mitglied einladen
          </Button>
        </Stack>
      </Paper>

      <Tabs value={selectedTab} onChange={(e, v) => setSelectedTab(v)} sx={{ mb: 3 }}>
        <Tab 
          label={
            <Badge badgeContent={activeMembers.length} color="success">
              Aktive Mitglieder
            </Badge>
          } 
        />
        <Tab 
          label={
            <Badge badgeContent={invitedMembers.length} color="warning">
              Einladungen
            </Badge>
          } 
        />
        <Tab label="Berechtigungen" />
      </Tabs>

      {selectedTab === 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mitglied</TableCell>
                <TableCell>Rolle</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Letzte Aktivität</TableCell>
                <TableCell>Nutzung (heute)</TableCell>
                <TableCell align="right">Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map(member => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={member.role === 'ADMIN' ? <AdminPanelSettings /> : <Person />}
                      label={member.role === 'ADMIN' ? 'Administrator' : 'Benutzer'}
                      size="small"
                      color={member.role === 'ADMIN' ? 'primary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        member.status === 'active' ? 'Aktiv' : 
                        member.status === 'invited' ? 'Eingeladen' : 
                        'Inaktiv'
                      }
                      size="small"
                      color={
                        member.status === 'active' ? 'success' : 
                        member.status === 'invited' ? 'warning' : 
                        'default'
                      }
                    />
                  </TableCell>
                  <TableCell>{member.lastActive}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LinearProgress 
                        variant="determinate" 
                        value={member.usage.daily} 
                        sx={{ width: 100 }}
                      />
                      <Typography variant="body2">
                        {member.usage.daily}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small"
                      onClick={(e) => handleMenuClick(e, member)}
                    >
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedTab === 2 && (
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Administrator-Berechtigungen
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Team-Mitglieder verwalten</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Dokumente hinzufügen/entfernen</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Nutzungsstatistiken einsehen</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Organisationseinstellungen ändern</Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Benutzer-Berechtigungen
                </Typography>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Chat-Funktion nutzen</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Dokumente durchsuchen</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckCircle color="success" />
                    <Typography variant="body2">Eigene Nutzung einsehen</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Warning color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      Keine administrativen Rechte
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          setEditMember(selectedMember)
          handleMenuClose()
        }}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Bearbeiten
        </MenuItem>
        <MenuItem onClick={() => handleMenuClose()}>
          <Mail fontSize="small" sx={{ mr: 1 }} />
          E-Mail senden
        </MenuItem>
        <MenuItem 
          onClick={handleDeleteMember}
          sx={{ color: 'error.main' }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Entfernen
        </MenuItem>
      </Menu>

      <Dialog open={inviteOpen} onClose={() => setInviteOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Team-Mitglied einladen</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="E-Mail-Adresse"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="kollege@demo-corp.com"
            />
            
            <FormControl fullWidth>
              <InputLabel>Rolle</InputLabel>
              <Select
                value={inviteRole}
                label="Rolle"
                onChange={(e: SelectChangeEvent) => setInviteRole(e.target.value as 'ADMIN' | 'USER')}
              >
                <MenuItem value="USER">
                  <Box display="flex" alignItems="center" gap={1}>
                    <Person />
                    <Box>
                      <Typography variant="body2">Benutzer</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Kann Chat nutzen und Dokumente durchsuchen
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
                <MenuItem value="ADMIN">
                  <Box display="flex" alignItems="center" gap={1}>
                    <AdminPanelSettings />
                    <Box>
                      <Typography variant="body2">Administrator</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Vollzugriff auf alle Funktionen
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
            
            <Alert severity="info">
              Der eingeladene Nutzer erhält eine E-Mail mit einem Link zur Registrierung.
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInviteOpen(false)}>Abbrechen</Button>
          <Button 
            variant="contained" 
            onClick={handleInvite}
            disabled={!inviteEmail}
          >
            Einladung senden
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}