import { ParticipantInterface } from 'interfaces/participant';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface QuizInterface {
  id?: string;
  title: string;
  description?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  participant?: ParticipantInterface[];
  organization?: OrganizationInterface;
  _count?: {
    participant?: number;
  };
}

export interface QuizGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  description?: string;
  organization_id?: string;
}
