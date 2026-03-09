import { keyframes } from '@emotion/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

function TridentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, marginRight: 12 }}>
      <rect x="11" y="2" width="2" height="9" />
      <rect x="6"  y="4" width="2" height="6" />
      <rect x="16" y="4" width="2" height="6" />
      <rect x="6"  y="9" width="12" height="1.5" />
      <rect x="11" y="11" width="2" height="11" />
    </svg>
  )
}

const NAV_LINKS = ['Books', 'Art', 'Screenplays', 'About']

type Page = 'home' | 'tridents-keep' | 'about' | 'scripts' | 'art'

function Header({ onNav }: { onNav: (page: Page) => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNav = (page: Page) => {
    setDrawerOpen(false)
    onNav(page)
  }

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '0.05em', cursor: 'pointer' }}
            onClick={() => onNav('home')}
          >
            L. A. Woodley
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="navigation menu"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }} role="presentation">
          <List>
            {NAV_LINKS.map((text) =>
              text === 'Books' ? (
                <Box key={text}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                  <List disablePadding>
                    <ListItem disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNav('tridents-keep')}>
                        <TridentIcon />
                        <ListItemText primary="Trident's Keep" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              ) : text === 'Art' ? (
                <Box key={text}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => setDrawerOpen(false)}>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                  <List disablePadding>
                    <ListItem disablePadding>
                      <ListItemButton
                        sx={{ pl: 4 }}
                        component="a"
                        href="https://www.tiktok.com/@nrpligns.official"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setDrawerOpen(false)}
                      >
                        <Box
                          component="img"
                          src="nrplignThumb.jpeg"
                          alt=""
                          sx={{ width: 24, height: 24, borderRadius: '50%', mr: 1.5, flexShrink: 0, objectFit: 'cover' }}
                        />
                        <ListItemText primary="Nrplign Videos" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              ) : (
                <ListItem key={text} disablePadding>
                  <ListItemButton onClick={() => text === 'About' ? handleNav('about') : text === 'Screenplays' ? handleNav('scripts') : text === 'Art' ? handleNav('art') : setDrawerOpen(false)}>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

const WAVE_BG = 'rgb(171, 175, 182)'

const waveShift = keyframes`
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(42px); }
`

// Different durations and phase offsets so rows never move in sync
const WAVE_ANIM = [
  { duration: '8s',  delay: '0s' },
  { duration: '11s', delay: '-4s' },
  { duration: '7s',  delay: '-2s' },
  { duration: '10s', delay: '-6s' },
  { duration: '9s',  delay: '-1.5s' },
]

function MainContent({ onNav }: { onNav: (page: Page) => void }) {
  const waveRows = [0, 100, 200, 300, 400]

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        position: 'relative',
        overflowX: 'hidden',
        overflowY: 'auto',
        background: `linear-gradient(to bottom, #3c5568 50%, ${WAVE_BG} 50%)`,
      }}
    >
      {/* Wave background layers */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* White overlay to fade waves */}
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.6)', zIndex: 6 }} />
        {waveRows.map((bottom, i) => {
          const t = i / (waveRows.length - 1)
          const brightness = 1.15 - t * 0.36
          return (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                left: -84,
                right: -84,
                bottom: `${bottom}px`,
                height: '200px',
                backgroundImage: 'url(wave-outline.png), url(wave.png)',
                backgroundRepeat: 'repeat-x',
                backgroundSize: '840px 200px',
                backgroundPosition: '0 bottom',
                maskImage: 'url(wave.png)',
                WebkitMaskImage: 'url(wave.png)',
                maskRepeat: 'repeat-x',
                WebkitMaskRepeat: 'repeat-x',
                maskSize: '840px 200px',
                maskPosition: '0 bottom',
                WebkitMaskPosition: '0 bottom',
                filter: `brightness(${brightness})`,
                animation: `${waveShift} ${WAVE_ANIM[i].duration} ease-in-out ${WAVE_ANIM[i].delay} infinite`,
                zIndex: waveRows.length - i,
              }}
            />
          )
        })}
      </Box>

      <Box sx={{ position: 'absolute', zIndex: 10, top: '10%', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Typography sx={{ position: 'absolute', top: '0.08em', left: '0.08em', fontSize: '9vw', fontWeight: 600, color: 'rgb(209, 116, 30)', textAlign: 'center', whiteSpace: 'nowrap', userSelect: 'none' }}>
            Louis A. Woodley
          </Typography>
          <Typography sx={{ position: 'relative', fontSize: '9vw', fontWeight: 600, color: 'rgb(238, 187, 39)', textAlign: 'center', whiteSpace: 'nowrap' }}>
            Louis A. Woodley
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '1.5rem', color: 'rgb(130, 78, 24)', textAlign: 'center', maxWidth: '75%' }}>
          Louis Woodley is a self-published author, screenwriting, and artist studying Writing for Screen and Television at USC's School of Cinematic Arts. Check out work samples below!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
        {[
          { label: 'Books',   onClick: () => onNav('tridents-keep') },
          { label: 'Art',     onClick: () => onNav('art') },
          { label: 'Screenplays', onClick: () => onNav('scripts') },
        ].map(({ label, onClick }) => (
          <Button
            key={label}
            variant="outlined"
            onClick={onClick}
            sx={{
              color: 'rgb(238, 187, 39)',
              borderColor: 'rgb(238, 187, 39)',
              backgroundColor: 'rgb(51, 82, 133)',
              boxShadow: 'none',
              textTransform: 'none',
              fontSize: '1.5rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              fontFamily: 'inherit',
              px: 5,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgb(38, 61, 100)',
                borderColor: 'rgb(238, 187, 39)',
                boxShadow: 'none',
              },
            }}
          >
            {label}
          </Button>
        ))}
        </Box>
      </Box>

    </Box>
  )
}

