import { Controller, Get, Req } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get("user")
  public user(@Req() req) {
    return { user: req.user };
  }
}
