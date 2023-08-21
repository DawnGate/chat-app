import { TimestampClientAdmin } from './Timestamp';

interface User {
  displayName: string;
  email: string;
  userId: string;
  createdAt: TimestampClientAdmin;
  // TODO add field photo for user
}

export default User;
