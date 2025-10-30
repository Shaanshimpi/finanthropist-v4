export const getCenteredTopOffset = (): string => {
  const offset = Math.round(window.innerHeight * 0.25)
  return `top+=-${offset} center`
}


