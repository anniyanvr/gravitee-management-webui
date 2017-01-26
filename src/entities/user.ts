import { Authority } from "./authority";

export class User {
  constructor(
    public username?: string,
    private password?: string,
    private authorities?: Authority[],
    private accountNonExpired?: boolean,
    private accountNonLocked?: boolean,
    private credentialsNonExpired?: boolean,
    private enabled?: boolean,
    public picture?: string
  ) {}

  allowedTo(roles: string[]): boolean {
    if (!roles || !this.authorities) {
      return false;
    }

    return this.authorities
        .some(authority => roles.indexOf(authority.authority) !== -1);
  }
}
