import request from 'supertest';

import { app } from '@/main/http/setup';

describe('cors Middleware', () => {
  it('should has default cors headers', async () => {
    app.post('/test_cors', (req, res) => res.send());

    const { headers } = await request(app).post('/test_cors');

    expect(headers['access-control-allow-origin']).toBe('*');
    expect(headers['access-control-allow-methods']).toBe('*');
    expect(headers['access-control-allow-headers']).toBe('*');
  });
});
