'use strict'

const Lucid = use('Lucid')

class Visit extends Lucid {
  static scopeActive (builder) {
    builder.where('deleted', 0)
  }

}

module.exports = Visit
