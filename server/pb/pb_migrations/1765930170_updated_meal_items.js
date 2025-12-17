/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("meal_items31415926")

  // remove field
  collection.fields.removeById("number_calories")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("meal_items31415926")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number_calories",
    "max": null,
    "min": 0,
    "name": "calories",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
