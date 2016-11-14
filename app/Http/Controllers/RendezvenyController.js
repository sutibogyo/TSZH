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
    const tarsasData = request.all()
    const validation = yield Validator.validateAll(tarsasData, {
      name: 'required',
      description: 'required',
      ingredients: 'required'
    })

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.route('tarsas_create')
      return;
    }

    response.route('tarsas_create')
    return;



    const tarsas = new Tarsas()
    tarsas.name = tarsasData.name
    tarsas.description = tarsasData.description

    // TODO: these lines should be executed atomically
    yield tarsas.save()

    response.route('tarsas_page', { id: tarsas.id })
  }

  /**
   *
   */
  * show (request, response) {
    const tarsasId = request.param('id')
    const tarsas = yield Tarsas.find(tarsasId)

    if (tarsas) {

      yield response.sendView('tarsas', { tarsas: tarsas.toJSON() })
    } else {
      response.notFound('Tarsas not found.')
    }
  }

  /**
   *
   */
  * edit (request, response) {
    const tarsasId = request.param('id')
    const tarsas = yield Tarsas.find(tarsasId)


    if (!tarsas || tarsas.deleted == true) {
      yield response.notFound('Tarsas not found.')
      return;
    }

    if (request.currentUser.isAdmin) {
      response.unauthorized('Access denied.')
    }


    yield response.sendView('tarsas_edit', {tarsas: tarsas.toJSON() })
  }

  /**
   *
   */
  * doEdit (request, response) {
    const tarsasId = request.param('id')
    const tarsas = yield Tarsas.find(tarsasId)

    if (!tarsas || tarsas.deleted) {
      yield response.notFound('Tarsas not found.')
      return;
    }

    if (request.currentUser.isAdmin) {
      yield response.unauthorized('Access denied.')
      return;
    }

    const tarsaseData = request.all()
    const validation = yield Validator.validateAll(tarsaseData, {
      name: 'required',
      description: 'required'
    })

    if (validation.fails()) {
      yield request
        .with({ errors: validation.messages() })
        .flash()

      yield response.route('tarsas_edit', {id: tarsas.id})
      return;
    }




    tarsas.name = tarsasData.name
    tarsas.description = tarsasData.description


    yield tarsas.update()

    response.route('tarsas_page', { id: tarsas.id })

  }

  /**
   *
   */
  * doDelete (request, response) {
    const tarsasId = request.param('id')
    const tarsas = yield Tarsas.find(tarsasId)

    if (tarsas) {
      if ( request.currentUser.isAdmin) {
        response.unauthorized('Access denied.')
      }

      tarsas.deleted = true
      yield tarsas.update()

      response.route('main')
    } else {
      response.notFound('Tarsas not found.')
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

module.exports = TarsasController
