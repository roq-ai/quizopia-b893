const mapping: Record<string, string> = {
  organizations: 'organization',
  participants: 'participant',
  quizzes: 'quiz',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
