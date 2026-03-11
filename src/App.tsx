import { keyframes } from '@emotion/react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
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
  { duration: '12s', delay: '-3s' },
  { duration: '8.5s', delay: '-5s' },
  { duration: '10.5s', delay: '-2.5s' },
]

function MainContent({ onNav }: { onNav: (page: Page) => void }) {
  const waveRows = [0, 100, 200, 300, 400, 500, 600, 700]

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
        {/* White overlay — zIndex above all wave rows */}
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(255,255,255,0.6)', zIndex: 9 }} />
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

      <Box sx={{ position: 'absolute', zIndex: 10, top: '10%', left: { xs: '5%', sm: 0 }, right: { xs: '5%', sm: 0 }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'stretch', sm: 'center' }, gap: 3 }}>
        <Box sx={{ position: 'relative', display: { xs: 'block', sm: 'inline-block' }, width: { xs: '95%', sm: 'auto' } }}>
          <Typography sx={{ position: 'absolute', top: '0.08em', left: '0.08em', width: '100%', fontSize: { xs: '10vw', sm: '9vw' }, fontWeight: 600, color: 'rgb(209, 116, 30)', textAlign: 'center', whiteSpace: { xs: 'normal', sm: 'nowrap' }, userSelect: 'none' }}>
            Louis A. Woodley
          </Typography>
          <Typography sx={{ position: 'relative', fontSize: { xs: '10vw', sm: '9vw' }, fontWeight: 600, color: 'rgb(238, 187, 39)', textAlign: 'center', whiteSpace: { xs: 'normal', sm: 'nowrap' } }}>
            Louis A. Woodley
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '1.5rem', color: 'rgb(133, 89, 33)', fontWeight: 700, textAlign: 'center', maxWidth: { xs: '100%', sm: '75%' } }}>
          Louis Woodley is a self-published author, screenwriter, and artist studying <Box component="span" sx={{ fontStyle: 'italic', color: 'rgb(133, 89, 33)' }}>Writing for Screen and Television</Box> at <Box component="span" sx={{ fontStyle: 'italic', color: 'rgb(133, 89, 33)' }}>USC's School of Cinematic Arts</Box>. Check out work samples below!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, width: { xs: '100%', sm: 'auto' } }}>
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
              width: { xs: '100%', sm: 'auto' },
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

        {/* Social chiclets */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <IconButton
          component="a"
          href="https://www.instagram.com/louis_woodley_06"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ bgcolor: 'rgba(0,0,0,0.45)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
        >
          {/* Instagram icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-1.609.073-3.033.425-4.195 1.586C1.696 2.82 1.344 4.244 1.271 5.853 1.213 7.133 1.199 7.541 1.199 12c0 4.459.014 4.867.072 6.147.073 1.609.425 3.033 1.586 4.195 1.162 1.161 2.586 1.513 4.195 1.586C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.609-.073 3.033-.425 4.195-1.586 1.161-1.162 1.513-2.586 1.586-4.195.058-1.28.072-1.688.072-6.147 0-4.459-.014-4.867-.072-6.147-.073-1.609-.425-3.033-1.586-4.195C19.98 1.621 18.556 1.269 16.947 1.196 15.667 1.138 15.259 1.124 12 1.124h.001zm0 5.838a5.038 5.038 0 1 0 0 10.076 5.038 5.038 0 0 0 0-10.076zm0 8.307a3.269 3.269 0 1 1 0-6.538 3.269 3.269 0 0 1 0 6.538zm5.23-8.507a1.177 1.177 0 1 0 0 2.354 1.177 1.177 0 0 0 0-2.354z"/>
          </svg>
        </IconButton>
        <IconButton
          component="a"
          href="mailto:louiswoodley06@gmail.com"
          sx={{ bgcolor: 'rgba(0,0,0,0.45)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
        >
          {/* Mail icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        </IconButton>
        </Box>
      </Box>

    </Box>
  )
}

type PosterInfo = { src: string; text: string; title?: string }

function PosterModal({ poster, onClose, onPrev, onNext }: {
  poster: PosterInfo | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    if (!poster) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev()
      else if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [poster, onPrev, onNext])

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
        {/* Prev arrow */}
        <IconButton
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          sx={{ position: 'fixed', left: 16, zIndex: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={poster?.src}
            onClick={onClose}
            sx={{
              maxWidth: { xs: '100%', sm: '55vw' },
              maxHeight: '85vh',
              objectFit: 'contain',
              borderRadius: 2,
              display: 'block',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
          {(poster?.title || poster?.text) && (
            <Box
              onClick={onClose}
              sx={{
                px: 2,
                py: 1,
                bgcolor: 'rgba(0,0,0,0.6)',
                borderRadius: 1,
                maxWidth: { xs: 600, sm: '30vw' },
                alignSelf: { xs: 'auto', sm: 'center' },
                cursor: 'pointer',
              }}
            >
              {poster.title && (
                <Typography variant="h6" color="white" sx={{ textAlign: 'center', fontWeight: 700, mb: 0.5 }}>
                  {poster.title}
                </Typography>
              )}
              {poster.text && (
                <Typography variant="body2" color="white" sx={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                  {poster.text}
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* Next arrow */}
        <IconButton
          onClick={(e) => { e.stopPropagation(); onNext() }}
          sx={{ position: 'fixed', right: 16, zIndex: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.4)', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Modal>
  )
}

const CHARACTERS = [
  { id: 'Bones',     src: 'TridentsKeep/characters/Bones_Poster.jpeg',     textKey: 'Bones' },
  { id: 'Richard',   src: 'TridentsKeep/characters/Richard_Poster.jpeg',   textKey: 'Richard' },
  { id: 'Camille',   src: 'TridentsKeep/characters/Camila_Poster.jpeg',    textKey: 'Camila' },
  { id: 'Fred',      src: 'TridentsKeep/characters/Fred_Poster.jpeg',      textKey: 'Fred' },
  { id: 'Korbalg',   src: 'TridentsKeep/characters/Korbalg_Poster.jpeg',   textKey: 'Korbalg' },
  { id: 'Piper',     src: 'TridentsKeep/characters/Piper_Poster.jpeg',     textKey: 'Piper' },
  { id: 'Riyah',     src: 'TridentsKeep/characters/Riyah_Poster.jpeg',     textKey: 'Riyah' },
  { id: 'Smashfist', src: 'TridentsKeep/characters/Smashfist_Poster.jpeg', textKey: 'Smashfist' },
]

const WORLD = [
  { id: 'Main',       src: 'TridentsKeep/world/Main.jpeg',       textKey: 'World_Main' },
  { id: 'Geography',  src: 'TridentsKeep/world/Geography.jpeg',  textKey: 'World_Geography' },
  { id: 'Political',  src: 'TridentsKeep/world/Political.jpeg',  textKey: 'World_Political' },
]

function TridentsKeepPage({ onBack }: { onBack: () => void }) {
  const [texts, setTexts] = useState<Record<string, string>>({})
  const [expandedList, setExpandedList] = useState<typeof CHARACTERS | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('tridents-keep-tab') ?? 'Overview')

  const expandedPoster = expandedList !== null && expandedIndex !== null
    ? { src: expandedList[expandedIndex].src, text: texts[expandedList[expandedIndex].textKey] ?? '' }
    : null
  const handlePrev = () => setExpandedIndex(i => i !== null && expandedList ? (i - 1 + expandedList.length) % expandedList.length : null)
  const handleNext = () => setExpandedIndex(i => i !== null && expandedList ? (i + 1) % expandedList.length : null)
  const openPoster = (list: typeof CHARACTERS, index: number) => { setExpandedList(list); setExpandedIndex(index) }
  const closePoster = () => { setExpandedList(null); setExpandedIndex(null) }

  const handleTabChange = (label: string) => {
    setActiveTab(label)
    localStorage.setItem('tridents-keep-tab', label)
  }

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    fetch(`${base}overview.txt`).then((r) => r.text()).then((t) => setTexts((prev) => ({ ...prev, overview: t.trim() })))
    const charFiles = ['Bones', 'Richard', 'Camila', 'Fred', 'Korbalg', 'Piper', 'Riyah', 'Smashfist']
    charFiles.forEach((name) => {
      fetch(`${base}TridentsKeep/characters/${name}.txt`)
        .then((r) => r.text())
        .then((t) => setTexts((prev) => ({ ...prev, [name]: t.trim() })))
    })
    const worldFiles = ['Main', 'Geography', 'Political']
    worldFiles.forEach((name) => {
      fetch(`${base}TridentsKeep/world/${name}.txt`)
        .then((r) => r.text())
        .then((t) => setTexts((prev) => ({ ...prev, [`World_${name}`]: t.trim() })))
    })
  }, [])

  return (
    <Box component="main" sx={{ flexGrow: 1, pt: 2, pb: 8, bgcolor: 'rgb(174, 203, 216)' }}>
      <Container maxWidth="md">
        <IconButton onClick={onBack} sx={{ mb: 2 }} aria-label="Back"><ArrowBackIcon /></IconButton>

        {/* Bordered table layout */}
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, bgcolor: 'white' }}>

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
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Header menu */}
              <Box sx={{ display: 'flex', borderBottom: '1px solid', borderColor: 'divider' }}>
                {['Overview', 'Characters', 'World', 'Excerpt'].map((label) => (
                  <Button
                    key={label}
                    onClick={() => handleTabChange(label)}
                    sx={{
                      flex: 1,
                      textTransform: 'none',
                      borderRadius: 0,
                      py: 2,
                      fontSize: { xs: '0.95rem', sm: '1rem' },
                      fontWeight: 600,
                      borderRight: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderRight: 'none' },
                      borderBottom: activeTab === label ? '3px solid' : '3px solid transparent',
                      borderBottomColor: activeTab === label ? 'primary.main' : 'transparent',
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </Box>
              {/* Content */}
              <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {activeTab === 'Excerpt' && (
                <Box sx={{ maxWidth: 720, mx: 'auto', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.8, color: '#222' }}>
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 3, textAlign: 'center', fontFamily: 'Georgia, serif' }}>
                    Chapter One: The Wyvern Egg
                  </Typography>
                  {[
                    `It was a pleasant spring day. The hot sun blazed in the sky, but there was a cool breeze, and the trees cast a gentle shadow over the forest floor, balancing with the heat and creating a comfortable temperature. The trees, all cherry blossoms, were just starting to bud, and the branches were covered in hundreds of small, white and pink flowers. The ground was littered in flower petals, which would flutter a few inches off the ground whenever somebody took a step, as if they were walking through shallow water.`,
                    `Richard, Fred, and Camila sat on a branch of an old willow tree at the edge of a small clearing, peering down at a wyvern's nest, which sat partially hidden inside a hollow on the tree trunk. Within the nest were three, pearly pink eggs, each one about 30 centimeters in diameter. The wyvern itself was nowhere to be seen, but a nesting wyvern never strayed far from its eggs.`,
                    `The trio planned to steal one of the eggs. Wyvern eggs were a rare delicacy; the creatures only nested once in their life and hid their nests quite well. If everything went to plan, the group would be eating a wyvern omelet tonight, a meal they might never get again. Unfortunately, this group was prone to accidents.`,
                    `Richard was the most reserved. Contrary to his friends, he didn't wish to live a life of adventure and awe. He was quite happy with his current situation, living in the small town of Nokford and doing odd jobs for money. He didn't have many plans in life other than taking over his mom's shop once he turned 18, an event only a few months away. His situation was simple, safe, and relatively cut off from the wider world, just the way he wanted it.`,
                    `Fred was the engine behind the group. To him, life in Nokford was monotonous, so he made it his mission to undertake a new venture every day, dragging his friends along with him. Stealing a wyvern egg was his idea, of course. Fred had bright orange hair, pushed back with a pair of aviator goggles. He wore colorful clothes, and had a cheap, wooden sheath strapped to his belt in case he ever obtained a blade.`,
                    `Camila was the brains of the group. Whenever Fred became too roused or reckless, Camila would reel him in. If Richard panicked, she would rationalize the situation with him. She was the smartest of the three, and admittedly, most of the time she was right. However, she had a tendency to insist she was right, even when she wasn't. Once she had made up her mind about something, it was impossible to convince her otherwise. She and Fred were dating, and had been for 3 years. Although she didn't share Fred's dreams of exploration and adventure, she too hoped to one day leave Nokford. There was a world out there that she wanted to see, and being stuck in the smallest, most irrelevant town east of the desert nations had gotten old.`,
                    `"I don't want to do this," Richard said.`,
                    `"You never want to do anything," Fred replied.`,
                    `"Wyverns breathe fire! We aren't fireproof! Do third degree burns sound fun to you guys?" Richard responded. "They're especially easy to annoy during the mating season, which is right now, in case you forgot."`,
                    `"Richard, relax, the wyvern isn't here right now," Camila reasoned. "We'll take one egg, and then leave. Nothing bad will happen."`,
                    `"Never heard those words before," Richard muttered. Fred hopped from the tree branch, kicking up a cloud of flower petals when he landed on the ground. Camila followed. Richard climbed down with caution, but halfway through he slipped on a branch, lost his balance, and tumbled to the ground. He got to his feet and brushed himself off before joining the other two.`,
                    `"It's been about 10 minutes since the wyvern was last here, so she shouldn't be coming back anytime soon," Fred said. "Everybody wearing their gloves?" Camila nodded. Richard hurried to put his on. Wyvern eggs were known to be quite hot. While not as hot as dragon eggs, which couldn't be touched even with gloves, they would still burn your hand without protection.`,
                    `"Ok, I'll go grab the egg," Fred explained. "Camila, you stand behind me in case I drop it. Richard, you are the look out. Let us know if the wyvern comes back." Fred had a way of speaking in which he delivered everything with a tone of grandeur and importance.`,
                    `"It's not like me warning you is going to do any good," Richard responded. "The brush is pretty thick. I won't see the wyvern until it enters the clearing." Fred looked around at the surrounding forest. Aside from the path they took to get here, the rest of the forest floor was covered in bushes and small trees.`,
                    `"Fair enough," Fred replied. "Well, if you see something suspicious or hear something that sounds like a wyvern, let me know."`,
                    `"What does a Wyvern sound like?" Richard whispered to Camila.`,
                    `"Um, like a chirping, screeching sort of thing," she responded. "Like a squirrel and a coyote had a baby that could fly and breathe fire."`,
                    `Fred climbed up to the hollow in the tree, balancing on a branch as he reached in and grabbed one of the eggs. Steam hissed up from his gloves upon contact. If they held the egg for too long, it would burn through the gloves, so they had to take turns. Fred took the egg out of the hollow with care. As he was doing this, his jacket snagged on a sharp piece of wood, pulling back his sleeve and briefly exposing the underside of his wrist. Fred's foot slipped from the branch, and his exposed arm brushed against one of the other eggs. He yelped, tumbling backwards and sliding off the branch, Camila jumped to catch the egg, grabbing it just before it smashed into the ground. Fred landed with a thump, flower petals fluttering into the air.`,
                    `"Are you ok, Fred?" Richard asked. Fred nodded, immediately hopping back onto his feet and stretching out his back.`,
                    `"Those eggs are hot," Fred responded, waving his hands. Camila set the egg down, the flower petals around it charring and crumpling.`,
                    `"Let me see the burn," she said. Fred held out his wrist. Camila inspected the wound, "It's not too bad. I'll get some ointment for it when we get home." Richard picked up the egg, feeling the warmth through his gloves. He rolled it over in his hands a few times. It was lighter than he expected.`,
                    `Suddenly, Richard heard a low growling. He had been distracted by Fred's fall, and hadn't been paying attention to the surrounding brush. Richard saw a flash of silver in his peripheral vision. He spun around, just in time to see a spiked tail flick into the bushes. Adrenaline began to pump. He felt his heart beat increase. The wyvern was watching them. He didn't know how long it had been there, but it probably wasn't thrilled to see them holding one of its precious eggs.`,
                    `"Guys, it's here." Richard said, his voice shaky. He tucked the egg under his arm, feeling it burn through his coat's sleeve. Looking around for something to defend himself with, his eyes rested on a sizable stick. He grabbed it and tried to hold it like a sword, not that he knew how to do that.`,
                    `"Oh wonderful." Camila muttered, rummaging through her bag for anything she could use as a weapon. All she came up with was a hammer. Fred pulled his goggles down over his eyes and stuck out his hands in a fighting stance.`,
                    `"Alright, on the count of three," Fred said, whispering at the volume of normal speech, "I'm going to—"`,
                    `The wyvern sprung from the bush! It was a flash of teeth and claws, zipping around the clearing before the group had time to react. The animal was mostly silver, with gold stripes running along its sides. It had a crocodile-like snout, and sharp teeth that stood out awkwardly from its mouth. There was a row of spikes down its back, as well as two large horns, one above each eye. The wyvern wasn't very big, only a meter and a half long, but it could pack a punch. It barrelled into Richard, knocking the wind out of him. He gasped for air, the precious egg falling from his hands and rolling away in a trail of ashy destruction. Camila swung her hammer, missing and tripping on Richard's legs. Fred wildly punched the air, remarkably landing a hit or two as the creature sped by.`,
                    `Richard crawled towards the egg. Camila sprung up, swinging her hammer around as she got her balance and accidentally clocking the wyvern in the lower jaw. The creature screeched, briefly dipping out of the air.`,
                    `Fred reached to his sheath to pull out his sword, only he didn't have a sword. Instead, he unclipped the sheath and bonked the wyvern on its head. The animal hissed, turning around and speeding back towards Fred. He swung again, the wood making a dull thunk as it collided with the creature's ribs.`,
                    `Richard grabbed the egg and scrambled to his feet. There was now a bright orange crack on it, zig-zagging across its pink surface. The wyvern was flying straight at him. He panicked, tossing the egg to Fred.`,
                    `"Fred!" Richard yelled. Fred looked up, catching the egg just in time before it smacked him in the face. The wyvern had turned to target him now.`,
                    `"Camila!" Fred shouted, tossing the egg to her. She leaped in the air, snatching the small object just before the wyvern could reach it. Enraged, it dived towards her.`,
                    `"Richard!" Camila shouted, throwing the egg back to him. Richard fumbled, dropping the egg but grabbing it again just before it reached the ground.`,
                    `"Fred!" Richard shouted. The game of hot potato continued. "Richard!" "Camila!" "Richard!"`,
                    `"STOP GIVING IT BACK TO ME!" Richard shouted. He sprinted off down the path, with both his friends and the wyvern in quick succession.`,
                    `The beast screeched, flames shooting from its mouth and igniting the back of Fred's coat. He dropped to the ground, the wyvern speeding through where his head had been a moment before. Camila threw the hammer, missing spectacularly. The wyvern chased after Richard, who was farther down the path. He could feel the egg burning through his gloves, the warmth quickly turning to pain. He tossed it to Fred, who had thrown his coat on the ground and was stomping out the fire. Fred caught it in one hand, using the other to punch the wyvern out of the way as he ran past Camila down the path. The wyvern turned to chase him, but while it was distracted, Camila hit its side with a tree branch. It spiraled out of the air into a nearby tree, hissing and screeching, but finally backing down.`,
                    `"Are you ok?" Fred asked Camila, helping her up. "You have a bruise here on your cheek." Camila felt her face.`,
                    `"I think I'm ok, thank you." Camila replied. She brushed some of the leaves out of Fred's hair. "You're looking a little roughed up."`,
                    `"I feel great! I can't believe that actually worked!" Fred exclaimed. He thrusted the egg over his head, waving it in the air.`,
                    `"Neither can I," Richard muttered, who was still perturbed by the whole experience.`,
                    `"We fought a wyvern! It was fantastic! Oh, they will tell stories of this someday!" Fred exclaimed.`,
                    `"Tell stories of us fighting that thing?" Camila asked, laughing. "It was the size of our dog and did more damage to us than we did to it."`,
                    `"Nonsense! Wasn't it heroic when I valiantly punched the beast?" Fred asked. Camila laughed harder.`,
                    `"You mean when you hit it by accident while doing this?" she asked, frantically waving her hands in the air to mimic him. Fred nodded.`,
                    `"Yes. Then. I thought it was pretty cool." Fred responded. He was laughing as well now. Even Richard began to chuckle, his fear subsiding.`,
                    `All of a sudden, the wyvern dived out of the sky, grabbing the egg with its sharp claws. Fred managed to keep his grip on the egg, but he fell flat on his face with the sudden downward momentum. The wyvern struggled to fly away, unable to carry the weight of its egg combined with that of a fully grown human. Camila ran to help, but was kept at bay by the wyvern's fiery breath.`,
                    `Fred tried to stand, but every time he got to his feet, the wyvern would pull forward, and he would collapse onto his face again.`,
                    `Richard realized he still had the stick with him from earlier, and in the heat of the moment, chucked it at the wyvern with deadly accuracy. The stick nailed it in the forehead, right between the eyes. The creature screeched, letting go of the egg and finally accepting defeat. Richard watched as it zipped off into the brush. Fred got to his feet, wiping the flower petals off his chest and face. Camila ran over to him.`,
                    `"Are you ok?" Camila asked. Fred nodded. He had a bloody nose and a few scratches, but looked fine other than that. He ran a hand through his bright, orange hair, removing leaves and dirt.`,
                    `"Hopefully she's gone for good." Fred said.`,
                    `"I never want to do this again." Richard replied. He laughed in relief, clutching his stomach where the wyvern had slammed him.`,
                    `"Ah I was planning to do it again next tuesday, if you are willing." Fred asked. Camila smiled and rolled her eyes. The group began to walk down the path.`,
                    `"That was an impressive throw, Richard." Camila said, patting his back. "You got her right in the forehead."`,
                    `"Yes, it was impressive indeed." Fred added. He slung his arm over Richard's shoulder. "I can picture you now, donned in shining armor as you hurl a trident at some ancient beast."`,
                    `"Well, that's never happening." Richard responded. "Doubt I'll encounter any ancient beasts around here!"`,
                    `"Hah! I'm sure there is some sort of sea monster lurking in the Ballaster Bay." Fred said. "Something we shall slay! We can mount its head on our wall!" He thrust the sheath into the air. Camila put her hand around his arm.`,
                    `"Put the sheath away before you hurt somebody," she said. Fred clipped it to his belt.`,
                    `"I'll get a real sword someday," Fred proclaimed.`,
                    `"Your mom will never let you," Richard replied.`,
                    `"I'm 18! She can't control me forever!" Fred exclaimed. He would've thrust his hand into the air again if Camila wasn't holding his arm.`,
                    `"I don't know if I'm gonna let you get a sword," Camila responded. Fred looked at her with a shocked expression.`,
                    `"Why?! I can't be a warrior without a sword!" Fred exclaimed.`,
                    `"No offense, but I don't entirely trust you with a real weapon."`,
                    `"I would never hurt you."`,
                    `"I'm more worried you'll hurt yourself." Camila said. Fred considered this. "Besides, we are NOT going on some epic quest when we leave. We've been over this."`,
                    `"You guys are leaving?" Richard asked. "Are you going on a trip somewhere?" Camila looked surprised, not realizing she had let this information slip. She turned to Fred.`,
                    `"I fear it's time to break the news." Camila said. Fred nodded his head in acceptance.`,
                    `"What news?" Richard asked. He took out a small token from his pocket and began to fiddle with it. "What news are you breaking?"`,
                    `"We have decided…that we will be leaving Nokford." Camila said slowly. Richard felt a pit forming in his stomach.`,
                    `"What? You…you can't just leave Nokford!" Richard replied, forcing laughter in an attempt to delegitimize their idea. "I mean, where would you even go?!"`,
                    `"North, to the capital." Fred said.`,
                    `"Where the war is?" Richard replied. He spun the token faster in his fingers.`,
                    `"The war isn't in Deepland, it's in Knavia!"`,
                    `"Well the Deepland capital is a lot closer to Knavia than we are. What if they cross the Land Bridge? Then what?"`,
                    `"Richard—" Camila interjected.`,
                    `"We are winning the war! Deepland is winning! What are you so worried about?" Fred exclaimed. Richard felt anger bubbling up in his gut.`,
                    `"This is not—not at all what—" Richard stuttered, struggling to find what he wanted to say. "I just think it's an unsafe idea. Not a smart idea at all."`,
                    `"It is safer to be in a walled, heavily guarded city, protected by a dragon mind you, than to be out here in Nokford, a town with an old wall, no protection, and definitely no dragon." Camila said in a tone which implied her words were verified facts.`,
                    `"No it's not!" Richard replied, waving his hands in front of him.`,
                    `"It totally is." Fred added.`,
                    `"If Knavia invades, they're not going to attack us! Our town will go overlooked! It would be months before they even realized we're here!" Richard argued. "But they'll go straight to the capital first! If they invade, that's the number one target! We're safe here!"`,
                    `"What is an invading army going to do against a dragon!?" Fred exclaimed. Camila pinched her brow while the two shouted at each other.`,
                    `"Ok, quiet, I don't want to hear this anymore." She said, "Richard, we've made up our minds. We're adults and we want to see the world."`,
                    `"That'd be fine if the world wasn't at war." Richard replied. Camila sighed. Fred had begun kicking a stone in front of him as they walked. It was silent for a moment. Pink petals drifted down from the trees.`,
                    `"Were you not going to tell me?" Richard asked, hurt. The token spun faster in his hand.`,
                    `"We were going to tell you, but we thought it would be best to wait for the right time." Camila replied. Richard rolled his eyes.`,
                    `"When do you leave?" he asked, hoping the answer would be "never" so the day could return to normal.`,
                    `"Not for a while." Camila said. "We'll be here for a few weeks after your birthday, and then we'll probably head out."`,
                    `"And don't you worry, we will visit ALL the time!" Fred added, slinging his arm back over Richard's shoulder and jostling him. "Now who wants to take this egg, it's burning through my gloves." Camila grabbed it from him.`,
                    `Richard did not feel much better, despite Fred's reassurances. They wouldn't need to "visit all the time" if they never left. Unfortunately, Richard realized it was futile to try and convince them. Camila had made up her mind and once Fred got a taste of adventure he would never let it go. Richard pushed all this out of his mind, deciding that it was far away, and he could simply just pretend it wasn't happening and his friends weren't leaving until he had to. His mind drifted back to the task at hand.`,
                    `"How are we going to cook this?" Camila asked, holding up the egg.`,
                    `"I'm sure my mom knows how," Richard replied.`,
                  ].map((para, i) => (
                    <Typography key={i} sx={{ mb: 2, fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.8, textIndent: '2em' }}>
                      {para}
                    </Typography>
                  ))}
                </Box>
              )}
              {activeTab === 'Overview' && (
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {texts['overview']}
                </Typography>
              )}
              {activeTab === 'Characters' && CHARACTERS.map(({ id, src, textKey }, index) => (
                <Box key={id}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box
                      component="img"
                      src={src}
                      alt={id}
                      onClick={() => openPoster(CHARACTERS, index)}
                      sx={{ width: 120, borderRadius: 1, flexShrink: 0, cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                    />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{texts[textKey]}</Typography>
                  </Box>
                </Box>
              ))}
              {activeTab === 'World' && WORLD.map(({ id, src, textKey }, index) => (
                <Box key={id}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box
                      component="img"
                      src={src}
                      alt={id}
                      onClick={() => openPoster(WORLD, index)}
                      sx={{ width: 120, borderRadius: 1, flexShrink: 0, cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                    />
                    <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{texts[textKey]}</Typography>
                  </Box>
                </Box>
              ))}
              </Box>
            </Box>

          </Box>
        </Box>
      </Container>
      <PosterModal poster={expandedPoster} onClose={closePoster} onPrev={handlePrev} onNext={handleNext} />
    </Box>
  )
}

function AboutPage({ onBack }: { onBack: () => void }) {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="md">
        <IconButton onClick={onBack} sx={{ mb: 2 }} aria-label="Back"><ArrowBackIcon /></IconButton>
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

const NRPLIGNS = [
  'Bolttail', 'Dromeostodon', 'Flowt', 'Fondle Fish',
  'Gollug', 'Lilly Paddler', 'Milah Goat', 'Ozodisk',
  'Scrapbat', 'Sheeverload', 'Smogskrene', 'Spindelite',
  'Swingtrap', 'Ventstrich', 'Vrognot', 'Waxelite',
]

function ArtPage({ onBack }: { onBack: () => void }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [texts, setTexts] = useState<Record<string, string>>({})

  useEffect(() => {
    const base = import.meta.env.BASE_URL
    NRPLIGNS.forEach((name) => {
      fetch(`${base}nrpligns/${name}.txt`)
        .then((r) => r.text())
        .then((t) => setTexts((prev) => ({ ...prev, [name]: t.trim() })))
    })
  }, [])

  const expandedPoster = expandedIndex !== null
    ? { src: `nrpligns/${NRPLIGNS[expandedIndex]}.png`, text: texts[NRPLIGNS[expandedIndex]] ?? '', title: NRPLIGNS[expandedIndex] }
    : null
  const handlePrev = () => setExpandedIndex(i => i !== null ? (i - 1 + NRPLIGNS.length) % NRPLIGNS.length : null)
  const handleNext = () => setExpandedIndex(i => i !== null ? (i + 1) % NRPLIGNS.length : null)

  return (
    <Box component="main" sx={{ flexGrow: 1, pt: 2, pb: 8, bgcolor: 'rgb(92, 109, 92)' }}>
      <Container maxWidth="md">
        <IconButton onClick={onBack} sx={{ mb: 2 }} aria-label="Back"><ArrowBackIcon /></IconButton>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Art
        </Typography>
        <Typography variant="h5" fontWeight={700} sx={{ mt: 2, mb: 1 }}>
          The Nrplings
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          When I was five years old, I began creating and “documenting” fictional animals known as the Nrplings. They started as just fantasy creatures, but over time I began to incorporate real biology and ecology into their designs. Now, the Nrplings are a project which combines imaginative worldbuilding and creature design with science and evolutionary biology. Each of the over 900 Nrplings has its own habitat, hunting/foraging strategies, and role in a larger ecosystem. Check out some examples of the Nrplings below!
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          {NRPLIGNS.map((name, index) => (
            <Box
              key={name}
              component="img"
              src={`nrpligns/thumbnails/${name}_thumb.png`}
              alt={name}
              onClick={() => setExpandedIndex(index)}
              sx={{ width: '100%', aspectRatio: '1', objectFit: 'cover', cursor: 'pointer', borderRadius: 1, '&:hover': { opacity: 0.85 } }}
            />
          ))}
        </Box>
      </Container>
      <PosterModal
        poster={expandedPoster}
        onClose={() => setExpandedIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </Box>
  )
}

function ScriptsPage({ onBack }: { onBack: () => void }) {
  return (
    <Box component="main" sx={{ flexGrow: 1, pt: 2, pb: 8, bgcolor: 'rgb(239, 218, 134)' }}>
      <Container maxWidth="md">
        <IconButton onClick={onBack} sx={{ mb: 2 }} aria-label="Back"><ArrowBackIcon /></IconButton>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700} sx={{ color: 'rgb(205, 79, 65)' }}>
          Screenplays
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Coming soon.
        </Typography>
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
