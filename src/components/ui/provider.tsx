"use client"

import {ChakraProvider, createSystem, defaultConfig, defineConfig} from "@chakra-ui/react"
import {ColorModeProvider, type ColorModeProviderProps,} from "./color-mode"

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "teal",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: "var(--font-inter)" },
        body: { value: "var(--font-inter)" },
        mono: { value: "var(--font-jetbrains-mono)" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
