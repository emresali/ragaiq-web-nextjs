// src/app/(auth)/login/page.tsx
"use client"

import { useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { 
  Box, 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Divider,
  Stack,
  CircularProgress,
  Link as MuiLink,
  styled
} from '@mui/material'
import { 
  Lock, 
  Business, 
  Security, 
  MenuBook,
  Bolt,
  Error
} from '@mui/icons-material'
import Link from "next/link"
import { authenticate } from "./actions"

// Styled Components
const GlassCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(229, 231, 235, 0.5)',
  borderRadius: theme.spacing(1.5),
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}))

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  '&:hover': {
    transform: 'translateX(8px)',
    '& .feature-icon': {
      transform: 'scale(1.1)',
    }
  }
}))

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  transition: 'all 0.3s ease',
  background: 'linear-gradient(135deg, rgba(92, 225, 230, 0.3) 0%, rgba(92, 225, 230, 0.1) 100%)',
  border: '1px solid rgba(92, 225, 230, 0.2)',
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(249, 250, 251, 0.8)',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
    }
  },
  '& .MuiInputBase-input': {
    padding: '10px 14px',
  }
}))

const DemoBox = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2.5),
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(92, 225, 230, 0.2)',
  borderRadius: theme.spacing(1),
  position: 'relative',
  overflow: 'hidden',
  minHeight: 200, // Fixe Mindesthöhe
}))

function LoginButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      size="medium"
      disabled={pending}
      sx={{ 
        py: 1.25,
        background: '#5ce1e6',
        color: 'white',
        fontSize: '0.875rem',
        fontWeight: 500,
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '&:hover': {
          background: 'rgba(92, 225, 230, 0.9)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      {pending ? (
        <>
          <CircularProgress size={16} sx={{ mr: 1, color: 'white' }} />
          <span style={{ color: 'white' }}>Wird überprüft...</span>
        </>
      ) : (
        <span style={{ color: 'white' }}>Anmelden</span>
      )}
    </Button>
  )
}

