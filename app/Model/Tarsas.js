'use strict'

const Lucid = use('Lucid')

class Tarsas extends Lucid {
  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = Tarsas
