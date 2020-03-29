import { AdjacencyMatrix, Edge } from '../core/models';

export class Dijkstra {
    /**
     * Helper method to find the node with the lowest cost for dijkstra.
     */
    findLowestCostNode(costs: any, processed: any): string {
        const knownNodes = Object.keys(costs);

        const lowestCostNode = knownNodes.reduce((lowest: any, node: any) => {
            if (lowest === null && !processed.includes(node)) {
                lowest = node;
            }
            if (costs[node] < costs[lowest] && !processed.includes(node)) {
                lowest = node;
            }
            return lowest;
        }, null);

        return lowestCostNode;
    }

    /**
     * The dijkstra algorithm
     * Finds the shortest path with the shortest distance.
     * @return a ShortestPathResult
     */
    computeShortestPath(treatedAdjacencyMatrix: AdjacencyMatrix, startElement: string, endElement: string): ShortestPathResult {

        treatedAdjacencyMatrix[endElement] = { finish: 0 };

        // track lowest cost to reach each node
        const trackedCosts = Object.assign(
            { finish: Infinity }, treatedAdjacencyMatrix[startElement]
        );
        // track paths
        const trackedParents: any = { finish: null };
        const processedNodes: string[] = [];

        // Set initial node. Pick lowest cost node.
        let node: string = this.findLowestCostNode(trackedCosts, processedNodes);

        while (node) {
            const costToReachNode = trackedCosts[node];
            let childrenOfNode: Edge = treatedAdjacencyMatrix[node];

            childrenOfNode = childrenOfNode ? childrenOfNode : {};
            for (const child of Object.keys(childrenOfNode)) {
                const costFromNodetoChild = childrenOfNode[child];
                const costToChild = costToReachNode + costFromNodetoChild;

                if (!trackedCosts[child] || trackedCosts[child] > costToChild) {
                    trackedCosts[child] = costToChild;
                    trackedParents[child] = node;
                }
            }

            processedNodes.push(node);

            node = this.findLowestCostNode(trackedCosts, processedNodes);
        }

        const optimalPath: string[] = ['finish'];
        let parent = trackedParents.finish;
        while (parent) {
            optimalPath.push(parent);
            parent = trackedParents[parent];
        }
        optimalPath.reverse();

        const result: ShortestPathResult = {
            distance: trackedCosts.finish,
            path: optimalPath
        };

        if ( result.distance === Infinity) {
            throw new Error('The path was not found, no connection between ' + startElement + ' and ' + endElement + '.');
        }
        return result;
    }
}

export interface ShortestPathResult {
    distance: number;
    path: string[];
}
