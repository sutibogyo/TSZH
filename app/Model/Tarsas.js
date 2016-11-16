'use strict'

const Lucid = use('Lucid')

class Tarsas extends Lucid {
  static scopeActive (builder) {
    builder.where('deleted', 0)
  }

}

module.exports = Tarsas
