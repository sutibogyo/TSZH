'use strict'

const Event = use('App/Model/Event')
const User = use('App/Model/User')
const Validator = use('Validator')
const Helpers = use('Helpers')
const fs = use('fs')

class EventController {
  /**
   *
   */
  * main (request, response) {
    // load all categories
    const events = yield Event.all()


    yield response.sendView('main', {
      events: events.toJSON()
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
    const events = yield Event.all()

    yield response.sendView('event_create', { events: events.toJSON() })
  }

  /**
   *
   */
  * doCreate (request, response) {
    const eventData = request.all()
    const validation = yield Validator.validateAll(eventData, {
      name: 'required',
      description: 'required',
      date: 'required'
    })

    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.route('event_create')
      return;
    }

    const event = new Event()
    event.name = eventData.name
    event.description = eventData.description
    event.date=eventData.date

    // TODO: these lines should be executed atomically
    yield event.save()

    response.route('event_page', { id: event.id })
  }

  /**
   *
   */
  * show (request, response) {
    const eventId = request.param('id')
    const event = yield Event.find(eventId)

    if (event) {

      yield response.sendView('event', { event: event.toJSON() })
    } else {
      response.notFound('Event not found.')
    }
  }


  * list (request, response) {

    const events = yield Event.all();
    yield response.sendView('event_list', {
      events: events.toJSON()
    })
  }
  /**
   *
   */
  * edit (request, response) {
    const eventId = request.param('id')
    const event = yield Event.find(eventId)


    if (!event || event.deleted == true) {
      yield response.notFound('Event not found.')
      return;
    }

    if (!request.currentUser.isAdmin) {
      response.unauthorized('Access denied.')
    }


    yield response.sendView('event_edit', {event: event.toJSON() })
  }

  /**
   *
   */
  * doEdit (request, response) {
    const eventId = request.param('id')
    const event = yield Event.find(eventId)

    if (!event || event.deleted) {
      yield response.notFound('Event not found.')
      return;
    }

    if (!request.currentUser.isAdmin) {
      yield response.unauthorized('Access denied.')
      return;
    }

    const eventData = request.all()
    const validation = yield Validator.validateAll(eventData, {
      name: 'required',
      description: 'required',
      date:'required'
    })

    if (validation.fails()) {
      yield request
        .with({ errors: validation.messages() })
        .flash()

      yield response.route('event_edit', {id: event.id})
      return;
    }




    event.name = eventData.name
    event.description = eventData.description
    event.date =eventData.date


    yield event.update()

    response.route('event_page', { id: event.id })

  }

  /**
   *
   */
  * doDelete (request, response) {
    const eventId = request.param('id')
    const event = yield Event.find(eventId)

    if (event) {
      if ( !request.currentUser.isAdmin) {
        response.unauthorized('Access denied.')
      }

      event.deleted = true
      yield event.update()

      response.route('main')
    } else {
      response.notFound('Event not found.')
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

module.exports = EventController
