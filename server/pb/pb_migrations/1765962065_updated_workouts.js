/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("workouts31415926")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date2782324286",
    "max": "",
    "min": "",
    "name": "timestamp",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("workouts31415926")

  // remove field
  collection.fields.removeById("date2782324286")

  return app.save(collection)
})
