export const freeze = (time = 2 * 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })
