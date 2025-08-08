// src/app/(dashboard)/chat/page.tsx
"use client"

import { useState, useRef, useEffect } from 'react'
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Stack,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Drawer,
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material'
import {
  Send,
  Add,
  Delete,
  MenuBook,
  Chat as ChatIcon,
  MoreVert,
  AttachFile,
  Settings,
  LibraryBooks,
  Gavel,
  AccountBalance
} from '@mui/icons-material'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  sources?: Array<{
    document: string
    page: number
    text: string
  }>
}

interface Chat {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  messages: Message[]
}

const AVAILABLE_DOCUMENTS = [
  { id: 'kwg', name: 'KWG', icon: Gavel, description: 'Kreditwesengesetz' },
  { id: 'marisk', name: 'MaRisk', icon: AccountBalance, description: 'Mindestanforderungen an das Risikomanagement' },
  { id: 'crr', name: 'CRR', icon: LibraryBooks, description: 'Capital Requirements Regulation' },
]

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'MaRisk Anforderungen',
      lastMessage: 'Die Mindest-PD beträgt...',
      timestamp: new Date(),
      messages: []
    }
  ])
  const [activeChat, setActiveChat] = useState<string>('1')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(['kwg', 'marisk', 'crr'])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats])

  const handleSendMessage = async () => {
    if (!message.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    }

    // Add user message
    setChats(prev => prev.map(chat => 
      chat.id === activeChat 
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ))
    setMessage('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Basierend auf den ausgewählten Dokumenten (KWG, MaRisk, CRR) kann ich Ihnen folgende Informationen geben...',
        timestamp: new Date(),
        sources: [
          {
            document: 'MaRisk AT 4.3.2',
            page: 42,
            text: 'Die Risikosteuerungs- und -controllingprozesse...'
          }
        ]
      }

      setChats(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { 
              ...chat, 
              messages: [...chat.messages, assistantMessage],
              lastMessage: assistantMessage.content.substring(0, 50) + '...'
            }
          : chat
      ))
      setLoading(false)
    }, 1500)
  }

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Neuer Chat',
      lastMessage: '',
      timestamp: new Date(),
      messages: []
    }
    setChats(prev => [...prev, newChat])
    setActiveChat(newChat.id)
  }

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const currentChat = chats.find(chat => chat.id === activeChat)

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Sidebar with chat history */}
      <Paper 
        sx={{ 
          width: 300, 
          display: { xs: 'none', md: 'block' },
          borderRadius: 0,
          borderRight: 1,
          borderColor: 'divider'
        }}
      >
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<Add />}
            onClick={handleNewChat}
            sx={{ mb: 2 }}
          >
            Neuer Chat
          </Button>
          
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Ausgewählte Dokumente
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 2 }}>
            {selectedDocuments.map(docId => {
              const doc = AVAILABLE_DOCUMENTS.find(d => d.id === docId)
              return doc ? (
                <Chip
                  key={docId}
                  label={doc.name}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ) : null
            })}
            <Chip
              label={<Settings sx={{ fontSize: 16 }} />}
              size="small"
              onClick={() => setDrawerOpen(true)}
              sx={{ cursor: 'pointer' }}
            />
          </Stack>

          <Divider sx={{ mb: 2 }} />

          <List sx={{ mx: -2 }}>
            {chats.map(chat => (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton
                  selected={chat.id === activeChat}
                  onClick={() => setActiveChat(chat.id)}
                >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={chat.title}
                    secondary={chat.lastMessage}
                    secondaryTypographyProps={{
                      noWrap: true,
                      sx: { fontSize: '0.75rem' }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

      {/* Main chat area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Chat header */}
        <Paper 
          elevation={0} 
          sx={{ 
            px: 3, 
            py: 2, 
            borderBottom: 1, 
            borderColor: 'divider',
            borderRadius: 0
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">
              {currentChat?.title || 'Chat'}
            </Typography>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Paper>

        {/* Messages area */}
        <Box 
          ref={chatContainerRef}
          sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 3,
            backgroundColor: 'background.default'
          }}
        >
          {currentChat?.messages.length === 0 ? (
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                height: '100%',
                color: 'text.secondary'
              }}
            >
              <MenuBook sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="h6" gutterBottom>
                Stellen Sie Ihre Frage zu den Regularien
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ich helfe Ihnen bei Fragen zu KWG, MaRisk und CRR
              </Typography>
            </Box>
          ) : (
            <Stack spacing={3}>
              {currentChat?.messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      backgroundColor: msg.role === 'user' ? 'primary.main' : 'grey.100',
                      color: msg.role === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      p: 2
                    }}
                  >
                    <Typography variant="body1">
                      {msg.content}
                    </Typography>
                    
                    {msg.sources && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>
                          Quellen:
                        </Typography>
                        <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                          {msg.sources.map((source, idx) => (
                            <Chip
                              key={idx}
                              label={`${source.document} - S. ${source.page}`}
                              size="small"
                              variant="outlined"
                              sx={{ 
                                borderColor: 'rgba(255,255,255,0.3)',
                                color: msg.role === 'user' ? 'inherit' : 'text.secondary'
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
              
              {loading && (
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    AI
                  </Avatar>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <CircularProgress size={8} />
                    <CircularProgress size={8} sx={{ animationDelay: '0.2s' }} />
                    <CircularProgress size={8} sx={{ animationDelay: '0.4s' }} />
                  </Box>
                </Box>
              )}
            </Stack>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input area */}
        <Paper 
          elevation={3} 
          sx={{ p: 2, borderRadius: 0 }}
        >
          <Box display="flex" gap={1} alignItems="flex-end">
            <IconButton>
              <AttachFile />
            </IconButton>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder="Stellen Sie Ihre Frage..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              disabled={loading}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper'
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!message.trim() || loading}
            >
              <Send />
            </IconButton>
          </Box>
        </Paper>
      </Box>

      {/* Document selection drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Dokumente auswählen
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Wählen Sie die Dokumente aus, die für Ihre Anfragen durchsucht werden sollen.
          </Typography>
          
          <Stack spacing={2}>
            {AVAILABLE_DOCUMENTS.map(doc => {
              const Icon = doc.icon
              const isSelected = selectedDocuments.includes(doc.id)
              
              return (
                <Paper
                  key={doc.id}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: 2,
                    borderColor: isSelected ? 'primary.main' : 'divider',
                    backgroundColor: isSelected ? 'primary.light' : 'background.paper',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      backgroundColor: isSelected ? 'primary.light' : 'grey.50'
                    }
                  }}
                  onClick={() => handleDocumentToggle(doc.id)}
                >
                  <Box display="flex" alignItems="center" gap={2}>
                    <Icon color={isSelected ? 'primary' : 'action'} />
                    <Box flex={1}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {doc.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {doc.description}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              )
            })}
          </Stack>
          
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={() => setDrawerOpen(false)}
          >
            Fertig
          </Button>
        </Box>
      </Drawer>

      {/* Chat menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          Chat umbenennen
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>
          Chat exportieren
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => setAnchorEl(null)} sx={{ color: 'error.main' }}>
          Chat löschen
        </MenuItem>
      </Menu>
    </Box>
  )
}