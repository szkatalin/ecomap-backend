import { RequestMethod } from '@nestjs/common';

export default [
  // USERS
  { path: '/users/me', method: RequestMethod.GET },
  { path: '/users', method: RequestMethod.GET },

  // PLACES
  { path: '/places', method: RequestMethod.GET }
];
