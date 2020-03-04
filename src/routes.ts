import { RequestMethod } from '@nestjs/common';

export default [
  { path: '/places', method: RequestMethod.GET },
  { path: '/user/me', method: RequestMethod.GET }
];
