export const formatTemp = (temp: number): string => temp.toFixed(0).toString()

export const getCurrentLatLong = (
  navigator: Navigator
): Promise<{ latitude: number; longitude: number }> =>
  new Promise((res, rej) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        res({ latitude, longitude })
      })
    } else {
      rej('Geolocation API is not availabel')
    }
  })
