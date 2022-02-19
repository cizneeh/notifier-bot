// TODO: このnameと、ファイル名が完全に一致しないとダメ。何故だっけ？？
module.exports = {
  name: 'ready',
  run: async bot => {
    console.log('Logged in as ' + bot.client.user.tag)
  },
}
