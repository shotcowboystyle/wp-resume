// Mounts OnPay stageshow scenes into WordPress `cb/stage` blocks. The block
// server-renders a sized poster image; this module (loaded by the block's view
// script only when a stage nears the viewport and motion is allowed) renders the
// live scene over it, then marks the host so CSS fades the poster out.
import type { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from '../examples/onpay-dashboard/scene'
import Expert from '../examples/onpay-expert/scene'

const SCENES: Record<string, ComponentType> = { 'onpay-dashboard': Dashboard, 'onpay-expert': Expert }

// The kit measures text to fit buttons and rolling values; measured with the
// fallback face, labels clip. The theme serves Poppins, so wait for it.
const fonts = Promise.all(['400 14px Poppins', '500 14px Poppins', '600 14px Poppins'].map((f) => document.fonts.load(f)))

export async function mount(host: HTMLElement) {
  const Scene = SCENES[host.dataset.stageshow ?? '']
  const live = host.querySelector<HTMLElement>('.wp-block-cb-stage__live')
  if (!Scene || !live || host.dataset.mounted) return
  host.dataset.mounted = 'pending'
  await fonts
  createRoot(live).render(<Scene />)
  // Two frames: the stage has measured and painted before the poster leaves.
  requestAnimationFrame(() => requestAnimationFrame(() => (host.dataset.mounted = 'live')))
}
