import {assert, clearStore, test} from 'matchstick-as/assembly/index'
import {RegistryEntity} from '../../generated/schema'
import {
  handleRoleAdminChangedParams,
  handleRoleGrantedParams,
  handleRoleRevokedParams
} from '../../src/subgraph/mapping'


test('can handle role granted (case new)', () => {

  handleRoleGrantedParams('myId1', 'myAdmin1', 'myAccount1');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'admin', 'myAdmin1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'accounts', '[myAccount1]')

  clearStore()

})

test('can handle role granted (case update)', () => {

  let registryEntity = new RegistryEntity('myId1')
  registryEntity.admin = 'myAdmin1'
  registryEntity.accounts = ['myAccount1']

  registryEntity.save();

  handleRoleGrantedParams('myId1', 'myAdmin2', 'myAccount2');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'admin', 'myAdmin1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'accounts', '[myAccount1, myAccount2]')

  clearStore()

})

test('can handle admin changed (case 1)', () => {

  let registryEntity = new RegistryEntity('myId1')
  registryEntity.admin = 'myAdmin1'

  registryEntity.save();

  handleRoleAdminChangedParams('myId1', 'myAdmin2');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'admin', 'myAdmin2')

  clearStore()

})

test('can handle admin changed (case sanity)', () => {

  let registryEntity = new RegistryEntity('myId1')
  registryEntity.admin = 'myAdmin1'

  registryEntity.save();

  handleRoleAdminChangedParams('myId2', 'myAdmin2');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'admin', 'myAdmin1')

  clearStore()

})

test('can handle role revoked (case 1)', () => {

  let registryEntity = new RegistryEntity('myId1')
  registryEntity.admin = 'myAdmin1'
  registryEntity.accounts = ['myAccount1', 'myAccount2', 'myAccount3']

  registryEntity.save();

  handleRoleRevokedParams('myId1', 'myAccount1');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'accounts', '[myAccount2, myAccount3]')

  clearStore()

})

test('can handle role revoked (case 2)', () => {

  let registryEntity = new RegistryEntity('myId1')
  registryEntity.admin = 'myAdmin1'
  registryEntity.accounts = ['myAccount1', 'myAccount2', 'myAccount3']

  registryEntity.save();

  handleRoleRevokedParams('myId1', 'myAccount3');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'accounts', '[myAccount1, myAccount2]')

  clearStore()

})

test('can handle role revoked (case - sanity)', () => {

  let registryEntity = new RegistryEntity('myId1')
  registryEntity.admin = 'myAdmin1'
  registryEntity.accounts = ['myAccount1', 'myAccount2']

  registryEntity.save();

  handleRoleRevokedParams('myId1', 'myAccount5');

  assert.fieldEquals('RegistryEntity', 'myId1', 'id', 'myId1')
  assert.fieldEquals('RegistryEntity', 'myId1', 'accounts', '[myAccount1, myAccount2]')

  clearStore()

})

