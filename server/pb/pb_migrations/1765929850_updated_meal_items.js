/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("meal_items31415926")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != '' && userId = @request.auth.id",
    "indexes": [
      "CREATE INDEX `idx_meal_items_meal` ON `meal_items` (`userId`)"
    ],
    "listRule": "@request.auth.id != '' && userId = @request.auth.id",
    "updateRule": "@request.auth.id != '' && userId = @request.auth.id",
    "viewRule": "@request.auth.id != '' && userId = @request.auth.id"
  }, collection)

  // remove field
  collection.fields.removeById("relation_meal")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation1689669068",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "userId",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("meal_items31415926")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.id != '' && mealId.userId = @request.auth.id",
    "indexes": [
      "CREATE INDEX `idx_meal_items_meal` ON `meal_items` (`mealId`)"
    ],
    "listRule": "@request.auth.id != '' && mealId.userId = @request.auth.id",
    "updateRule": "@request.auth.id != '' && mealId.userId = @request.auth.id",
    "viewRule": "@request.auth.id != '' && mealId.userId = @request.auth.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "meals31415926",
    "hidden": false,
    "id": "relation_meal",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "mealId",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation1689669068")

  return app.save(collection)
})
