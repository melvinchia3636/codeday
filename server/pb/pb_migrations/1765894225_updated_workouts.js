/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("workouts31415926")

  // remove field
  collection.fields.removeById("number_effort")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("workouts31415926")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number_effort",
    "max": null,
    "min": 0,
    "name": "effortUnits",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
