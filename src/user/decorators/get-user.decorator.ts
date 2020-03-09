import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, req) => {
  if (!!req.user) {
    return !!data ? req.user[data] : req.user;
  }
});
