/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("meals31415926")

  // remove field
  collection.fields.removeById("bool_complete")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("meals31415926")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool_complete",
    "name": "isComplete",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
