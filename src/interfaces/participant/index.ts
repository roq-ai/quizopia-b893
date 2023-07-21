import { UserInterface } from 'interfaces/user';
import { QuizInterface } from 'interfaces/quiz';
import { GetQueryInterface } from 'interfaces';

export interface ParticipantInterface {
  id?: string;
  user_id?: string;
  quiz_id?: string;
  joined_at?: any;
  left_at?: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  quiz?: QuizInterface;
  _count?: {};
}

export interface ParticipantGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  quiz_id?: string;
}
