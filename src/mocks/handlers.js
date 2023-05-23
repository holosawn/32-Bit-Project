// src/mocks/handlers.js
import { rest } from 'msw'
import { terminalsData , LoginPage , DefectPage} from '../datas'

let shiftColor;

export const handlers = [
  rest.post('/login', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true')

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    )
  }),
  
  rest.post('/postShift', (req, res, ctx) => {
    
    if(req){
      const requ  = req.json();
      requ.then(value => shiftColor=value)
      return res(
      // Respond with a 200 status code
      ctx.status(200) 
    )}
  }),
  
  
  rest.get('/user', (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const isAuthenticated = sessionStorage.getItem('is-authenticated')

    if (!isAuthenticated) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        }),
      )
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        terminalsData , LoginPage , DefectPage
      }),
    )
  }),

  rest.get('/getShift', (req, res, ctx) => {
    
    if(shiftColor){
      
      return res(
      ctx.status(200),
      ctx.json({
        shiftColor
      }),
    )}
  }),
]