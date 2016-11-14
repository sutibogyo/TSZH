'use strict'

const Lucid = use('Lucid')

class Rendezveny extends Lucid {
  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

}

module.exports = Rendezveny
