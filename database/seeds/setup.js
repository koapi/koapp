import moment from 'moment'
import md5 from 'blueimp-md5'
import { initialize } from 'koapi/lib/model'

export async function seed(knex, Promise) {
  initialize(knex);
  const { Client, User, Role, Token } = require('../../src/server/models');
  let user = await User.forge().save({
    username:'test', password:md5('test'), email:"test@gmail.com"
  });
  let client = await Client.forge().save({
      id: '0f434d4b-06bf-4cb2-b8f4-f20bf9349beb',
      client_secret: '530897d5880494a6a9ac92d1273d8ba5',
      redirect_uri:'http://localhost:5000',
      user_id: user.get('id').toString()
  });
  let token = await Token.issue(client.id, user.id.toString(), {
    access_token: '691ae08f7b038e5b09983d2435d3a878',
    refresh_token: '791ae08f7b038e5b09983d2435d3a878',
  });
  let role = await Role.forge().save({
    name: 'admin',
    permissions: true
  });
  await user.roles().attach(role);
  let post1 = await user.posts().create({
    title: 'Post Title',
    contents:'Post Contents'
  });
  let post2 = await user.posts().create({
    title: 'Post Title',
    contents:'Post Contents'
  });
  let comment1 = await post1.comments().create({
    title: 'Comment Title',
    contents:'Comment Contents',
    user_id: user.get('id')
  });
  let comment2 = await post1.comments().create({
    title: 'Comment Title',
    contents:'Comment Contents',
    user_id: user.get('id')
  });
}
