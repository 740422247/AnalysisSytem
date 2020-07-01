export class AuthService {
  constructor() {
   this.authenticated = false;
  }

  grantedAll(permissions) {
    // if (this.isAdmin) {
    //   return true;
    // }

    // permissions =
    //   typeof permissions === 'string' ? [permissions] : permissions || [];

    return (
      this.authenticated &&
      permissions.every(isGranted(this.grantedPermissions))
    );
  }

  grantedAny(permissions) {
    // if (this.isAdmin) {
    //   return true;
    // }

    // permissions = typeof permissions === 'string' ? [permissions] : permissions || [];

    return (
      this.authenticated &&
      (permissions.length === 0 ||
        permissions.some(isGranted(this.grantedPermissions)))
    );
  }
}
function isGranted(granted) {
  return (permission) =>
    granted.find(item => item === permission) ? true : false;
}
