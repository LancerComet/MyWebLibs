require('reflect-metadata')

const fs = require('fs')
const path = require('path')
const fetchMock = require('fetch-mock-jest')

const bugImage = fs.readFileSync(path.resolve(__dirname, './bug.png'))

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
  .post('/passthrough', (url, request) => {
    const body = request.body
    if (body instanceof FormData) {
      const result = {}
      for (const pair of body.entries()) {
        result[pair[0]] = pair[1]
      }
      return result
    }
    return body
  })

fetchMock
  .get('/binary', bugImage)

fetchMock
  .get('/interceptor', {
    message: '/interceptor'
  })
  .get('/interceptor/with-path', {
    message: '/interceptor/with-path'
  })

fetchMock
  .get('/400', 400)

fetchMock
  .get('/api', {
    data: {
      name: 'John Smith',
      age: 100
    },
    code: 1,
    message: 'OK'
  })
