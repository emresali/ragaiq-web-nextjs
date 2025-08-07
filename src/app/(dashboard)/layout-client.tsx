// src/app/(dashboard)/layout-client.tsx
"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Chip
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Chat,
  Description,
  People,
  Settings,
  Logout,
  Person
} from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const drawerWidth = 240

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Dashboard },
  { name: 'Chat', href: '/chat', icon: Chat },
  { name: 'Dokumente', href: '/documents', icon: Description },
  { name: 'Team', href: '/team', icon: People },
  { name: 'Einstellungen', href: '/settings', icon: Settings },
]

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const pathname = usePathname()
  const { data: session } = useSession()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h5" fontWeight="bold">
          Rag<Box component="span" color="primary.main">AI-Q</Box>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isActive}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    }
                  }
                }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      
      {/* Organization Info */}
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%', p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="caption" color="text.secondary">
          Organisation
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {session?.user?.organizationName || 'Demo Corp'}
        </Typography>
        <Chip 
          label={session?.user?.role || 'USER'} 
          size="small" 
          sx={{ mt: 1 }}
          color="primary"
          variant="outlined"
        />
      </Box>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ flexGrow: 1 }} />
          
          {/* User Menu */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">
              {session?.user?.name || session?.user?.email}
            </Typography>
            <IconButton onClick={handleProfileClick} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {session?.user?.name?.[0] || session?.user?.email?.[0] || 'U'}
              </Avatar>
            </IconButton>
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              Profil
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Einstellungen
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Abmelden
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth 
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          backgroundColor: 'background.default'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}