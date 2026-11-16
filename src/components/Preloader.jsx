import { Component, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import '@designcodeio/threeui/style.css'
import { CircleButtons } from '@designcodeio/threeui/components/CircleButtons'
import { OrbitalSphereBackground } from '@designcodeio/threeui/components/OrbitalSphereBackground'
import { StreamConvergenceBackground } from '@designcodeio/threeui/components/StreamConvergenceBackground'
import { WarpFieldBackground } from '@designcodeio/threeui/components/WarpFieldBackground'
import './Preloader.css'

// Safe boundary so WebGL context limits never break the boot sequence or page sections
export class ShaderSafeBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

// ============================================================================
// GOOGLE DEVELOPER ECOSYSTEM IC DIE VECTORS & GDG BRACKETS
// ============================================================================

function GdgBracketsSvg({ width = 34, height = 20 }) {
  return (
    <svg viewBox="0 0 120 64" width={width} height={height} fill="none" aria-hidden="true">
      <path d="M42 10L14 32L30 44" stroke="#EA4335" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 32L42 54" stroke="#4285F4" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M78 54L106 32L90 20" stroke="#FBBC04" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M106 32L78 10" stroke="#34A853" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ToolDieSvg({ id }) {
  switch (id) {
    case 'gemini':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <defs>
            <linearGradient id="dfGemGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#4285F4" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <path d="M24 4C24 15.05 32.95 24 44 24C32.95 24 24 32.95 24 44C24 32.95 15.05 24 4 24C15.05 24 24 15.05 24 4Z" fill="url(#dfGemGrad)" />
          <path d="M37 7C37 10.8 40.1 14 44 14C40.1 14 37 17.1 37 21C37 17.1 33.9 14 30 14C33.9 14 37 10.8 37 7Z" fill="#BAE6FD" />
        </svg>
      )
    case 'vertex':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M24 7L12 15V31L24 39L36 31V15L24 7Z" stroke="#F472B6" strokeWidth="2" fill="rgba(236,72,153,0.14)" />
          <path d="M24 7L24 23M24 23L12 15M24 23L36 15M24 23L24 39" stroke="#F472B6" strokeWidth="1.8" />
          <circle cx="24" cy="7" r="3" fill="#FBBC04" />
          <circle cx="12" cy="15" r="3" fill="#EA4335" />
          <circle cx="36" cy="15" r="3" fill="#38BDF8" />
          <circle cx="24" cy="23" r="4" fill="#FFFFFF" />
          <circle cx="24" cy="39" r="3" fill="#34A853" />
        </svg>
      )
    case 'idx':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <rect x="6" y="8" width="36" height="32" rx="6" stroke="#A855F7" strokeWidth="2.5" fill="rgba(88,28,135,0.35)" />
          <path d="M14 19L21 24.5L14 30" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M24 30H33" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
          <circle cx="34" cy="15" r="2.5" fill="#34D399" />
        </svg>
      )
    case 'cloud':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M29.5 14.5L34.5 9.5C31.5 6.8 27.6 5.5 23.5 5.8C17.2 6.2 12 10.8 10.5 16.8L17.2 21.2C18.2 17.8 21.3 15.2 25 15.2C26.7 15.2 28.3 15.8 29.5 16.8V14.5Z" fill="#EA4335" />
          <path d="M10.5 16.8C6.2 18.2 3.2 22.2 3.2 27C3.2 32.5 7.4 37.1 12.8 37.7L17.5 31C15.2 30.6 13.5 28.6 13.5 26.2C13.5 23.8 15.1 21.8 17.2 21.2L10.5 16.8Z" fill="#4285F4" />
          <path d="M35.5 37.8H24V31H34.5C36.8 31 38.5 29.2 38.5 27C38.5 25 37.1 23.4 35.2 23L39.5 16.8C42.8 19.1 44.8 22.9 44.8 27.2C44.8 33.1 40.5 37.8 35.5 37.8Z" fill="#34A853" />
          <path d="M24 37.8H12.8L17.5 31H24V37.8Z" fill="#FBBC04" />
        </svg>
      )
    case 'android':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M15 14L11.5 8.5M33 14L36.5 8.5" stroke="#3DDC84" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M11 24C11 16.8 16.8 11 24 11C31.2 11 37 16.8 37 24V26H11V24Z" fill="#3DDC84" />
          <rect x="11" y="28" width="26" height="11" rx="3" fill="#3DDC84" />
          <circle cx="18.5" cy="18.5" r="2" fill="#052E16" />
          <circle cx="29.5" cy="18.5" r="2" fill="#052E16" />
        </svg>
      )
    case 'firebase':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M10 36L15.5 9.5C15.8 8.2 17.5 7.9 18.2 9L23.5 18L10 36Z" fill="#FFA000" />
          <path d="M10 36L28.5 16.5C29.3 15.7 30.7 16 31 17.1L38 36L24 44L10 36Z" fill="#FFCA28" />
          <path d="M24 11.5L10 36L24 44L38 36L32.5 17.5L24 25.5V11.5Z" fill="#F57C00" fillOpacity="0.65" />
        </svg>
      )
    case 'flutter':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M27.5 6L10 23.5L15.5 29L38.5 6H27.5Z" fill="#47C5FB" />
          <path d="M27.5 22L18 31.5L23.5 37L29 31.5L38.5 22H27.5Z" fill="#47C5FB" />
          <path d="M23.5 37L29 42.5H40L29 31.5L23.5 37Z" fill="#00569E" />
          <path d="M18 31.5L23.5 26L29 31.5L23.5 37L18 31.5Z" fill="#00B5F8" />
        </svg>
      )
    case 'angular':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M24 5L7 11L10 34L24 43L38 34L41 11L24 5Z" fill="#DD0031" />
          <path d="M24 5V43L38 34L41 11L24 5Z" fill="#C3002F" />
          <path d="M24 10.5L13.5 34H17.8L20 28.2H28L30.2 34H34.5L24 10.5ZM21.4 24.5L24 17.8L26.6 24.5H21.4Z" fill="#FFFFFF" />
        </svg>
      )
    case 'chrome':
      return (
        <svg viewBox="0 0 48 48" width="24" height="24" fill="none">
          <path d="M24 6C30.8 6 36.7 9.8 39.8 15.5H24C19.3 15.5 15.5 19.3 15.5 24C15.5 25.5 15.9 26.9 16.6 28.1L9.2 15.3C12.3 9.7 17.8 6 24 6Z" fill="#EA4335" />
          <path d="M6 24C6 19.9 7.4 16.1 9.7 13.1L17.4 26.5C18.9 29.9 22.3 32.5 26.3 32.5L18.8 41.2C11.4 39 6 32.1 6 24Z" fill="#34A853" />
          <path d="M39.8 15.5C41.2 18 42 20.9 42 24C42 33.9 33.9 42 24 42C22.1 42 20.3 41.7 18.6 41.2L26.3 32.5C29.9 31.5 32.5 28.1 32.5 24C32.5 20.8 30.7 18 28.1 16.6L39.8 15.5Z" fill="#FBBC04" />
          <circle cx="24" cy="24" r="7" fill="#4285F4" stroke="#070A14" strokeWidth="2" />
        </svg>
      )
    default:
      return null
  }
}

