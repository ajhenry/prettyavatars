/* eslint-disable @typescript-eslint/no-explicit-any */
import useEventListener from '@use-it/event-listener'
import { useCallback, useEffect, useMemo } from 'react'

import { useState } from 'react'
import createPersistedState from 'use-persisted-state'

const globalWindow = typeof window === 'undefined' ? undefined : window

const noop = () => {
  // do nothing
}

const mockElement = {
  classList: {
    add: noop,
    remove: noop,
  },
}

const preferDarkQuery = '(prefers-color-scheme: dark)'

const initialize = (
  storageKey: string,
  storageProvider: any,
  glbl = globalWindow
) => {
  const usePersistedDarkModeState = storageKey
    ? createPersistedState(storageKey, storageProvider)
    : useState

  const mql: any = glbl?.matchMedia ? glbl.matchMedia(preferDarkQuery) : {}

  const mediaQueryEventTarget = {
    addEventListener: (_: any, handler: any) =>
      mql.addListener && mql.addListener(handler),
    removeEventListener: (_: any, handler: any) =>
      mql.removeListener && mql.removeListener(handler),
  }

  const isColorSchemeQuerySupported = mql.media === preferDarkQuery

  const getInitialValue = (usersInitialState: any) =>
    isColorSchemeQuerySupported ? mql.matches : usersInitialState

  // Mock element if SSR else real body element.
  const defaultElement = (glbl?.document && glbl.document.body) || mockElement

  const getDefaultOnChange =
    (
      element = defaultElement,
      classNameDark = 'dark-mode',
      classNameLight = 'light-mode'
    ) =>
    (val: any) => {
      element.classList.add(val ? classNameDark : classNameLight)
      element.classList.remove(val ? classNameLight : classNameDark)
    }

  return {
    usePersistedDarkModeState,
    getDefaultOnChange,
    mediaQueryEventTarget,
    getInitialValue,
  }
}

const useDarkMode = (
  initialValue = false,
  {
    element,
    classNameDark,
    classNameLight,
    onChange,
    storageKey = 'darkMode',
    storageProvider,
    global,
  } = {} as any
) => {
  const {
    usePersistedDarkModeState,
    getDefaultOnChange,
    getInitialValue,
    mediaQueryEventTarget,
  } = useMemo(
    () => initialize(storageKey, storageProvider, global),
    [storageKey, storageProvider, global]
  )

  const [state, setState] = usePersistedDarkModeState(
    getInitialValue(initialValue)
  )

  const stateChangeCallback = useMemo(
    () =>
      onChange || getDefaultOnChange(element, classNameDark, classNameLight),
    [onChange, element, classNameDark, classNameLight, getDefaultOnChange]
  )

  // Call the onChange handler
  useEffect(() => {
    stateChangeCallback(state)
  }, [stateChangeCallback, state])

  // Listen for media changes and set state.
  useEventListener(
    'change',
    ({ matches }: any) => setState(matches),
    mediaQueryEventTarget as any
  )

  // Listen for media changes and set state.
  useEventListener('change', ({ matches }: any) => setState(matches))

  return {
    value: state,
    enable: useCallback(() => setState(true), [setState]),
    disable: useCallback(() => setState(false), [setState]),
    toggle: useCallback(() => setState((current: any) => !current), [setState]),
  }
}

export default useDarkMode
