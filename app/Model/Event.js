'use strict'

const Lucid = use('Lucid')

class Event extends Lucid {
  static scopeActive (builder) {
    builder.where('deleted', 0)
  }

}

module.exports = Event
