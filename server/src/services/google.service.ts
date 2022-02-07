import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleService {
  parseJwt(jwt: string): Prisma.UserCreateInput {
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const { sub, name, email, picture } = JSON.parse(
      Buffer.from(base64, 'base64').toString(),
    );
    return { id: `GOOGLE ${sub}`, name, email };
  }
}
