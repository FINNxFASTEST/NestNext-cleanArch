import { RoleEnum } from '../../../roles/roles.enum';

export type BookingActor = {
  id: string | number;
  roleId?: string | number;
};

export const DUPLICATE_KEY_ERROR_CODE = 11000;

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function dayIterator(from: Date, to: Date): Date[] {
  const start = new Date(
    Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate()),
  );
  const end = new Date(
    Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate()),
  );
  const dates: Date[] = [];
  for (let t = start.getTime(); t < end.getTime(); t += MS_IN_DAY) {
    dates.push(new Date(t));
  }
  return dates;
}

export function isAdmin(actor: BookingActor): boolean {
  return String(actor.roleId) === String(RoleEnum.admin);
}

export function isHost(actor: BookingActor): boolean {
  return String(actor.roleId) === String(RoleEnum.host);
}
