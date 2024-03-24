import { User } from 'src/users/core/user.schema';
import {
  UserResponse,
  mapToResponse as mapToUserResponse,
} from './user.response';

type UsersResponse = {
  data: UserResponse[];
};

const mapToResponse = (users: User[]): UsersResponse => {
  return {
    data: users.map((i) => mapToUserResponse(i)),
  };
};

export { UsersResponse, mapToResponse };
