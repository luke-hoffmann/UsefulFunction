export declare class UsefulFunction {
    static getIndexOfArrayMax(arrayOfNumbers: number[]): number;
    static isMixedUpArraysEqual<T>(array1: T[], array2: T[]): boolean;
    static isThereValueGreaterThanN(array: number[], n: number): boolean;
    static noDuplicates: <T>(arr: T[]) => T[];
    static combineArrays<T>(arrayOfArrays: T[][]): T[];
    static arrayOfIndices(n: number): number[];
    static addToMap<T>(map: Map<T, T[]>, key: T, value: T): Map<T, T[]>;
    static incrementMap<T>(map: Map<T, number>, key: T): void;
    static isInArray<T>(array: T[], value: T): boolean;
    static getCounterClockwiseMove<T>(hashGraph: Map<number, number[]>, currentNode: number): number;
    static doesMoveExistElsewhere<T>(map: Map<number, number[]>, valueToFind: number, keyToCheckUnder: number): boolean;
    static doesKeyHaveSpecificValue(hashGraph: Map<number, number[]>, key: number, specificValue: number): boolean;
    static findNodeThatHasSpecificNodeAsConnection(hashGraph: Map<number, number[]>, startingNode: number, specificNode: number, lastNode: number): number;
    static runSearchMovementAroundCenter(hashGraph: Map<number, number[]>, start: number, current: number, center: number, lastNode: number): boolean;
    static isNodeSurroundedByNodes(hashGraph: Map<number, number[]>, nodeToCheck: number): boolean;
    static getOutsideNode(hashGraph: Map<number, number[]>): number;
    static randomIntBetween(x: number, y: number): number;
    static multiplyArray(array: number[], number: number): number[];
    static divideArray(array: number[], number: number): number[];
    static elementWiseMultiplication(array1: number[], array2: number[]): number[];
    static randomP5Color(): string;
    static getNodesOnOutsideOfCounterClockwiseGraph(hashGraph: Map<number, number[]>, numberOfIterations: number): number[];
    static addElementsToArray<T>(array: T[], elements: T[]): void;
    static removeIndicesFromArray<T>(array: T[], indices: number[]): T[];
    static clampNumber(number: number, bottomClamp: number, topClamp: number): void;
}
