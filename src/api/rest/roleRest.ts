import {GraphClient, graphClientInstance} from "../client/graphClient";
import {RoleView} from "../view/roleView";

const rolesQueryValue = `
  query {
    registryEntities {
      id
      admin
      accounts
    }
  }
`;

interface RoleRest {
  getRoles(): Promise<Array<RoleView>>;
}

class RoleRestImpl implements RoleRest {
  graphClient: GraphClient;

  constructor(graphClient: GraphClient) {
    this.graphClient = graphClient;
  }

  getRoles(): Promise<Array<RoleView>> {
    return this.graphClient

    .query(rolesQueryValue)

    .then((result) =>
        result.data.registryEntities.map(
            (item: { id: string; admin: string; accounts: Array<String> }) => {
              return new RoleView(item.id, item.admin, item.accounts);
            }
        )
    );
  }
}

const roleRestInstance: RoleRest = new RoleRestImpl(graphClientInstance);

export {RoleRest, RoleRestImpl, roleRestInstance, rolesQueryValue};
