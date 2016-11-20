'use strict'

const Visit = use('App/Model/Visit')
const User = use('App/Model/User')
const Validator = use('Validator')
const Helpers = use('Helpers')
const fs = use('fs')

class VisitController {
  /**
   *
   */
  * main(request, response) {
    // load all categories
    const events = yield Visit.all()


    yield response.sendView('main', {
      visits: visits.toJSON()
    })
  }

  /**
   *
   */
  * index(request, response) {
    // Kereső
    response.route('main')
  }

  /**
   *
   */
  * create(request, response) {
    const visits = yield Visit.all()

    yield response.sendView('visit_create', {visits: visits.toJSON()})
  }

  /**
   *
   */
  * doCreate(request, response) {
    console.log("#######VisitController:doCreate")
    const visitData = request.all()
    console.log("#######VisitController:doCreate",visitData)


    const visit = new Visit()
    visit.eventId = visitData.eventId
    visit.userId = request.currentUser.id

    // TODO: these lines should be executed atomically
    yield visit.save()

    response.route('event_page', {id: visitData.eventId})
  }

  /**
   *
   */
  * show(request, response) {
    const eventId = request.param('id')
    const event = yield Event.find(eventId)

    if (event) {

      yield response.sendView('event', {event: event.toJSON()})
    } else {
      response.notFound('Event not found.')
    }
  }


  * list(request, response) {

    const events = yield Event.all();
    yield response.sendView('event_list', {
      events: events.toJSON()
    })
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

module.exports = VisitController
