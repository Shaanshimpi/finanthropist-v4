import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type ThemeVars = Record<string, string>

type MobileInstructorThemeOptions = {
  markers?: boolean
  start?: string
  end?: string
  duration?: number
  ease?: gsap.TweenVars['ease']
  lightTheme: ThemeVars
  darkTheme: ThemeVars
  lightGlobalTheme?: ThemeVars
  darkGlobalTheme?: ThemeVars
  globalTarget?: HTMLElement | null
  classNames?: {
    light: string
    dark: string
  }
}

const applyThemeInstant = (target: HTMLElement, theme: ThemeVars) => {
  Object.entries(theme).forEach(([key, value]) => {
    target.style.setProperty(key, value)
  })
}

export const initMobileInstructorTheme = (
  container: HTMLElement,
  options: MobileInstructorThemeOptions
) => {
  if (typeof window === 'undefined') return () => {}

  const {
    markers = false,
    start = 'top center',
    end = 'bottom center',
    duration = 0.6,
    ease = 'power2.inOut',
    lightTheme,
    darkTheme,
    lightGlobalTheme,
    darkGlobalTheme,
    globalTarget,
    classNames,
  } = options

  if (!container) return () => {}

  const resolvedGlobalTarget =
    globalTarget ?? (typeof document !== 'undefined' ? document.documentElement : null)

  const resolvedClassNames = classNames ?? {
    light: 'mobile-theme-light',
    dark: 'mobile-theme-dark',
  }

  const body = typeof document !== 'undefined' ? document.body : null

  applyThemeInstant(container, darkTheme)
  if (resolvedGlobalTarget && darkGlobalTheme) {
    applyThemeInstant(resolvedGlobalTarget, darkGlobalTheme)
  }
  if (resolvedGlobalTarget) {
    resolvedGlobalTarget.classList.remove(resolvedClassNames.light)
    resolvedGlobalTarget.classList.add(resolvedClassNames.dark)
  }
  if (body) {
    body.classList.remove(resolvedClassNames.light)
    body.classList.add(resolvedClassNames.dark)
  }

  const animateTheme = (theme: ThemeVars, globalTheme?: ThemeVars, toLight?: boolean) => {
    const targets: Array<{ element: HTMLElement; vars: ThemeVars }> = [{ element: container, vars: theme }]
    if (resolvedGlobalTarget && globalTheme) {
      targets.push({ element: resolvedGlobalTarget, vars: globalTheme })
    }

    targets.forEach(({ element, vars }) => {
      gsap.to(element, {
        duration,
        ease,
        overwrite: 'auto',
        ...vars,
      })
    })

    if (resolvedGlobalTarget) {
      if (toLight) {
        resolvedGlobalTarget.classList.add(resolvedClassNames.light)
        resolvedGlobalTarget.classList.remove(resolvedClassNames.dark)
      } else {
        resolvedGlobalTarget.classList.add(resolvedClassNames.dark)
        resolvedGlobalTarget.classList.remove(resolvedClassNames.light)
      }
    }
    if (body) {
      if (toLight) {
        body.classList.add(resolvedClassNames.light)
        body.classList.remove(resolvedClassNames.dark)
      } else {
        body.classList.add(resolvedClassNames.dark)
        body.classList.remove(resolvedClassNames.light)
      }
    }
  }

  const playLight = () => animateTheme(lightTheme, lightGlobalTheme, true)
  const playDark = () => animateTheme(darkTheme, darkGlobalTheme, false)

  const trigger = ScrollTrigger.create({
    trigger: container,
    start,
    end,
    markers,
    onEnter: playLight,
    onEnterBack: playLight,
    onLeaveBack: playDark,
    onLeave: playDark,
  })

  return () => {
    trigger.kill()
    applyThemeInstant(container, darkTheme)
    if (resolvedGlobalTarget && darkGlobalTheme) {
      applyThemeInstant(resolvedGlobalTarget, darkGlobalTheme)
    }
    if (resolvedGlobalTarget) {
      resolvedGlobalTarget.classList.remove(resolvedClassNames.light)
      resolvedGlobalTarget.classList.add(resolvedClassNames.dark)
    }
    if (body) {
      body.classList.remove(resolvedClassNames.light)
      body.classList.add(resolvedClassNames.dark)
    }
  }
}

export default initMobileInstructorTheme

