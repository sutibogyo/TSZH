'use strict'

const Lucid = use('Lucid')

class User extends Lucid {
  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  tarsasok () {
    return this.hasMany('App/Model/Tarsas')
  }

  rendezvenyek () {
    return this.hasMany('App/Model/Rendezveny')
  }
}

module.exports = User
