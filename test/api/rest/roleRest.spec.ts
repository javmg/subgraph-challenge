import {instance, mock, when} from 'ts-mockito'
import {RoleRestImpl, rolesQueryValue} from '../../../src/api/rest/roleRest';
import {GraphClient} from "../../../src/api/client/graphClient";

const {expect} = require('chai');

export default function () {

  describe('roleRest', function () {

    it('should return roles', async function () {

      const mockGraphClient = mock<GraphClient>()

      when(mockGraphClient.query(rolesQueryValue)).thenReturn(Promise.resolve({
        'data': {
          'registryEntities':
              [
                {id: 'myId1', 'admin': 'myAdmin1', "accounts": ['myAccount1']},
                {id: 'myId2', 'admin': 'myAdmin2', "accounts": ['myAccount2']}
              ]
        }
      }));

      const roleRest = new RoleRestImpl(instance(mockGraphClient));

      const roles = await roleRest.getRoles();

      expect(roles).to.have.lengthOf(2);

      expect(roles[0]).to.have.property('id', 'myId1');
      expect(roles[0]).to.have.property('admin', 'myAdmin1');
      expect(roles[0].accounts).to.be.deep.equal(['myAccount1']);
    });

  });
}
