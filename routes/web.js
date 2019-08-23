const { Router } = require('@horsepower/router')

Router.get('/', 'welcome').name('welcome')
Router.get('/getting-started', client => client.response.render('getting-started.mix')).name('getting-started')
Router.get('/docs', client => client.response.render('documentation.mix')).name('docs')
Router.get(/\/docs\/.+/, client => client.response.render('documentation.mix'))
// Router.group('/docs', () => {
//   Router.get('/routing', client => client.response.render('documentation.mix')).name('docs-routing')
//   Router.get('/routing', client => client.response.render('documentation.mix')).name('docs-routing')
// })