// ============================================================================
// 9 SURFACE-MOUNTED IC DIE NODES & TELEMETRY DEFINITIONS
// ============================================================================

const IC_NODES = [
  // LEFT WING BUSES (Desktop) / TOP BANK BUSES (Mobile Portrait)
  {
    id: 'gemini',
    shortLabel: 'Gemini 2.5',
    mobileLabel: 'Gemini',
    badgeText: 'AGENTIC CORE',
    threshold: 10,
    color: '#A855F7',
    glow: 'rgba(168, 85, 247, 0.45)',
    glowSoft: 'rgba(168, 85, 247, 0.16)',
    side: -1,
    rx: -0.34,
    ry: -0.34,
    mSide: -1,
    mRx: -0.38,
    mRy: -0.34,
    trackInfo: 'Multimodal Agentic Workflows, Deep Think & Function Calling Track',
    codeSnippet: 'const agent = gemini.startAgent({ region: "belgaum-2026" });',
  },
  {
    id: 'vertex',
    shortLabel: 'Vertex AI',
    mobileLabel: 'Vertex',
    badgeText: 'ML PIPELINES',
    threshold: 21,
    color: '#EC4899',
    glow: 'rgba(236, 72, 153, 0.45)',
    glowSoft: 'rgba(236, 72, 153, 0.16)',
    side: -1,
    rx: -0.40,
    ry: -0.15,
    mSide: -1,
    mRx: -0.19,
    mRy: -0.28,
    trackInfo: 'Enterprise RAG, Agent Builder & Custom Model Tuning Track',
    codeSnippet: 'await vertex.deployModel({ endpoint: "devfest-belgaum" });',
  },
  {
    id: 'idx',
    shortLabel: 'Genkit & IDX',
    mobileLabel: 'IDX',
    badgeText: 'AI WORKSPACE',
    threshold: 32,
    color: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.45)',
    glowSoft: 'rgba(139, 92, 246, 0.16)',
    side: -1,
    rx: -0.41,
    ry: 0.04,
    mSide: -1,
    mRx: 0.0,
    mRy: -0.35,
    trackInfo: 'Full-Stack AI App Generation & Genkit Observability Track',
    codeSnippet: 'export const flow = defineFlow({ name: "devfestAssist" });',
  },
  {
    id: 'cloud',
    shortLabel: 'Google Cloud',
    mobileLabel: 'Cloud',
    badgeText: 'SCALE & SECURE',
    threshold: 44,
    color: '#4285F4',
    glow: 'rgba(66, 133, 244, 0.45)',
    glowSoft: 'rgba(66, 133, 244, 0.16)',
    side: -1,
    rx: -0.38,
    ry: 0.22,
    mSide: -1,
    mRx: 0.19,
    mRy: -0.28,
    trackInfo: 'Serverless Cloud Run, Model Armor & Zero-Trust GKE Scale',
    codeSnippet: 'gcloud run deploy devfest-belgaum --region=asia-south1',
  },
  {
    id: 'android',
    shortLabel: 'Android 16',
    mobileLabel: 'Android',
    badgeText: 'ON-DEVICE AI',
    threshold: 56,
    color: '#34A853',
    glow: 'rgba(52, 168, 83, 0.45)',
    glowSoft: 'rgba(52, 168, 83, 0.16)',
    side: -1,
    rx: -0.29,
    ry: 0.37,
    mSide: -1,
    mRx: 0.38,
    mRy: -0.34,
    trackInfo: 'Gemini Nano On-Device, Jetpack Compose & XR Spatial Apps',
    codeSnippet: '@Composable fun DevFestBelgaumPass(state: AgentState)',
  },

  // RIGHT WING BUSES (Desktop) / BOTTOM BANK BUSES (Mobile Portrait)
  {
    id: 'firebase',
    shortLabel: 'Firebase',
    mobileLabel: 'Firebase',
    badgeText: 'REALTIME SYNC',
    threshold: 67,
    color: '#FBBC04',
    glow: 'rgba(251, 188, 4, 0.45)',
    glowSoft: 'rgba(251, 188, 4, 0.16)',
    side: 1,
    rx: 0.34,
    ry: -0.31,
    mSide: 1,
    mRx: -0.34,
    mRy: 0.26,
    trackInfo: 'Firebase App Hosting, Vector Search & Postgres Data Connect',
    codeSnippet: 'firebase.dataConnect.executeMutation("RegisterBelgaum");',
  },
  {
    id: 'flutter',
    shortLabel: 'Flutter GPU',
    mobileLabel: 'Flutter',
    badgeText: 'IMPELLER 3D',
    threshold: 78,
    color: '#38BDF8',
    glow: 'rgba(56, 189, 248, 0.45)',
    glowSoft: 'rgba(56, 189, 248, 0.16)',
    side: 1,
    rx: 0.40,
    ry: -0.09,
    mSide: 1,
    mRx: -0.115,
    mRy: 0.21,
    trackInfo: '120fps Impeller Shaders, WebAssembly & Cross-Platform UI',
    codeSnippet: 'FlutterGPU.renderShader(scene: AgenticCanvas());',
  },
  {
    id: 'angular',
    shortLabel: 'Angular v20',
    mobileLabel: 'Angular',
    badgeText: 'ZONELESS SSR',
    threshold: 88,
    color: '#EA4335',
    glow: 'rgba(234, 67, 53, 0.45)',
    glowSoft: 'rgba(234, 67, 53, 0.16)',
    side: 1,
    rx: 0.38,
    ry: 0.14,
    mSide: 1,
    mRx: 0.115,
    mRy: 0.21,
    trackInfo: 'Fine-Grained Reactivity, Signals & Incremental Hydration',
    codeSnippet: 'const passes = signal<DevFestPass[]>(belgaumTickets);',
  },
  {
    id: 'chrome',
    shortLabel: 'Chrome WebAI',
    mobileLabel: 'WebAI',
    badgeText: 'WEBGPU & AI',
    threshold: 96,
    color: '#34D399',
    glow: 'rgba(52, 211, 153, 0.45)',
    glowSoft: 'rgba(52, 211, 153, 0.16)',
    side: 1,
    rx: 0.31,
    ry: 0.35,
    mSide: 1,
    mRx: 0.34,
    mRy: 0.26,
    trackInfo: 'window.ai Prompt API, WebGPU Compute & Baseline 2026 Web',
    codeSnippet: 'const session = await window.ai.languageModel.create();',
  },
]

