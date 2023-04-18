type EnvProps = {
  API_BASE_URL: string
  USE_MOCKS: boolean
}

export const env = Object.freeze<EnvProps>({
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USE_MOCKS: import.meta.env.VITE_USE_MOCKS === 'true'
})
