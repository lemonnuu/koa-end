module.exports = (buffer) => {
  return Buffer.from(buffer, 'utf8').toString('base64')
}
