import { Dijkstra, ShortestPathResult } from './shortest-path-algorithm';

describe('Dijkstra', () => {

    const dijkstra = new Dijkstra();

    it('should return the null node as lower cost node', () => {
        const costs = {
            node1: null,
            node4: 1
        };
        const processed = [];
        expect(dijkstra.findLowestCostNode(costs, processed)).toEqual('node1');
    });

    it('should find return the lower cost node', () => {
        const costs = {
            node1: 4,
            node4: 1
        };
        const processed = [];
        expect(dijkstra.findLowestCostNode(costs, processed)).toEqual('node4');
    });

    it('should not return the processed node as lowest cost node ', () => {
        const costs = {
            node1: 4,
            node2: 1,
            node3: 10,
        };
        const processed = ['node2'];
        expect(dijkstra.findLowestCostNode(costs, processed)).toEqual('node1');
    });

    it('should return the first lowest cost node found ', () => {
        const costs = {
            node1: 1,
            node2: 1,
            node3: 10,
        };
        const processed = [];
        expect(dijkstra.findLowestCostNode(costs, processed)).toEqual('node1');
    });

    it('should compute the shortest path in the graph', () => {
        const graph = {
            node1: {
                node2: 3,
                node3: 4
            },
            node2: {
                node3: 2,
                node4: 1
            },
            node3: {
                node4: 1
            },
            node4: {
                node1: 2
            }
        };
        const expectedShortestPathResult: ShortestPathResult = {
            distance: 4,
            path: ['node2', 'node4', 'finish']
        };
        expect(dijkstra.computeShortestPath(graph, 'node1', 'node4')).toEqual(expectedShortestPathResult);
    });

    it('should compute the shortest path with first shortest distance in the graph', () => {
        const graph = {
            node1: {
                node5: 2,
                node2: 3,
                node3: 4,
            },
            node2: {
                node3: 2,
                node4: 1
            },
            node3: {
                node4: 1
            },
            node4: {
                node1: 2
            },
            node5: {
                node4: 2
            }
        };
        const expectedShortestPathResult: ShortestPathResult = {
            distance: 4,
            path: ['node5', 'node4', 'finish']
        };
        expect(dijkstra.computeShortestPath(graph, 'node1', 'node4')).toEqual(expectedShortestPathResult);
    });

    it('should not find the shortest path in the graph', () => {
        const graph = {
            node1: {
                node2: 3,
                node3: 4
            },
            node2: {
                node3: 2,
                node4: 1
            },
            node3: {
                node4: 1
            },
            node4: {
                node1: 2
            },
            node5: {
                node1: 2
            }
        };
        expect(() => { dijkstra.computeShortestPath(graph, 'node1', 'node5') })
            .toThrow(new Error('The path was not found, no connection between node1 and node5.'));
    });
});
