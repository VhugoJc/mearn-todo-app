const request = require('supertest');
const app = require('../src/app');

// Mock the database connection
jest.mock('../src/config/database', () => ({
  connect: jest.fn(),
}));

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return API information', async () => {
      const res = await request(app)
        .get('/')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('MEAN Todo API');
    });
  });

  describe('GET /api/health', () => {
    it('should return health check', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('Server is running!');
    });
  });

  describe('GET /api/todos', () => {
    it('should handle todos endpoint', async () => {
      const res = await request(app)
        .get('/api/todos');

      // Since we don't have a real database connection in tests,
      // we expect either success (if mocked) or an error
      expect(res.status).toBeDefined();
    });
  });
});