const BOOT_LOGS = [
  { at: 0, text: 'Etching GDG Belgaum motherboard & DevFest 2026 kernel...' },
  { at: 12, text: 'Igniting Gemini 2.5 Agentic Runtime & Deep Think bus...' },
  { at: 24, text: 'Mounting Vertex AI vector indices & neural matrix shaders...' },
  { at: 36, text: 'Hydrating Project IDX cloud workspaces & Genkit flows...' },
  { at: 48, text: 'Securing Cloud Run asia-south1 edge [BUILD • SECURE • SCALE]...' },
  { at: 60, text: 'Syncing Android 16 Gemini Nano on-device inference bridges...' },
  { at: 72, text: 'Connecting Firebase Data Connect & Flutter Impeller 3D...' },
  { at: 86, text: 'Compiling Angular v20 Signals & Chrome WebGPU Prompt APIs...' },
  { at: 97, text: 'Stamping KLS GIT Belagavi chapter passport... Lock achieved!' },
]

// Compute 45-degree chamfered PCB trace waypoints from IC socket to reactor ring perimeter (Desktop horizontal wings)
function computeChamferedTrace(x0, y0, cx, cy, coreR, side) {
  const angle = Math.atan2(y0 - cy, x0 - cx)
  const dockX = cx + Math.cos(angle) * coreR
  const dockY = cy + Math.sin(angle) * coreR
  const dy = dockY - y0
  const leadOutX = x0 - side * 34
  const chamferDx = Math.min(Math.abs(dockX - leadOutX) * 0.65, Math.abs(dy)) * -side
  const bendX = leadOutX + chamferDx
  return [
    { x: x0, y: y0 },
    { x: leadOutX, y: y0 },
    { x: bendX, y: dockY },
    { x: dockX, y: dockY },
  ]
}

function shouldSkipPreloaderOnInit() {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/team') return true
  try {
    if (sessionStorage.getItem('devfest_skip_next_preloader') === '1') {
      sessionStorage.removeItem('devfest_skip_next_preloader')
      return true
    }
  } catch {
    // Ignore storage access errors
  }
  return false
}

function samplePolyline(pts, t) {
  let total = 0
  const lens = []
  for (let i = 0; i < pts.length - 1; i++) {
    const d = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y)
    lens.push(d)
    total += d
  }
  let target = Math.max(0, Math.min(1, t)) * total
  for (let i = 0; i < lens.length; i++) {
    if (target <= lens[i] || i === lens.length - 1) {
      const f = lens[i] === 0 ? 0 : target / lens[i]
      return {
        x: pts[i].x + (pts[i + 1].x - pts[i].x) * f,
        y: pts[i].y + (pts[i + 1].y - pts[i].y) * f,
      }
    }
    target -= lens[i]
  }
  return pts[pts.length - 1]
}

// ============================================================================
// MAIN PRELOADER COMPONENT
// ============================================================================