type PosterInfo = { src: string; text: string }

function PosterModal({ poster, onClose }: { poster: PosterInfo | null; onClose: () => void }) {
  return (
    <Modal open={!!poster} onClose={onClose}>
      <Box
        onClick={onClose}
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.85)',
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={poster?.src}
            onClick={onClose}
            sx={{
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              borderRadius: 2,
              display: 'block',
              cursor: 'pointer',
            }}
          />
          {poster?.text && (
            <Box
              sx={{
                mt: 2,
                px: 2,
                py: 1,
                bgcolor: 'rgba(0,0,0,0.6)',
                borderRadius: 1,
                maxWidth: 600,
              }}
            >
              <Typography variant="body2" color="white" sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
                {poster.text}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  )
}

function TridentsKeepPage({ onBack }: { onBack: () => void }) {
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [expandedPoster, setExpandedPoster] = useState<PosterInfo | null>(null)

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    const files = ['Bones', 'Richard', 'Camila', 'Fred', 'Korbalg', 'Piper', 'Riyah', 'Smashfist']
    files.forEach((name) => {
      fetch(`${base}${name}.txt`)
        .then((r) => r.text())
        .then((t) => setTexts((prev) => ({ ...prev, [name]: t.trim() })))
    })
  }, [])

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 4 }}>
          Back
        </Button>

        {/* Bordered table layout */}
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>

          {/* Title row */}
          <Box sx={{ p: 2, textAlign: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h4" component="h1" fontWeight={700}>
              Trident's Keep
            </Typography>
          </Box>

          {/* Two-column row */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'stretch' }}>

            {/* Left: thumbnail */}
            <Box sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              borderRight: { md: '1px solid' },
              borderBottom: { xs: '1px solid', md: 'none' },
              borderColor: 'divider',
              flexShrink: 0,
            }}>
              <Box
                component="img"
                src="tridents-keep.jpg"
                alt="Trident's Keep book cover"
                sx={{ width: 160, borderRadius: 1, boxShadow: 3 }}
              />
            </Box>

            {/* Right: content */}
            <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <Box id="section-Overview">
                <Typography variant="body1">
                  Trident's Keep is a fantasy adventure following a group of people on a quest for a super-powered trident.
                </Typography>
              </Box>
              {[
                { id: 'Bones',     src: 'Bones_Poster.jpeg',     textKey: 'Bones' },
                { id: 'Richard',   src: 'Richard_Poster.jpeg',   textKey: 'Richard' },
                { id: 'Camille',   src: 'Camila_Poster.jpeg',    textKey: 'Camila' },
                { id: 'Fred',      src: 'Fred_Poster.jpeg',      textKey: 'Fred' },
                { id: 'Korbalg',   src: 'Korbalg_Poster.jpeg',   textKey: 'Korbalg' },
                { id: 'Piper',     src: 'Piper_Poster.jpeg',     textKey: 'Piper' },
                { id: 'Riyah',     src: 'Riyah_Poster.jpeg',     textKey: 'Riyah' },
                { id: 'Smashfist', src: 'Smashfist_Poster.jpeg', textKey: 'Smashfist' },
              ].map(({ id, src, textKey }) => (
                <Box key={id} id={`section-${id}`}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box
                      component="img"
                      src={src}
                      alt={id}
                      onClick={() => setExpandedPoster({ src, text: texts[textKey] ?? '' })}
                      sx={{ width: 120, borderRadius: 1, flexShrink: 0, cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                    />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{texts[textKey]}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>

          </Box>
        </Box>
      </Container>
      <PosterModal poster={expandedPoster} onClose={() => setExpandedPoster(null)} />
    </Box>
  )
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 4 }}>
          Back
        </Button>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'flex-start' }}>
          <Box
            component="img"
            src="LouisWoodley.jpeg"
            alt="L. A. Woodley"
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 280 },
              borderRadius: 2,
              boxShadow: 6,
              flexShrink: 0,
            }}
          />
          <Box>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          About
        </Typography>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
        <Typography variant="body1" paragraph>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Typography>
        <Typography variant="body1" paragraph>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
          egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
          Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
        </Typography>
        <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Box
            component="a"
            href="https://www.instagram.com/louis_woodley_06"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 1,
              borderRadius: 2,
              textDecoration: 'none',
              color: 'white',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </Box>
        </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

