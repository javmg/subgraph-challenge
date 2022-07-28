import {RoleAdminChanged, RoleGranted, RoleRevoked} from "../../generated/Registry/Registry";
import {RegistryEntity} from "../../generated/schema";

export function handleRoleGranted(event: RoleGranted): void {

  handleRoleGrantedParams(
      event.params.role.toHex(),
      event.params.sender.toHex(),
      event.params.account.toHex()
  )
}

export function handleRoleGrantedParams(id: string, sender: string, account: string): void {

  let entity = RegistryEntity.load(id);

  if (!entity) {
    entity = new RegistryEntity(id);
    entity.admin = sender;
  }

  const accounts = entity.accounts
  accounts.push(account)
  entity.accounts = accounts;

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {

  handleRoleAdminChangedParams(
      event.params.role.toHex(),
      event.params.newAdminRole.toHex()
  );
}

export function handleRoleAdminChangedParams(id: string, newAdmin: string): void {

  let entity = RegistryEntity.load(id);

  if (!entity) {
    return;
  }

  entity.admin = newAdmin;

  entity.save();
}

export function handleRoleRevoked(event: RoleRevoked): void {

  handleRoleRevokedParams(
      event.params.role.toHex(),
      event.params.account.toHex()
  );
}

export function handleRoleRevokedParams(id: string, account: string): void {

  const entity = RegistryEntity.load(id);

  if (!entity) {
    return;
  }

  const indexId = entity.accounts.indexOf(account, 0);

  if (indexId === -1) {
    return;
  }

  const accounts = entity.accounts;
  accounts.splice(indexId, 1);

  entity.accounts = accounts;

  entity.save();
}