export function Preloader() {
  const [progress, setProgress] = useState(0)
  const [inspectedId, setInspectedId] = useState('gemini')
  const [isHoveredNode, setIsHoveredNode] = useState(false)
  const [isWarping, setIsWarping] = useState(false)
  const [hidden, setHidden] = useState(shouldSkipPreloaderOnInit)
  const [soundOn, setSoundOn] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  )

  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const progressRef = useRef(0)
  const hoveredIdRef = useRef(null)
  const isHoveredRef = useRef(false)
  const tiltRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })
  const isWarpingRef = useRef(false)
  const audioCtxRef = useRef(null)
  const soundOnRef = useRef(false)

  useEffect(() => {
    soundOnRef.current = soundOn
  }, [soundOn])

  const playTone = useCallback((freq = 540, dur = 0.065) => {
    if (!soundOnRef.current) return
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.035, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + dur)
    } catch {
      // Ignore browser autoplay restrictions
    }
  }, [])

  // Trigger 3D hyperspace warp-zoom exit into Home.jsx
  const triggerWarpExit = useCallback(() => {
    if (isWarpingRef.current) return
    isWarpingRef.current = true
    progressRef.current = 100
    setProgress(100)
    setIsWarping(true)
    playTone(880, 0.14)
    setTimeout(() => {
      setHidden(true)
    }, 680)
  }, [playTone])

  // Listen for custom 'devfest:replay-preloader' event from Footer/FAB and Escape key
  useEffect(() => {
    const onReplay = () => {
      isWarpingRef.current = false
      progressRef.current = 0
      setProgress(0)
      setInspectedId('gemini')
      setIsWarping(false)
      setHidden(false)
    }
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !hidden) {
        triggerWarpExit()
      }
    }
    window.addEventListener('devfest:replay-preloader', onReplay)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('devfest:replay-preloader', onReplay)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [hidden, triggerWarpExit])

  // Unconditional reactor charge timer & viewport detector (useLayoutEffect runs BEFORE any child WebGL useEffect)
  useLayoutEffect(() => {
    if (hidden) return undefined

    const onResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    onResize()
    window.addEventListener('resize', onResize)

    let lastTick = performance.now()
    const timerId = window.setInterval(() => {
      const now = performance.now()
      const rawDt = (now - lastTick) / 1000
      const dt = rawDt > 0 && rawDt < 0.25 ? rawDt : 0.025
      lastTick = now

      const prevProg = progressRef.current
      if (prevProg < 100) {
        const baseRate = prevProg < 25 ? 24 : prevProg < 80 ? 22 : 26
        const inspectFactor = isHoveredRef.current ? 0.25 : 1
        const nextProg = Math.min(100, prevProg + dt * baseRate * inspectFactor)
        progressRef.current = nextProg
        setProgress(nextProg)

        for (const node of IC_NODES) {
          if (prevProg < node.threshold && nextProg >= node.threshold) {
            if (!isHoveredRef.current) {
              setInspectedId(node.id)
            }
            playTone(420 + node.threshold * 4.2, 0.075)
          }
        }

        if (nextProg >= 100) {
          window.setTimeout(() => triggerWarpExit(), 360)
        }
      }
    }, 25)

    return () => {
      window.clearInterval(timerId)
      window.removeEventListener('resize', onResize)
    }
  }, [hidden, playTone, triggerWarpExit])

  // Desktop 60fps HTML5 Canvas PCB Trace, Comet Photon & 3D Tilt Loop
  useEffect(() => {
    if (hidden || isMobile) return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let rafId = 0
    let lastTime = performance.now()
    let prevShockProg = progressRef.current
    const sparks = []
    const shockwaves = []

    const updateSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    updateSize()
    window.addEventListener('resize', updateSize)

    const onPointerMove = (e) => {
      const nx = (e.clientX / Math.max(1, width) - 0.5) * 2
      const ny = (e.clientY / Math.max(1, height) - 0.5) * 2
      tiltRef.current.tx = nx
      tiltRef.current.ty = ny
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const spawnDockSparks = (x, y, color, count = 4) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.9 + Math.random() * 2.8
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
        })
      }
    }

    const renderFrame = (now) => {
      const rawDt = (now - lastTime) / 1000
      const dt = rawDt > 0 && rawDt < 0.1 ? rawDt : 0.016
      lastTime = now
      const curProg = progressRef.current

      for (const node of IC_NODES) {
        if (prevShockProg < node.threshold && curProg >= node.threshold) {
          shockwaves.push({
            rx: node.rx,
            ry: node.ry,
            color: node.color,
            radius: 18,
            alpha: 0.95,
          })
        }
      }
      prevShockProg = curProg

      // Smooth 3D motherboard tilt interpolation
      const tilt = tiltRef.current
      tilt.x += (tilt.tx - tilt.x) * 0.08
      tilt.y += (tilt.ty - tilt.y) * 0.08
      if (stageRef.current) {
        stageRef.current.style.transform = `rotateX(${(-tilt.y * 4.2).toFixed(2)}deg) rotateY(${(tilt.x * 5.2).toFixed(2)}deg)`
      }

      // Draw Copper Micro-Grid, 3-Lane 45° Differential PCB Buses & Comet Photon Packets
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      const coreR = width < 1024 ? 136 : 176

      // Etched PCB micro-grid with fiducial crosses
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.045)'
      ctx.lineWidth = 1
      const gridStep = 44
      const offsetX = (cx % gridStep) - tilt.x * 8
      const offsetY = (cy % gridStep) - tilt.y * 8
      for (let x = offsetX; x < width; x += gridStep) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = offsetY; y < height; y += gridStep) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Render 3-Lane 45-degree Chamfered PCB Buses for each of the 9 IC Nodes
      IC_NODES.forEach((node, idx) => {
        const nx = cx + node.rx * width
        const ny = cy + node.ry * height
        const unlocked = curProg >= node.threshold
        const isFocused = hoveredIdRef.current === node.id

        const laneOffsets = [-5, 0, 5]
        laneOffsets.forEach((laneOff, laneIdx) => {
          const pts = computeChamferedTrace(
            nx,
            ny + laneOff,
            cx,
            cy + laneOff * 0.45,
            coreR,
            node.side
          )

          // Base copper / energized trace
          ctx.beginPath()
          pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
          if (unlocked) {
            ctx.strokeStyle =
              laneIdx === 1
                ? isFocused
                  ? '#ffffff'
                  : node.color + 'aa'
                : node.color + '3d'
            ctx.lineWidth = laneIdx === 1 ? (isFocused ? 2.6 : 1.9) : 1.0
          } else {
            ctx.strokeStyle = 'rgba(30, 41, 59, 0.68)'
            ctx.lineWidth = laneIdx === 1 ? 1.4 : 0.9
          }
          ctx.stroke()

          // Plated through-hole micro-vias on center bus bends
          if (laneIdx === 1) {
            for (let v = 1; v < pts.length; v++) {
              const vp = pts[v]
              ctx.beginPath()
              ctx.arc(vp.x, vp.y, v === pts.length - 1 ? 4.2 : 2.6, 0, Math.PI * 2)
              ctx.fillStyle = unlocked ? node.color : '#0f172a'
              ctx.fill()
              ctx.lineWidth = 1.1
              ctx.strokeStyle = unlocked ? '#ffffff' : '#334155'
              ctx.stroke()
            }
          }

          // Comet-Tail Photon Packet along primary lane
          if (unlocked && laneIdx === 1) {
            const speed = isFocused ? 0.00095 : 0.00068
            const cycle = (now * speed + idx * 0.13) % 1
            const tailSegments = 14
            for (let s = 0; s < tailSegments; s++) {
              const sampleT = Math.max(0, cycle - s * 0.015)
              const pos = samplePolyline(pts, sampleT)
              const falloff = 1 - s / tailSegments
              ctx.beginPath()
              ctx.arc(pos.x, pos.y, falloff * 3.4 + 0.6, 0, Math.PI * 2)
              ctx.fillStyle = s === 0 ? '#ffffff' : node.color
              ctx.globalAlpha = falloff * 0.95
              ctx.fill()
            }
            ctx.globalAlpha = 1

            // Spawn docking sparks when photon packet impacts the Central Reactor Ring
            if (cycle > 0.965 && Math.random() < 0.42) {
              const dockPt = pts[pts.length - 1]
              spawnDockSparks(dockPt.x, dockPt.y, node.color, 3)
            }
          }
        })
      })

      // Render IC Ignition Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.radius += dt * 115
        sw.alpha -= dt * 1.35
        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(cx + sw.rx * width, cy + sw.ry * height, sw.radius, 0, Math.PI * 2)
        ctx.strokeStyle = sw.color
        ctx.lineWidth = 2
        ctx.globalAlpha = sw.alpha
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      // Render Perimeter Docking Sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i]
        sp.x += sp.vx
        sp.y += sp.vy
        sp.life -= dt * 2.5
        if (sp.life <= 0) {
          sparks.splice(i, 1)
          continue
        }
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, 1.9 * sp.life, 0, Math.PI * 2)
        ctx.fillStyle = sp.color
        ctx.globalAlpha = sp.life
        ctx.fill()
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(renderFrame)
    }

    rafId = requestAnimationFrame(renderFrame)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [hidden, isMobile])

  const activeNode = useMemo(
    () => IC_NODES.find((n) => n.id === inspectedId) || IC_NODES[0],
    [inspectedId]
  )

  const currentLog = useMemo(() => {
    let text = BOOT_LOGS[0].text
    for (const item of BOOT_LOGS) {
      if (progress >= item.at) text = item.text
    }
    return text
  }, [progress])

  if (hidden) return null

  // SVG Ring geometry for Central Reactor Core (440x440 viewBox, center 220,220)
  const ringR = 176
  const ringCirc = 2 * Math.PI * ringR
  const quadLen = ringCirc / 4
  const totalFilled = (progress / 100) * ringCirc
  const quadDash = (qIndex) => {
    const start = qIndex * quadLen
    const len = Math.max(0, Math.min(quadLen - 6, totalFilled - start))
    return `${len} ${ringCirc}`
  }

  return (
    <div
      className={`df-preloader-root${isWarping ? ' is-warping' : ''}`}
      role="dialog"
      aria-label="DevFest Belgaum 2026 System Boot Preloader"
    >
      {/* ================================================================= */}
      {/* LAYER 1: THREEUI WEBGL SHADERS SUBSTRATE                          */}
      {/* ================================================================= */}
      {!isMobile && (
        <div className="df-preloader-threeui-bg" aria-hidden="true">
          <ShaderSafeBoundary>
            <div className="df-preloader-stream-layer">
              <StreamConvergenceBackground
                speed={0.85 + (progress / 100) * 1.1}
                fidelity={0.65}
                brightness={0.95}
                opacity={0.55}
              />
            </div>
            <div
              className="df-preloader-warp-layer"
              style={{ opacity: 0.22 + (progress / 100) * 0.58 }}
            >
              <WarpFieldBackground
                variant="hyperspace"
                speed={12 + (progress / 100) * 28}
                streakOpacity={0.55}
                tileOpacity={0.4}
              />
            </div>
          </ShaderSafeBoundary>
        </div>
      )}
      <div className="df-preloader-substrate-vignette" aria-hidden="true" />
      <div className="df-preloader-warp-flash" aria-hidden="true" />

      {/* ================================================================= */}
      {/* TOP HARDWARE HUD (CHAPTER COORDS + THREEUI IGNITION / SKIP)       */}
      {/* ================================================================= */}
      <div className="df-hud-top">
        <div className="df-hud-brand-chip">
          <GdgBracketsSvg width={24} height={14} />
          <span>
            GDG BELGAUM
            <span className="df-hud-hide-mobile"> • MOTHERBOARD REV 2026.11</span>
          </span>
          <span className="df-hud-hide-mobile" style={{ color: '#38bdf8' }}>
            15.8497° N, 74.4977° E
          </span>
        </div>

        <div className="df-hud-actions">
          <button
            type="button"
            onClick={() => setSoundOn(!soundOn)}
            className="df-keycap-btn"
            title="Toggle Hardware Synth Telemetry Audio"
          >
            <span>
              {soundOn ? '🔊' : '🔇'}
              <span className="df-hud-hide-mobile">{soundOn ? ' SFX ON' : ' SFX OFF'}</span>
            </span>
          </button>

          <button
            type="button"
            onClick={triggerWarpExit}
            className="df-keycap-btn"
            title="Skip Boot Sequence (Escape)"
          >
            <span>SKIP<span className="df-hud-hide-mobile"> INTRO</span></span>
            <span className="df-keycap-kbd df-hud-hide-mobile">ESC</span>
          </button>

          {!isMobile && (
            <ShaderSafeBoundary>
              <div className="df-threeui-ignition-wrap" title="Ignite Portal (ThreeUI Hardware Trigger)">
                <CircleButtons
                  variant="play"
                  mode="dark"
                  hue={195}
                  saturation={1.3}
                  brightness={1.1}
                  ariaLabel="Enter DevFest Belgaum 2026"
                  onClick={triggerWarpExit}
                />
              </div>
            </ShaderSafeBoundary>
          )}
        </div>
      </div>

      {/* ================================================================= */}
      {/* LAYER 2–5: MOBILE HOLOGRAPHIC PASS DECK vs DESKTOP MOTHERBOARD    */}
      {/* ================================================================= */}
      {isMobile ? (
        <div className="df-mobile-stage">
          <canvas ref={canvasRef} className="df-preloader-pcb-canvas" style={{ display: 'none' }} />

          <div className="df-mobile-card">
            {/* Top Header Row inside Mobile Holographic Card */}
            <div className="df-mobile-card__header">
              <div className="df-mobile-card__gdg">
                <GdgBracketsSvg width={24} height={14} />
                <span>Google Developer Groups</span>
              </div>
              <span className="df-core-city-pill">BELGAUM • KLS GIT</span>
            </div>

            {/* 3D Orbital Sphere Dial + 4-Color Google Ring + Active Tool */}
            <div className="df-mobile-orb-wrap">
              <div className="df-mobile-orb-lens" aria-hidden="true">
                <ShaderSafeBoundary>
                  <div className="df-reactor-threeui-orb">
                    <OrbitalSphereBackground
                      speed={1.3 + (progress / 100) * 1.6}
                      particleSize={0.022}
                      particleOpacity={0.9}
                      orbitOpacity={0.4}
                      scale={1.08}
                    />
                  </div>
                </ShaderSafeBoundary>
              </div>

              <svg viewBox="0 0 440 440" className="df-mobile-orb-svg" aria-hidden="true">
                <circle cx="220" cy="220" r={ringR} fill="none" stroke="#1E293B" strokeWidth="14" />
                <circle
                  cx="220"
                  cy="220"
                  r={ringR}
                  fill="none"
                  stroke="#EA4335"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={quadDash(0)}
                  transform="rotate(-135 220 220)"
                />
                <circle
                  cx="220"
                  cy="220"
                  r={ringR}
                  fill="none"
                  stroke="#FBBC04"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={quadDash(1)}
                  transform="rotate(-45 220 220)"
                />
                <circle
                  cx="220"
                  cy="220"
                  r={ringR}
                  fill="none"
                  stroke="#34A853"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={quadDash(2)}
                  transform="rotate(45 220 220)"
                />
                <circle
                  cx="220"
                  cy="220"
                  r={ringR}
                  fill="none"
                  stroke="#4285F4"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={quadDash(3)}
                  transform="rotate(135 220 220)"
                />
              </svg>

              <div className="df-mobile-orb-center">
                <div
                  className="df-mobile-orb-icon"
                  style={{
                    borderColor: activeNode.color,
                    boxShadow: `0 0 18px ${activeNode.glow}`,
                  }}
                >
                  <ToolDieSvg id={activeNode.id} />
                </div>
                <div className="df-mobile-orb-pct">{Math.round(progress)}%</div>
                <div className="df-mobile-orb-status">
                  {progress >= 100 ? 'READY' : 'BOOTING'}
                </div>
              </div>
            </div>

            {/* Brand Lockup */}
            <div className="df-mobile-brand">
              <h1 className="df-mobile-title">
                <span style={{ color: '#EA4335' }}>D</span>
                <span style={{ color: '#EA4335' }}>e</span>
                <span style={{ color: '#FBBC04' }}>v</span>
                <span style={{ color: '#FBBC04' }}>F</span>
                <span style={{ color: '#4285F4' }}>e</span>
                <span style={{ color: '#4285F4' }}>s</span>
                <span style={{ color: '#4285F4' }}>t</span>{' '}
                <span style={{ color: '#4285F4' }}>2</span>
                <span style={{ color: '#4285F4' }}>0</span>
                <span style={{ color: '#34A853' }}>2</span>
                <span style={{ color: '#34A853' }}>6</span>
              </h1>
              <div className="df-mobile-pillars">
                BUILD <span className="dot">•</span> SECURE <span className="dot">•</span> SCALE
              </div>
              <div className="df-mobile-sub">Developers &amp; Builders in the Agentic Era</div>
            </div>

            {/* Active Ecosystem Spotlight Card */}
            <div
              className="df-mobile-spotlight"
              style={{ borderColor: `${activeNode.color}66` }}
            >
              <div className="df-mobile-spotlight__top">
                <span
                  className="df-mobile-spotlight__badge"
                  style={{
                    backgroundColor: `${activeNode.color}24`,
                    color: activeNode.color,
                    border: `1px solid ${activeNode.color}66`,
                  }}
                >
                  {activeNode.shortLabel} • {activeNode.badgeText}
                </span>
                <span className="df-mobile-spotlight__sync">
                  {IC_NODES.filter((n) => progress >= n.threshold).length}/9 MODULES
                </span>
              </div>
              <div className="df-mobile-spotlight__track">{activeNode.trackInfo}</div>
            </div>

            {/* 9-Chip Ecosystem Dock Strip */}
            <div className="df-mobile-dock" role="group" aria-label="Google Developer Ecosystem Modules">
              {IC_NODES.map((node) => {
                const isUnlocked = progress >= node.threshold
                const isInspected = inspectedId === node.id
                return (
                  <button
                    key={node.id}
                    type="button"
                    className={`df-mobile-chip${isUnlocked ? ' is-unlocked' : ''}${
                      isInspected ? ' is-active' : ''
                    }`}
                    style={{
                      '--chip-color': node.color,
                      '--chip-glow': node.glow,
                    }}
                    onClick={() => {
                      setInspectedId(node.id)
                      playTone(660, 0.05)
                    }}
                    title={node.shortLabel}
                  >
                    <ToolDieSvg id={node.id} />
                  </button>
                )
              })}
            </div>

            {/* Progress Bar & Action Button */}
            <div className="df-mobile-progress-wrap">
              <div className="df-core-bar-track">
                <div className="df-core-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="df-mobile-log">{currentLog}</div>
            </div>

            <button
              type="button"
              onClick={triggerWarpExit}
              className="df-mobile-enter-btn"
            >
              <span>ENTER DEVFEST BELGAUM 2026</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ) : (
      <>
      <div ref={stageRef} className="df-preloader-stage">
        {/* Copper-Etched Silkscreen Heritage Watermarks */}
        <div className="df-preloader-silkscreen" aria-hidden="true">
          {/* Top-Left Belgaum Postal Heritage Stamp */}
          <svg viewBox="0 0 200 200" className="df-silk-stamp df-silk-stamp--tl">
            <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path
              d="M58 122V95H70V122M76 122V72L84 62L92 72V122M96 122V56L100 42L104 56V122M108 122V80H122V122M126 122V98H138V122M50 122H150"
              stroke="currentColor"
              strokeWidth="1.8"
              fill="none"
            />
            <text x="100" y="34" textAnchor="middle" fill="currentColor" fontSize="9.5" fontWeight="bold" letterSpacing="2.2">
              DEVFEST BELGAUM
            </text>
            <text x="100" y="168" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" letterSpacing="2">
              STAMPED • 2022–2026
            </text>
          </svg>

          {/* Bottom-Left 15+ Years of GDG Heritage Stamp */}
          <svg viewBox="0 0 220 220" className="df-silk-stamp df-silk-stamp--bl">
            <circle cx="110" cy="110" r="94" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="110" cy="110" r="82" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="130" cy="110" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M130 86V134M106 110H154M82 140L90 65L98 140M72 140H165" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <text x="110" y="42" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" letterSpacing="2.5">
              ★ GDG BELGAUM ★
            </text>
            <text x="110" y="182" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" letterSpacing="2">
              KLS GIT BELAGAVI
            </text>
          </svg>

          {/* Top-Right Shield Crest */}
          <svg viewBox="0 0 220 200" className="df-silk-stamp df-silk-stamp--tr">
            <path
              d="M110 16L185 40V102C185 148 110 184 110 184C110 184 35 148 35 102V40L110 16Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text x="110" y="54" textAnchor="middle" fill="currentColor" fontSize="10.5" fontWeight="bold" letterSpacing="2">
              DEVFEST 2026
            </text>
            <path d="M95 82L75 98L95 114" stroke="#4285F4" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M125 82L145 98L125 114" stroke="#FBBC04" strokeOpacity="0.4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <text x="110" y="148" textAnchor="middle" fill="currentColor" fontSize="8.5" letterSpacing="2.5">
              AGENTIC ERA
            </text>
          </svg>

          {/* Bottom-Right Silkscreen Graffiti & Revision Block */}
          <div className="df-silk-stamp df-silk-stamp--br">
            <div className="df-silk-graffiti">DevFest</div>
            <div className="df-silk-rev">#AgenticEra2026 // BUS-9X</div>
          </div>
        </div>

        {/* Full-Viewport 60fps HTML5 Canvas for 3-Lane 45° PCB Buses & Photon Packets */}
        <canvas ref={canvasRef} className="df-preloader-pcb-canvas" />

        {/* 9 Surface-Mounted QFP IC Chip Sockets */}
        <div className="df-preloader-nodes-layer">
          {IC_NODES.map((node) => {
            const isUnlocked = progress >= node.threshold
            const isInspected = inspectedId === node.id
            const leftPct = 50 + node.rx * 100
            const topPct = 50 + node.ry * 100

            return (
              <button
                key={node.id}
                type="button"
                className={`df-ic-socket ${isUnlocked ? 'is-unlocked' : 'is-locked'}${isInspected ? ' is-inspected' : ''}`}
                style={{
                  left: `${leftPct}%`,
                  top: `${topPct}%`,
                  '--node-color': node.color,
                  '--node-glow': node.glow,
                  '--node-glow-soft': node.glowSoft,
                }}
                onMouseEnter={() => {
                  hoveredIdRef.current = node.id
                  isHoveredRef.current = true
                  setIsHoveredNode(true)
                  setInspectedId(node.id)
                  playTone(620, 0.04)
                }}
                onMouseLeave={() => {
                  hoveredIdRef.current = null
                  isHoveredRef.current = false
                  setIsHoveredNode(false)
                }}
                onClick={() => {
                  setInspectedId(node.id)
                  playTone(660, 0.05)
                }}
              >
                <div className="df-ic-die-window">
                  <ToolDieSvg id={node.id} />
                  <span className="df-ic-led" />
                </div>
                <div className="df-ic-meta">
                  <div className="df-ic-title-row">
                    <span className="df-ic-name">{node.shortLabel}</span>
                    <span className="df-ic-pin-tag">
                      {isUnlocked ? 'SYNCED' : `${node.threshold}%`}
                    </span>
                  </div>
                  <div className="df-ic-sub">{node.badgeText}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* =============================================================== */}
        {/* CENTRAL MACHINED GOOGLE 4-COLOR REACTOR CORE + THREEUI ORB      */}
        {/* =============================================================== */}
        <div className="df-reactor-center-wrap">
          {/* Circular Glass Lens Cavity housing ThreeUI OrbitalSphereBackground */}
          <div className="df-reactor-lens-cavity" aria-hidden="true">
            <ShaderSafeBoundary>
              <div className="df-reactor-threeui-orb">
                <OrbitalSphereBackground
                  speed={1.2 + (progress / 100) * 1.8}
                  particleSize={0.018}
                  particleOpacity={0.85}
                  orbitOpacity={0.35}
                  scale={1.05}
                />
              </div>
            </ShaderSafeBoundary>
            <div className="df-reactor-lens-glare" />
          </div>

          {/* Precision-Machined Multi-Ring SVG Assembly */}
          <svg viewBox="0 0 440 440" className="df-reactor-svg" aria-hidden="true">
            <defs>
              <filter id="dfCorePipeBloom" x="-25%" y="-25%" width="150%" height="150%">
                <feGaussianBlur stdDeviation="5.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Top Telemetry Arc above Core (matching reference artwork) */}
            <g opacity="0.55">
              <path
                d="M 82 110 A 198 198 0 0 1 358 110"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.4"
                strokeDasharray="3 6"
              />
              <path
                d="M 98 122 A 184 184 0 0 1 342 122"
                fill="none"
                stroke="#475569"
                strokeWidth="8"
                strokeDasharray="12 9"
                strokeOpacity="0.4"
              />
            </g>

            {/* Outer Rotating Vernier Azimuthal Degree Ticks */}
            <g className="df-ring-spin-cw" opacity="0.48">
              <circle
                cx="220"
                cy="220"
                r="198"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.2"
                strokeDasharray="6 12 2 12"
              />
              {Array.from({ length: 36 }).map((_, i) => {
                const a = (i * 10 * Math.PI) / 180
                const r1 = 186
                const r2 = i % 3 === 0 ? 194 : 190
                return (
                  <line
                    key={i}
                    x1={220 + Math.cos(a) * r1}
                    y1={220 + Math.sin(a) * r1}
                    x2={220 + Math.cos(a) * r2}
                    y2={220 + Math.sin(a) * r2}
                    stroke={i % 3 === 0 ? '#38BDF8' : '#64748B'}
                    strokeWidth={i % 3 === 0 ? '1.6' : '1'}
                  />
                )
              })}
            </g>

            {/* Counter-Rotating Inner Reticle Ring */}
            <g className="df-ring-spin-ccw" opacity="0.35">
              <circle
                cx="220"
                cy="220"
                r="160"
                fill="none"
                stroke="#A855F7"
                strokeWidth="1.4"
                strokeDasharray="4 10"
              />
            </g>

            {/* Base Dark Machined Light-Pipe Channel */}
            <circle
              cx="220"
              cy="220"
              r={ringR}
              fill="none"
              stroke="#1E293B"
              strokeWidth="11"
            />

            {/* 4 Segmented Google Color Light Pipes */}
            <circle
              cx="220"
              cy="220"
              r={ringR}
              fill="none"
              stroke="#EA4335"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={quadDash(0)}
              transform="rotate(-135 220 220)"
              filter="url(#dfCorePipeBloom)"
            />
            <circle
              cx="220"
              cy="220"
              r={ringR}
              fill="none"
              stroke="#FBBC04"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={quadDash(1)}
              transform="rotate(-45 220 220)"
              filter="url(#dfCorePipeBloom)"
            />
            <circle
              cx="220"
              cy="220"
              r={ringR}
              fill="none"
              stroke="#34A853"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={quadDash(2)}
              transform="rotate(45 220 220)"
              filter="url(#dfCorePipeBloom)"
            />
            <circle
              cx="220"
              cy="220"
              r={ringR}
              fill="none"
              stroke="#4285F4"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={quadDash(3)}
              transform="rotate(135 220 220)"
              filter="url(#dfCorePipeBloom)"
            />
          </svg>

          {/* Center Core Brand Lockup & Telemetry Readout */}
          <div className="df-reactor-content">
            <div className="df-core-gdg-row">
              <GdgBracketsSvg width={30} height={17} />
              <span className="df-core-gdg-text">Google Developer Groups</span>
            </div>
            <span className="df-core-city-pill">BELGAUM • KLS GIT</span>

            <h1 className="df-core-title">
              <span style={{ color: '#EA4335' }}>D</span>
              <span style={{ color: '#EA4335' }}>e</span>
              <span style={{ color: '#FBBC04' }}>v</span>
              <span style={{ color: '#FBBC04' }}>F</span>
              <span style={{ color: '#4285F4' }}>e</span>
              <span style={{ color: '#4285F4' }}>s</span>
              <span style={{ color: '#4285F4' }}>t</span>{' '}
              <span style={{ color: '#4285F4' }}>2</span>
              <span style={{ color: '#4285F4' }}>0</span>
              <span style={{ color: '#34A853' }}>2</span>
              <span style={{ color: '#34A853' }}>6</span>
            </h1>

            <div className="df-core-theme-caption">Season’s official theme</div>
            <div className="df-core-pillars">
              BUILD<span className="dot">•</span>SECURE<span className="dot">•</span>SCALE
            </div>
            <div className="df-core-era-sub">
              Developers and Builders in the Agentic Era
            </div>

            <div className="df-core-telemetry-box">
              <div className="df-core-readout-row">
                <span className="df-core-status-tag">
                  <span className="df-core-status-dot" />
                  {progress >= 100
                    ? 'LOCKED'
                    : isHoveredNode
                      ? 'INSPECTING DIE'
                      : 'CHARGING CORE'}
                </span>
                <span className="df-core-pct">{Math.round(progress)}%</span>
              </div>
              <div className="df-core-bar-track">
                <div
                  className="df-core-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="df-core-log-line">{currentLog}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* BOTTOM DIE-TELEMETRY HUD STRIP                                    */}
      {/* ================================================================= */}
      <div className="df-hud-bottom">
        <div className="df-telemetry-strip">
          <div className="df-telemetry-node-info">
            <ToolDieSvg id={activeNode.id} />
            <span
              className="df-telemetry-badge"
              style={{
                backgroundColor: `${activeNode.color}22`,
                color: activeNode.color,
                border: `1px solid ${activeNode.color}55`,
              }}
            >
              {activeNode.shortLabel} • {activeNode.badgeText}
            </span>
            <span className="df-telemetry-track">{activeNode.trackInfo}</span>
          </div>
          <div className="df-telemetry-code">$ {activeNode.codeSnippet}</div>
        </div>
      </div>
      </>
      )}
    </div>
  )
}
