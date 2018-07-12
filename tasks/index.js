module.exports = (method) => async (inputs, { success, error }) => {
  try {
    const data = await method(inputs)
    return success(data)
  } catch (err) {
    console.error(err)
    return error({message: err.toString()})
  }
}
