export const PERMISSIONS = [
  '*',
  'submissions:read:*',
  'visibilities:read:*',
  'users:read:*',
  'events:create:*',
];

export function userMayAccess(permissions, route) {
  if (permissions.includes('*')) {
    return true;
  }

  if (route === '/') {
    return true;
  }

  switch (route) {
  case '/callqueue':
    return permissions.includes('submissions:read:*');
  case '/teamstatus':
    return permissions.includes('visibilities:read:*');
  case '/users':
    return permissions.includes('users:read:*');
  case '/admintools':
    return permissions.includes('events:create:*');
  default:
    return false;
  }
}
