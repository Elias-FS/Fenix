/* eslint-disable no-undef */
import request from 'supertest'
import OrganizationModel from '../models/OrganizationModel'
import { app } from '../server'

describe('OrganizationController', () => {
  describe('GET /organization', () => {
    it('should return all organizations', async () => {
      const response = await request(app).get('/organization')
      expect(response.status).toBe(200)
    })
  })

  describe('GET /organization/:id', () => {
    it('should return an organization by id', async () => {
      const organization = await OrganizationModel.create({
        title: 'Test Organization',
        document: '39317935000131',
        slug: 'TECNOLOGIA',
        typeDocument: 'CNPJ',
      })
      const response = await request(app).get(
        `/organization/${organization._id}`,
      )
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Test Organization')
      await request(app).delete(`/organization/${organization._id}`)
    })
  })

  describe('POST /organization', () => {
    it('should create a new organization with default team', async () => {
      const organization = await OrganizationModel.create({
        title: 'Test Organization',
        document: '39317935000132',
        slug: 'TECNOLOGIA',
        typeDocument: 'CNPJ',
      })
      const response = await request(app)
        .post('/organization')
        .send(organization)
      expect(response.status).toBe(201)
      // expect(response.body.organization.title).toBe('Test Organization')
      // expect(response.body.defaultTeam.title).toBe(
      //   `default team ${response.body.organization.title}`,
      // )
      // await request(app).delete(`/organization/${organization._id}`)

      // You can add more assertions for the default user created here
    })
  })

  describe('PUT /organization/:id', () => {
    it('should update an existing organization', async () => {
      const organization = await OrganizationModel.create({
        title: 'Old Test Organization',
        document: '39317935000132',
        slug: 'TECNOLOGIA',
        typeDocument: 'CNPJ',
      })
      const newData = {
        title: 'Test Organization',
        document: '39317935000132',
        slug: 'TECNOLOGIA',
        typeDocument: 'CNPJ',
      }
      const response = await request(app)
        .put(`/organization/${organization._id}`)
        .send(newData)
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Test Organization')
      await request(app).delete(`/organization/${organization._id}`)
    })
  })

  describe('DELETE /organization/:id', () => {
    it('should delete an existing organization', async () => {
      const organization = await OrganizationModel.create({
        title: 'Test Organization to be deleted',
        description: 'This is a test organization to be deleted',
      })
      const response = await request(app).delete(
        `/organization/${organization._id}`,
      )
      expect(response.status).toBe(200)
      expect(response.body.title).toBe('Test Organization to be deleted')
      const deletedOrganization = await OrganizationModel.findById(
        organization._id,
      )
      expect(deletedOrganization).toBeNull()
    })
  })
})
