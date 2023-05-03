import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  public async getCars() {
    return { id: 3, name: 'demo car' };
  }
}
