import { RequestMethod } from '@nestjs/common';

export default [
  // USER
  { path: '/users/me', method: RequestMethod.GET },
  { path: '/users', method: RequestMethod.GET },

  // PLACE
  { path: '/places', method: RequestMethod.GET }
];
