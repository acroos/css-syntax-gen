export function randomString(length: number): string {
  if (length <= 0) {
    throw new Error("Cannot generate string of zero-or-less length")
  }

  let firstCharOptions = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let allOtherChars = `${firstCharOptions}0123456789_-`

  let str = firstCharOptions.charAt(Math.floor(Math.random() * firstCharOptions.length))
  for (let i = 1; i < length; i++) {
    str += allOtherChars.charAt(Math.floor(Math.random() * allOtherChars.length))
  }

  return str
}
