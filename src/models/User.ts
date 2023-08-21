import { TimestampClientAdmin } from './Timestamp';

interface User {
  displayName: string;
  email: string;
  userId: string;
  createdAt: TimestampClientAdmin;
  photoURL?: string;
}

export default User;
