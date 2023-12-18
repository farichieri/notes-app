import { UserDetails } from '@/user';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDetails => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
