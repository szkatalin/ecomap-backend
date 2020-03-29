import { RequestMethod } from '@nestjs/common';

export default [
  // USERS
  { path: '/users/me', method: RequestMethod.GET },
  { path: '/users', method: RequestMethod.GET },
  { path: '/users/:id/role', method: RequestMethod.PUT },

  // RECOMMENDATION
  { path: '/recommendations', method: RequestMethod.GET },
  { path: '/recommendations', method: RequestMethod.POST },
  { path: '/recommendations/:id', method: RequestMethod.POST },
  { path: '/recommendations/:id/delete', method: RequestMethod.POST },
  { path: '/recommendations/:id', method: RequestMethod.GET },
  { path: '/recommendations/:id/evaluate', method: RequestMethod.POST }
];
