import request from 'supertest';

import { app } from '@/main/http/setup';

describe('contentType Middleware', () => {
  it('should has a json content type by default', async () => {
    app.post('/test_content_type_json', (req, res) => res.send());

    const { headers } = await request(app)
      .post('/test_content_type_json');

    expect(headers['content-type'].match(/json/)).toBeTruthy();
  });

  it('should has the given content type if passed', async () => {
    app.post('/test_content_type_xml', (req, res) => {
      res.type('xml');
      return res.send();
    });

    const { headers } = await request(app)
      .post('/test_content_type_xml');

    expect(headers['content-type'].match(/xml/)).toBeTruthy();
  });
});
