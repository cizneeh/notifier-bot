const { getFiles } = require('../utils/functions.js')

module.exports = (bot, reload) => {
  const { client } = bot

  let eventNames = getFiles('./events', '.js')

  if (eventNames.length === 0) {
    console.log('No events to load')
  }

  eventNames.forEach((f, i) => {
    // delete cache if reloading
    if (reload) delete require.cache[require.resolve('../event/${f}')]

    const event = require(`../events/${f}`)
    client.events.set(event.name, event)

    if (!reload) console.log(`${i + 1}. ${f} loaded`)
  })

  // we only want to initialize event listenrs at the very beginning
  // otherwise we'll have extra event listeners (duplicates)
  if (!reload) initEvents(bot)
}

function triggerEventHandler(bot, eventName, ...args) {
  const { client } = bot
  try {
    if (client.events.has(eventName)) client.events.get(eventName).run(bot, ...args)
    else throw new Error(`Event ${eventName} does not exists`)
  } catch (e) {
    console.error(e)
  }
}

// initialize all of our event handlets
function initEvents(bot) {
  const { client } = bot
  client.on('ready', () => {
    triggerEventHandler(bot, 'ready')
  })

  client.on('messageCreate', message => {
    triggerEventHandler(bot, 'messageCreate', message)
  })
}
