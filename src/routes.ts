import { Router } from 'express'
import OrganizationController from './controllers/OrganizationController'
import UserController from './controllers/UserController'
import TeamController from './controllers/TeamController'
import checkIdExistence from './middlewares/CheckIdExistence'
import checkDocument from './middlewares/CheckDocument'
import checkName from './middlewares/CheckName'

const router = Router()

// Organization Routes
router.get('/organization', OrganizationController.index)
router.get(
  '/organization/:id',
  checkIdExistence,
  OrganizationController.findById,
)
router.delete(
  '/organization/:id',
  checkIdExistence,
  OrganizationController.delete,
)
router.put(
  '/organization/:id',
  checkIdExistence,
  checkDocument,
  OrganizationController.update,
)
router.post('/organization', checkDocument, OrganizationController.create)

// Team Routes
router.get('/teams', TeamController.index)
router.get('/team/:id', checkIdExistence, TeamController.findById)
router.delete('/team/:id', checkIdExistence, TeamController.delete)
router.put('/team/:id', checkIdExistence, TeamController.update)
router.post('/team', checkName, TeamController.create)

// User Routes
router.get('/users', UserController.index)
router.get('/user/:id', checkIdExistence, UserController.findById)
router.delete('/user/:id', checkIdExistence, UserController.delete)
router.put('/user/:id', checkIdExistence, checkDocument, UserController.update)
router.post('/user', checkDocument, UserController.create)

export default router
