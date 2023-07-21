interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Quiz Creator'],
  customerRoles: ['Quiz Participant'],
  tenantRoles: ['Quiz Creator'],
  tenantName: 'Organization',
  applicationName: 'QuizOPia',
  addOns: ['file', 'chat', 'notifications'],
};
