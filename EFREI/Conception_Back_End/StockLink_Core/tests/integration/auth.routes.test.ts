import { beforeAll, describe, expect, test } from '@jest/globals';
import express, { Application } from 'express';
import request from 'supertest';
import AuthRoutes from '../../src/routes/auth.route';

describe('Auth Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    const authRoutes = new AuthRoutes();
    app.use('/auth', authRoutes.getRouter());
  });

  describe('POST /auth/register', () => {
    test("Valider la longueur du nom d'utilisateur", async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'ab',
        password: '@Lpmadad_161KA',
      });

      expect(response.status).toBe(400);
    });

    test('Valider la longueur du mot de passe', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'unnomquimarche',
        password: '@Lp1',
      });

      expect(response.status).toBe(400);
    });

    test('Valider le chiffre dans le mot de passe', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'unnomquimarche',
        password: 'A_lpmadad_KA',
      });

      expect(response.status).toBe(400);
    });

    test('Valider le caractère spécial dans le mot de passe', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'unnomquimarche',
        password: 'ALpmadad161KA',
      });

      expect(response.status).toBe(400);
    });

    test('Valider la majuscule dans le mot de passe', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'unnomquimarche',
        password: '@lpmadad161ka',
      });

      expect(response.status).toBe(400);
    });

    test('Valider la miscule dans le mot de passe', async () => {
      const response = await request(app).post('/auth/register').send({
        username: 'unnomquimarche',
        password: '@LPMADAD161KA',
      });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    test("Besoin d'un identifiant et d'un mot de passe", async () => {
      const response = await request(app).post('/auth/login').send({});

      expect(response.status).toBe(400);
    });
  });
});
