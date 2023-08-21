import { Timestamp } from 'firebase/firestore';

// because time stamp type of admin sdk different with client
export type TimestampClientAdmin = Omit<Timestamp, 'toJSON'>;
