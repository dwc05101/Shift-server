const cleanNullArgs = (args: object): object => {
  const validArgs = {}
  Object.keys(args).forEach(key => {
    if (args[key] !== null) {
      validArgs[key] = args[key]
    }
  })
  return validArgs
}

export default cleanNullArgs
