require('reflect-metadata')

const fetchMock = require('fetch-mock-jest')

fetchMock
  .get('/me', {
    name: 'John Smith',
    age: 100
  })
  .get('/user?id=1&isAdmin=false', {
    name: 'Admin',
    age: 1
  })

fetchMock
  .get('/interceptor', {
    message: '/interceptor'
  })
  .get('/interceptor/with-path', {
    message: '/interceptor/with-path'
  })