export default function LoginPage() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined)
  const [ssoLoading, setSsoLoading] = useState(false)

  const handleSSO = async (provider: string) => {
    setSsoLoading(true)
    window.location.href = `/api/auth/signin/${provider}`
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Side - Login Form */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern - sehr subtil */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #f9fafb 0%, #f3f4f6 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Subtle gradient circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -200,
            left: -200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(92, 225, 230, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -200,
            right: -200,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(92, 225, 230, 0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Animated Background Circles */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 384,
            height: 384,
            borderRadius: '50%',
            background: 'rgba(92, 225, 230, 0.1)',
            filter: 'blur(48px)',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 384,
            height: 384,
            borderRadius: '50%',
            background: 'rgba(92, 225, 230, 0.1)',
            filter: 'blur(48px)',
            transform: 'translate(50%, 50%)',
          }}
        />
        
        <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Logo - außerhalb der Box */}
          <Box textAlign="center" mb={3}>
            <Typography variant="h4" fontWeight="bold">
              Rag<Box component="span" sx={{ color: '#5ce1e6' }}>AI-Q</Box>
            </Typography>
            <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
              Enterprise Regulatory Intelligence Platform
            </Typography>
          </Box>

          <GlassCard elevation={1}>
            {/* Welcome Text */}
            <Typography variant="h6" align="center" fontWeight={600} mb={0.5}>
              Willkommen zurück
            </Typography>
            <Typography variant="body2" align="center" color="text.secondary" mb={3}>
              Melden Sie sich in Ihrem Unternehmenskonto an
            </Typography>

            {/* Security Badge - größer und prominenter */}
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 1.5,
                px: 2,
                mb: 3,
                backgroundColor: 'rgba(92, 225, 230, 0.1)',
                border: '1px solid rgba(92, 225, 230, 0.2)',
                borderRadius: 1,
              }}
            >
              <Security sx={{ fontSize: 20, color: '#5ce1e6' }} />
              <Typography variant="body2" sx={{ color: '#1e40af', fontWeight: 500 }}>
                Sichere Enterprise-Anmeldung
              </Typography>
            </Box>

            {errorMessage && (
              <Alert 
                severity="error" 
                icon={<Error />}
                sx={{ mb: 3 }}
              >
                {errorMessage}
              </Alert>
            )}

            {/* Login Form */}
            <form action={dispatch}>
              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="body2" fontWeight={500} mb={0.5} color="text.secondary">
                    Geschäftliche E-Mail-Adresse
                  </Typography>
                  <StyledTextField
                    name="email"
                    type="email"
                    placeholder="name@unternehmen.de"
                    required
                    autoComplete="email"
                    fullWidth
                  />
                </Box>
                
                <Box>
                  <Typography variant="body2" fontWeight={500} mb={0.5} color="text.secondary">
                    Passwort
                  </Typography>
                  <StyledTextField
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    fullWidth
                  />
                </Box>

                <Box pt={1}>
                  <LoginButton />
                </Box>
              </Stack>
            </form>

            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" color="text.secondary">oder</Typography>
            </Divider>

            {/* SSO Options */}
            <Stack spacing={1.5}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Lock sx={{ fontSize: 18 }} />}
                onClick={() => handleSSO("saml")}
                disabled={ssoLoading}
                size="small"
                sx={{
                  borderColor: 'rgba(0, 0, 0, 0.12)',
                  color: 'text.primary',
                  py: 1,
                  fontSize: '0.875rem',
                  '&:hover': {
                    borderColor: '#5ce1e6',
                    backgroundColor: 'rgba(92, 225, 230, 0.04)',
                  }
                }}
              >
                Single Sign-On (SAML)
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Business sx={{ fontSize: 18 }} />}
                onClick={() => handleSSO("azure")}
                disabled={ssoLoading}
                size="small"
                sx={{ 
                  borderColor: '#0078d4',
                  color: '#0078d4',
                  py: 1,
                  fontSize: '0.875rem',
                  '&:hover': {
                    borderColor: '#106ebe',
                    backgroundColor: 'rgba(0, 120, 212, 0.04)',
                  }
                }}
              >
                Microsoft Azure AD
              </Button>
            </Stack>

            {/* Help Text */}
            <Typography align="center" variant="caption" sx={{ mt: 2, display: 'block', color: 'text.secondary' }}>
              Noch kein Konto?{" "}
              <MuiLink 
                component={Link} 
                href="/contact" 
                underline="hover"
                sx={{ color: '#5ce1e6', fontWeight: 500 }}
              >
                Kontaktieren Sie den Vertrieb
              </MuiLink>
            </Typography>
          </GlassCard>

          {/* Legal Links */}
          <Stack 
            direction="row" 
            spacing={1.5} 
            justifyContent="center"
            sx={{ mt: 2 }}
            flexWrap="wrap"
          >
            <MuiLink 
              component={Link} 
              href="/datenschutz" 
              variant="caption" 
              underline="hover"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              Datenschutzerklärung
            </MuiLink>
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }} color="text.secondary">•</Typography>
            <MuiLink 
              component={Link} 
              href="/impressum" 
              variant="caption" 
              underline="hover"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              Impressum
            </MuiLink>
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }} color="text.secondary">•</Typography>
            <MuiLink 
              component={Link} 
              href="/agb" 
              variant="caption" 
              underline="hover"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              AGB
            </MuiLink>
            <Typography variant="caption" sx={{ fontSize: '0.75rem' }} color="text.secondary">•</Typography>
            <MuiLink 
              component={Link} 
              href="/sicherheit" 
              variant="caption" 
              underline="hover"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              Sicherheit
            </MuiLink>
          </Stack>
        </Container>
      </Box>

      {/* Right Side - Product Info */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a2332 0%, #0f1419 100%)',
          color: 'white',
          px: 6,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '20%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(92, 225, 230, 0.2)',
            filter: 'blur(60px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            }
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '20%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(59, 130, 246, 0.15)',
            filter: 'blur(60px)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            animationDelay: '1s',
          }}
        />

        <Box maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h4" 
            fontWeight="bold" 
            mb={4}
            sx={{
              fontSize: { lg: '2rem', xl: '2.5rem' },
              lineHeight: 1.2,
            }}
          >
            <Box component="span" sx={{ 
              background: 'linear-gradient(to right, #5ce1e6, #3b82f6, #5ce1e6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'gradient 3s ease infinite',
              '@keyframes gradient': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              }
            }}>
              Intelligente Compliance
            </Box>
            <br />
            <Box component="span" sx={{ color: 'white' }}>
              auf Enterprise-Niveau
            </Box>
          </Typography>

          <Stack spacing={3}>
            {/* Feature 1 */}
            <FeatureBox>
              <IconWrapper className="feature-icon">
                <MenuBook sx={{ color: '#5ce1e6', fontSize: 20 }} />
              </IconWrapper>
              <Box>
                <Typography variant="body1" mb={0.5} fontWeight={600}>
                  KWG, MaRisk & CRR Expertise
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5
                }}>
                  Direkter Zugriff auf regulatorische Dokumente mit<br />
                  KI-gestützter Analyse
                </Typography>
              </Box>
            </FeatureBox>

            {/* Feature 2 */}
            <FeatureBox>
              <IconWrapper className="feature-icon">
                <Security sx={{ color: '#5ce1e6', fontSize: 20 }} />
              </IconWrapper>
              <Box>
                <Typography variant="body1" mb={0.5} fontWeight={600}>
                  Höchste Sicherheitsstandards
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5
                }}>
                  ISO 27001 zertifiziert, DSGVO-konform, On-Premise<br />
                  verfügbar
                </Typography>
              </Box>
            </FeatureBox>

            {/* Feature 3 */}
            <FeatureBox>
              <IconWrapper className="feature-icon">
                <Bolt sx={{ color: '#5ce1e6', fontSize: 20 }} />
              </IconWrapper>
              <Box>
                <Typography variant="body1" mb={0.5} fontWeight={600}>
                  Sofortige Antworten
                </Typography>
                <Typography variant="body2" sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                  lineHeight: 1.5
                }}>
                  Präzise Antworten mit Quellenangaben in Sekunden
                </Typography>
              </Box>
            </FeatureBox>
          </Stack>

          {/* Demo Preview - Animated Chat */}
          <DemoBox elevation={0}>
            <Stack spacing={2}>
              {/* User Message - appears instantly */}
              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography sx={{ color: '#5ce1e6', fontSize: '1rem' }}>→</Typography>
                  <Typography sx={{ color: '#5ce1e6', fontSize: '0.875rem', fontWeight: 500 }}>
                    Frage:
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    backgroundColor: 'rgba(92, 225, 230, 0.1)',
                    borderRadius: '0 8px 8px 8px',
                    p: 1.5,
                    display: 'inline-block',
                    border: '1px solid rgba(92, 225, 230, 0.2)',
                    maxWidth: '90%',
                  }}
                >
                  <Typography sx={{ 
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 400
                  }}>
                    Wie hoch ist die Mindestwahrscheinlichkeit<br />
                    eines Ausfalls nach CRR?
                  </Typography>
                </Box>
              </Box>

              {/* Typing indicator appears first */}
              <Box 
                sx={{ 
                  opacity: 0,
                  animation: 'fadeIn 0.3s ease-out 0.8s forwards',
                  '@keyframes fadeIn': {
                    to: { opacity: 1 }
                  }
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Typography sx={{ color: '#5ce1e6', fontSize: '1rem' }}>←</Typography>
                  <Typography sx={{ color: '#5ce1e6', fontSize: '0.875rem', fontWeight: 500 }}>
                    RagAI-Q
                  </Typography>
                  <Typography sx={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem', fontStyle: 'italic' }}>
                    tippt...
                  </Typography>
                </Box>
                
                {/* Typing dots */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    height: 32,
                    transition: 'opacity 0.3s ease-out',
                    opacity: 1,
                    animation: 'fadeOutTyping 0.3s ease-out 2.5s forwards',
                    '@keyframes fadeOutTyping': {
                      to: { opacity: 0, visibility: 'hidden' }
                    }
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'rgba(31, 41, 55, 0.8)',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      display: 'flex',
                      gap: 0.7,
                      alignItems: 'center',
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: '#5ce1e6',
                        animation: 'pulse 1.4s infinite ease-in-out',
                        animationDelay: '0s'
                      }} 
                    />
                    <Box 
                      sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: '#5ce1e6',
                        animation: 'pulse 1.4s infinite ease-in-out',
                        animationDelay: '0.2s'
                      }} 
                    />
                    <Box 
                      sx={{ 
                        width: 6, 
                        height: 6, 
                        borderRadius: '50%', 
                        bgcolor: '#5ce1e6',
                        animation: 'pulse 1.4s infinite ease-in-out',
                        animationDelay: '0.4s',
                        '@keyframes pulse': {
                          '0%, 80%, 100%': { 
                            transform: 'scale(0.8)',
                            opacity: 0.5
                          },
                          '40%': { 
                            transform: 'scale(1.2)',
                            opacity: 1
                          }
                        }
                      }} 
                    />
                  </Box>
                </Box>
              </Box>

              {/* AI Response - appears after typing dots */}
              <Box 
                sx={{ 
                  position: 'relative',
                  opacity: 0,
                  animation: 'slideIn 0.4s ease-out 2.8s forwards',
                  '@keyframes slideIn': {
                    from: { opacity: 0, transform: 'translateY(10px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                <Box 
                  sx={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '0 8px 8px 8px',
                    p: 1.5,
                    display: 'inline-block',
                    border: '1px solid rgba(92, 225, 230, 0.15)',
                    maxWidth: '90%',
                  }}
                >
                  <Typography 
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      fontSize: '0.875rem',
                      lineHeight: 1.6
                    }}
                  >
                    Die Mindest-PD (Probability of Default) liegt bei<br />
                    0,03% gemäß Art. 163 CRR für Unternehmen...<br />
                    <Box component="span" sx={{ color: '#5ce1e6', fontSize: '0.75rem' }}>
                      [3 weitere Quellen analysieren]
                    </Box>
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </DemoBox>
        </Box>
      </Box>
    </Box>
  )
}