/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3922659157")

  // add field
  collection.fields.addAt(6, new Field({
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
  const collection = app.findCollectionByNameOrId("pbc_3922659157")

  // remove field
  collection.fields.removeById("date2782324286")

  return app.save(collection)
})
