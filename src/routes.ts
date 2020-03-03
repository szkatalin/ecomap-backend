import { RequestMethod } from "@nestjs/common";

export default [
  { path: "/places", method: RequestMethod.GET },
  { path: "/auth/user", method: RequestMethod.GET }
];
