import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'recipes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 50).notNullable()
      table.string('ingredients', 500).notNullable()
      table.string('preparation', 500).notNullable()
      table.string('photo_url', 200).notNullable()
      table.integer('user').references('id').inTable('users').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}