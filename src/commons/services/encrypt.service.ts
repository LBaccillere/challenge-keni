import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EncryptService {
  encrypt(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  compareEncrypted(encrypted: string, str: string): Promise<boolean> {
    return bcrypt.compare(str, encrypted);
  }
}
