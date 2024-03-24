import { UUID } from 'src/commons/types/uuid';
import { Role } from 'src/users/core/user.schema';

export interface JWTPayload {
  user: {
    uuid: UUID;
    name: string;
    email: string;
    role: Role;
  };
}
