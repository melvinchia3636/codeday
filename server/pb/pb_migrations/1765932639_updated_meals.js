/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("meals31415926")

  // remove field
  collection.fields.removeById("relation3776899405")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json3776899405",
    "maxSize": 0,
    "name": "items",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("meals31415926")

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "meal_items31415926",
    "hidden": false,
    "id": "relation3776899405",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "items",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("json3776899405")

  return app.save(collection)
})
