/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("food_logs31415926");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "@request.auth.id != ''",
    "deleteRule": "@request.auth.id != '' && userId = @request.auth.id",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": true,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "relation_user",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "userId",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text_food_id",
        "max": 100,
        "min": 0,
        "name": "foodId",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
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
      },
      {
        "hidden": false,
        "id": "date_timestamp",
        "max": "",
        "min": "",
        "name": "timestamp",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "autodate_timestamp",
        "name": "timestamp",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate_updated",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "food_logs31415926",
    "indexes": [
      "CREATE INDEX `idx_food_logs_user` ON `food_logs` (`userId`)",
      "CREATE INDEX `idx_food_logs_timestamp` ON `food_logs` (`timestamp`)"
    ],
    "listRule": "@request.auth.id != '' && userId = @request.auth.id",
    "name": "food_logs",
    "system": false,
    "type": "base",
    "updateRule": "@request.auth.id != '' && userId = @request.auth.id",
    "viewRule": "@request.auth.id != '' && userId = @request.auth.id"
  });

  return app.save(collection);
})