function ArtPage({ onBack }: { onBack: () => void }) {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 4 }}>
          Back
        </Button>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Art
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Coming soon.
        </Typography>
      </Container>
    </Box>
  )
}

function ScriptsPage({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://substack.com/embedjs/embed.js'
    script.async = true
    script.charset = 'utf-8'
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8, bgcolor: 'rgb(239, 218, 134)' }}>
      <Container maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 4 }}>
          Back
        </Button>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700} sx={{ color: 'rgb(205, 79, 65)' }}>
          Screenplays
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div className="substack-post-embed">
            <p lang="en">Roses From My Father by Robert Woodley</p>
            <p>Inez Woodley, 1970</p>
            <a data-post-link href="https://woodleyinez.substack.com/p/roses-from-my-father">Read on Substack</a>
          </div>
        </Box>
      </Container>
    </Box>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <Box component="footer" sx={{ py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary" align="center">
        &copy; {year} Louis Alexander Woodley. All rights reserved.
      </Typography>
    </Box>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>('home')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onNav={setPage} />
      {page === 'home' && <MainContent onNav={setPage} />}
      {page === 'tridents-keep' && <TridentsKeepPage onBack={() => setPage('home')} />}
      {page === 'about' && <AboutPage onBack={() => setPage('home')} />}
      {page === 'scripts' && <ScriptsPage onBack={() => setPage('home')} />}
      {page === 'art' && <ArtPage onBack={() => setPage('home')} />}
      <Footer />
    </Box>
  )
}
