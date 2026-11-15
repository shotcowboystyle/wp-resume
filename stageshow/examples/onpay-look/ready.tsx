import { useEffect, useState, type ComponentType } from 'react'

// The kit measures text to size buttons and rolling values, so an OnPay stage
// mounts once Poppins is ready; measured with the fallback face, labels clip.
export function withFonts(Scene: ComponentType): ComponentType {
  return function Ready() {
    const [ok, setOk] = useState(false)
    useEffect(() => {
      Promise.all(['400 14px Poppins', '500 14px Poppins', '600 14px Poppins'].map((f) => document.fonts.load(f))).then(() => setOk(true))
    }, [])
    return ok ? <Scene /> : null
  }
}
