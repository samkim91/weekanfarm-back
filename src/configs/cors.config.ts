export const corsConfig = {
  origin: [
    'http://localhost:3000',
    'http://www.weekanfarm.com',
    'http://weekanfarm.com',
    'https://www.weekanfarm.com',
    'https://weekanfarm.com',
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  credentials: true,
};
