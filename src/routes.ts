import { Router } from 'express'
import CompanyController from './controllers/CompanyController'
import MemberController from './controllers/MemberController'
import TeamController from './controllers/TeamController'
import checkIdExistence from './middlewares/CheckIdExistence'

const router = Router()

// Company Routes
router.get('/companies', CompanyController.index)
router.get('/company/:id', checkIdExistence, CompanyController.findById)
router.delete('/company/:id', checkIdExistence, CompanyController.delete)
router.put('/company/:id', checkIdExistence, CompanyController.update)
router.post('/company', CompanyController.create)

// Team Routes
router.get('/teams', TeamController.index)
router.get('/team/:id', checkIdExistence, TeamController.findById)
router.delete('/team/:id', checkIdExistence, TeamController.delete)
router.put('/team/:id', checkIdExistence, TeamController.update)
router.post('/team', TeamController.create)

// Member Routes
router.get('/members', MemberController.index)
router.get('/member/:id', checkIdExistence, MemberController.findById)
router.delete('/member/:id', checkIdExistence, MemberController.delete)
router.put('/member/:id', checkIdExistence, MemberController.update)
router.post('/member', MemberController.create)

export default router
