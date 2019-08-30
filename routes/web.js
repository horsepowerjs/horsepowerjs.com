const { Router } = require('@horsepower/router')
const { Storage } = require('@horsepower/storage')
const crypto = require('crypto')

Router.get('/', client => client.response.cached('welcome.mix', 3600)).name('welcome')
Router.get('/getting-started', client => client.response.cached('getting-started.mix', 3600)).name('getting-started')
Router.get(/^\/docs.*/, client => client.response.render('documentation.mix', {
  md5: (string) => crypto.createHash('md5').update(string).digest('hex'),
  emails: ['one@example.com', 'two@example.com', 'three@example.com']
}))

// Router.get('/test', client => client.response.re(Storage.mount('public').toPath('images/logo.svg')))