'use strict'

const Lucid = use('Lucid')

class Rendezveny extends Lucid {
  static scopeActive (builder) {
    builder.where('deleted', 0)
  }

}

module.exports = Rendezveny
