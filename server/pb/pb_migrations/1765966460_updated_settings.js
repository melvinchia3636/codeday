/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("settings31415926")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2211207719",
    "max": null,
    "min": null,
    "name": "workoutCalorieTarget",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("settings31415926")

  // remove field
  collection.fields.removeById("number2211207719")

  return app.save(collection)
})
