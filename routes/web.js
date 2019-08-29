const { Router } = require('@horsepower/router')

Router.get('/', client => client.response.cached('welcome.mix', 3600)).name('welcome')
Router.get('/getting-started', client => client.response.cached('getting-started.mix', 3600)).name('getting-started')
Router.get('/docs', client => client.response.cached('documentation.mix', 3600)).name('docs')
Router.get(/\/docs\/.+/, client => client.response.render('documentation.mix'))

Router.get('/test', client => 123)