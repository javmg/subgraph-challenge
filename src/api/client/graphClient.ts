import {createClient} from "urql";
import "isomorphic-unfetch";
import {Client} from "@urql/core/dist/types/client";

interface GraphClient {
  query(query: any): Promise<any>;
}

class GraphClientImpl implements GraphClient {
  graphClient: Client;

  constructor(graphClient: Client) {
    this.graphClient = graphClient;
  }

  query(query: any): Promise<any> {
    try {
      return this.graphClient.query(query).toPromise();
    } catch (exception: any) {
      return Promise.reject(exception);
    }
  }
}

const url = process.env.GRAPH_CLIENT_URL ?? "https://api.thegraph.com/subgraphs/name/javmg/subgraph-registry-subgraph";

const graphClientInstance: GraphClient = new GraphClientImpl(
    createClient({
      url: url,
    })
);

export {GraphClient, GraphClientImpl, graphClientInstance};
