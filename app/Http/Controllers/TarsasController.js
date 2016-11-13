'use strict'

const Tarsas = use('App/Model/Tarsas')
const User = use('App/Model/User')
const Validator = use('Validator')
const Helpers = use('Helpers')
const fs = use('fs')

class TarsasController {
  /**
   *
   */
  * main (request, response) {
    // load all categories
    const tarsasok = yield Tarsas.all()

    // for each category load the last 3 recipes
    for (let tarsas of tarsasok) {
      const latestTarsasok = yield tarsas.active().orderBy('id', 'desc').limit(3).fetch()
      tarsasok.latestTarsasok = latestTarsasok.toJSON()
    }

    yield response.sendView('main', {
      tarsasok: tarsasok
        .filter(tarsas => tarsasok.latestTarsasok.length > 0)
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
    const tarsasok = yield Tarsas.all()

    yield response.sendView('tarsas_create', { tarsasok: tarsasok.toJSON() })
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
    const recipe = yield Recipe.find(recipeId)

    if (recipe) {
      yield recipe.related('category').load()
      yield recipe.related('created_by').load()

      const fileName = `/images/${recipe.id}.jpg`
      const imageExists = yield fileExists(`${Helpers.publicPath()}/${fileName}`)
      const recipeImage = imageExists ? fileName : false

      yield response.sendView('recipe', { recipe: recipe.toJSON(), recipeImage })
    } else {
      response.notFound('Recipe not found.')
    }
  }

  /**
   *
   */
  * edit (request, response) {
    const recipeId = request.param('id')
    const recipe = yield Recipe.find(recipeId)


    if (!recipe || recipe.deleted == true) {
      yield response.notFound('Recipe not found.')
      return;
    }

    if (recipe.created_by_id !== request.currentUser.id) {
      response.unauthorized('Access denied.')
    }

    yield recipe.related('category').load()
    yield recipe.related('created_by').load()

    const categories = yield Category.all()

    yield response.sendView('recipe_edit', { categories: categories.toJSON(), recipe: recipe.toJSON() })
  }

  /**
   *
   */
  * doEdit (request, response) {
    const recipeId = request.param('id')
    const recipe = yield Recipe.find(recipeId)

    if (!recipe || recipe.deleted) {
      yield response.notFound('Recipe not found.')
      return;
    }

    if (recipe.created_by_id !== request.currentUser.id) {
      yield response.unauthorized('Access denied.')
      return;
    }

    const recipeData = request.all()
    const validation = yield Validator.validateAll(recipeData, {
      name: 'required',
      description: 'required',
      ingredients: 'required'
    })

    if (validation.fails()) {
      yield request
        .with({ errors: validation.messages() })
        .flash()

      yield response.route('recipe_edit', {id: recipe.id})
      return;
    }
    const category = yield Category.find(recipeData.category)

    if (!category) {
      yield request
        .with({ errors: [{ message: 'category doesn\'t exist' }] })
        .flash()

      yield response.route('recipe_edit', {id: recipe.id})
      return;
    }
    const recipeImage = request.file('image', { maxSize: '1mb', allowedExtensions: ['jpg', 'JPG'] })

    if (recipeImage.clientSize() > 0) {
      yield recipeImage.move(Helpers.publicPath() + '/images', `${recipe.id}.jpg`)

      if (!recipeImage.moved()) {
        yield request
          .with({ errors: [{ message: recipeImage.errors() }] })
          .flash()

        response.route('recipe_edit', {id: recipe.id})
        return
      }
    }

    recipe.name = recipeData.name
    recipe.description = recipeData.description
    recipe.ingredients = recipeData.ingredients
    recipe.category_id = recipeData.category

    yield recipe.update()

    response.route('recipe_page', { id: recipe.id })

  }

  /**
   *
   */
  * doDelete (request, response) {
    const recipeId = request.param('id')
    const recipe = yield Recipe.find(recipeId)

    if (recipe) {
      if (recipe.created_by_id !== request.currentUser.id) {
        response.unauthorized('Access denied.')
      }

      recipe.deleted = true
      yield recipe.update()

      response.route('main')
    } else {
      response.notFound('Recipe not found.')
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

module.exports = RecipeController
