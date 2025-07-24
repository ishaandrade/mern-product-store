import { createSystem, defaultConfig } from '@chakra-ui/react'

const customConfig = {
  ...defaultConfig,
  globalCss: {
    body: {
      bg: { base: 'white', _dark: 'gray.900' }, 
    },
  },
}

export const system = createSystem(customConfig, {
  colorMode: {
    initialColorMode: 'light', 
  },
})