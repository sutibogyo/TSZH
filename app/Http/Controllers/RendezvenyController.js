'use strict'

const Rendezveny = use('App/Model/Rendezveny')
const User = use('App/Model/User')
const Validator = use('Validator')
const Helpers = use('Helpers')
const fs = use('fs')

class RendezvenyController {
  /**
   *
   */
  * main (request, response) {
    // load all categories
    const rendezvenyek = yield Rendezveny.all()

    // for each category load the last 3 recipes
    for (let rendezveny of rendezvenyek) {
      const latestRendezvenyek = yield rendezveny.active().orderBy('id', 'desc').limit(3).fetch()
      rendezvenyek.latestRendezvenyek = latestRendezvenyek.toJSON()
    }

    yield response.sendView('main', {
      rendezvenyek: rendezvenyek
        .filter(rendezveny => rendezvenyek.latestTarsasok.length > 0)
        .toJSON()
    })
  }

  /**
   *
   */
  * index (request, response) {
    // Kereső
    response.route('main')
  }

  /**
   *
   */
  * create (request, response) {
    const rendezvenyek = yield Rendezveny.all()

    yield response.sendView('rendezveny_create', { rendezvenyek: rendezvenyek.toJSON() })
  }

  /**
   *
   */
  * doCreate (request, response) {
    const rendezvenyData = request.all()
    const validation = yield Validator.validateAll(rendezvenyData, {
      name: 'required',
      description: 'required'
    })

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.route('rendezveny_create')
      return;
    }

    response.route('rendezveny_create')
    return;



    const rendezveny = new Rendezveny()
    rendezveny.name = rendezvenyData.name
    rendezveny.description = rendezvenyData.description

    // TODO: these lines should be executed atomically
    yield rendezveny.save()

    response.route('rendezveny_page', { id: rendezveny.id })
  }

  /**
   *
   */
  * show (request, response) {
    const rendezvenyId = request.param('id')
    const rendezveny = yield Rendezveny.find(rendezvenyId)

    if (rendezveny) {

      yield response.sendView('rendezveny', { rendezveny: rendezveny.toJSON() })
    } else {
      response.notFound('Rendezveny not found.')
    }
  }

  /**
   *
   */
  * edit (request, response) {
    const rendezvenyId = request.param('id')
    const rendezveny = yield Rendezveny.find(rendezvenyId)


    if (!rendezveny || rendezveny.deleted == true) {
      yield response.notFound('Rendezveny not found.')
      return;
    }

    if (request.currentUser.isAdmin) {
      response.unauthorized('Access denied.')
    }


    yield response.sendView('rendezveny_edit', {rendezveny: rendezveny.toJSON() })
  }

  /**
   *
   */
  * doEdit (request, response) {
    const rendezvenyId = request.param('id')
    const rendezveny = yield Rendezveny.find(rendezvenyId)

    if (!rendezveny || rendezveny.deleted) {
      yield response.notFound('Rendezveny not found.')
      return;
    }

    if (request.currentUser.isAdmin) {
      yield response.unauthorized('Access denied.')
      return;
    }

    const rendezvenyData = request.all()
    const validation = yield Validator.validateAll(rendezvenyData, {
      name: 'required',
      description: 'required'
    })

    if (validation.fails()) {
      yield request
        .with({ errors: validation.messages() })
        .flash()

      yield response.route('rendezveny_edit', {id: rendezveny.id})
      return;
    }




    rendezveny.name = rendezvenyData.name
    rendezveny.description = rendezvenyData.description


    yield rendezveny.update()

    response.route('rendezveny_page', { id: rendezveny.id })

  }

  /**
   *
   */
  * doDelete (request, response) {
    const rendezvenyId = request.param('id')
    const rendezveny = yield Rendezveny.find(rendezvenyId)

    if (rendezveny) {
      if ( request.currentUser.isAdmin) {
        response.unauthorized('Access denied.')
      }

      rendezveny.deleted = true
      yield rendezveny.update()

      response.route('main')
    } else {
      response.notFound('Rendezveny not found.')
    }
  }
}

function fileExists(fileName) {
  return new Promise((resolve, reject) => {
    fs.access(fileName, fs.constants.F_OK, err => {
      if (err) resolve(false)
      else resolve(true)
    })
  })
}

module.exports = RendezvenyController
