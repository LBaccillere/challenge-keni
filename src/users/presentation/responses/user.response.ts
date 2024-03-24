import { UUID } from 'src/commons/types/uuid';
import { Role, User } from 'src/users/core/user.schema';

type UserResponse = {
  uuid: UUID;
  name: string;
  email: string;
  role: Role;
};

const mapToResponse = (user: User): UserResponse => {
  return {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export { UserResponse, mapToResponse };
