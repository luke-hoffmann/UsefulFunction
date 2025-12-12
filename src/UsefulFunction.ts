export class UsefulFunction {
    static getIndexOfArrayMax(arrayOfNumbers : number[]) : number {
        if (!(Array.isArray(arrayOfNumbers))) throw Error("arrayOfNumbers is not an array");
        if (arrayOfNumbers.length ==0) throw Error("arrayOfNumbers contains no elements")
        let indexOfMax = 0;
        let max = arrayOfNumbers[0];
        for (let i =0 ; i < arrayOfNumbers.length; i++) {
            let number = arrayOfNumbers[i];
            
            if (number > max) {
                max = number;
                indexOfMax = i;
            }
        }
        return indexOfMax;
    }
    static isMixedUpArraysEqual<T>(array1 : T[],array2 : T[]) : boolean{
        if (array1.length !== array2.length) return false;
        array1 = [...array1];
        array2 = [...array2];
        for (let i=array1.length-1; i >=0 ;i--) {
            for (let j=array2.length-1; j >=0 ;j--) {
                if (array1[i] === array2[j]) {
                    array1.splice(i,1);
                    array2.splice(j,1);
                }
            }
        }
        return (array1.length ==0 && array2.length ==0);
    }
    static isThereValueGreaterThanN(array : number[],n : number) : boolean{
        for (const value of array) {
            if (value > n) {
                return true;
            }
        }
        return false;
    }
    // source - chatgpt
    static noDuplicates = <T,>(arr: T[]): T[] => [...new Set(arr)];

    static combineArrays<T>(arrayOfArrays : T[][]) : T[]{
        let outputArray = [];
        for (const array of arrayOfArrays) {
            for (const object of array) {
                outputArray.push(object);
            }
        }
        return outputArray;
    }
    static arrayOfIndices(n : number) : number[] {
        let array = [];
        for (let i =0 ; i < n; i ++) {
            array.push(i);
        }
        return array;
    }
    static addToMap<T>(map : Map<T,T[]>, key : T, value : T) : Map<T,T[]>{
        if (!map.has(key)) {
          map.set(key, []); // Initialize with an empty array if key does not exist
        }
        const val = map.get(key)!.push(value); // Push new value into the array
        return map;
    }
    static incrementMap<T>(map : Map<T,number>,key : T) : void{
        if (!map.has(key)) throw new Error("Supplied map is bad");
        map.set(key,map.get(key)!+1)
    }
    
    static isInArray<T>(array : T[],value : T) : boolean{
        for (let i =0; i < array.length;i++) {
            if (array[i] === value) return true;
        }
        return false;
    }
    
    static getCounterClockwiseMove<T>(hashGraph : Map<number,number[]>,currentNode : number) : number {
        if (!hashGraph.has(currentNode)) throw Error("Key not found");
        let possibleNextMoves = [...hashGraph.get(currentNode)!];
        if(possibleNextMoves.length == 1) {
            currentNode = possibleNextMoves[0];
            return currentNode;
        }
        for (let i =possibleNextMoves.length-1; i >= 0;i--) {
            if (!this.doesMoveExistElsewhere(hashGraph,currentNode,possibleNextMoves[i])) continue;

            possibleNextMoves.splice(i,1);

        }
        return possibleNextMoves[0];
    }
    static doesMoveExistElsewhere<T>(map : Map<number,number[]>,valueToFind :number,keyToCheckUnder : number) : boolean{
        if (map.has(valueToFind) == false) throw new Error("Could not find node");
        return this.isInArray(map.get(keyToCheckUnder)!,valueToFind);
    }

    static doesKeyHaveSpecificValue(hashGraph : Map<number,number[]>,key : number,specificValue : number) :boolean{
        if (!(hashGraph.has(key))) throw Error("Key not found in hash graph");
        let arrayFromKey = hashGraph.get(key)!;
        for (let i =0; i < arrayFromKey.length ; i ++) {
            if (arrayFromKey[i] === specificValue) return true;
        }
        return false;
    }
    
    static findNodeThatHasSpecificNodeAsConnection(hashGraph : Map<number,number[]>,startingNode : number,specificNode : number,lastNode : number) : number{
        if (!(hashGraph.has(startingNode))) throw Error("Key not found in hash graph");
        let connectionsToStartingNode = hashGraph.get(startingNode)!;
        
        for (let i =0; i < connectionsToStartingNode.length;i++) {
            if (connectionsToStartingNode[i] === lastNode) continue;
            
            if (!this.doesKeyHaveSpecificValue(hashGraph,connectionsToStartingNode[i],specificNode)) {
                continue;
            }

            return connectionsToStartingNode[i];
        }
        return -1;
    }

    static runSearchMovementAroundCenter(hashGraph : Map<number,number[]>,start : number,current : number,center : number,lastNode : number){

        let numberOfIterations = 100;
        let iteration = 1;
        let currentNode = current;
        let nodeToCheck = center;
        let startingNode = start;
        while(currentNode != startingNode) {
            iteration++;
            if (iteration > numberOfIterations) {
                // throw new Error("Upper limit of iterations reached")
                return false;
            }
            if (currentNode == -1) {
                return false;
            } 
            let temp = currentNode;
            currentNode = this.findNodeThatHasSpecificNodeAsConnection(hashGraph,currentNode,nodeToCheck,lastNode);
            
            lastNode = temp;
        }
        return true;
    }
    static isNodeSurroundedByNodes(hashGraph : Map<number,number[]>,nodeToCheck : number)  : boolean{
        if (!(hashGraph.has(nodeToCheck))) throw Error("Key not found in hash graph");
        let connectionsToNode = hashGraph.get(nodeToCheck)!;
        
        let iteration = 1;
        let numberOfIterations = 100;
        let result = [];
        for (let i =0; i < connectionsToNode.length;i++) {
        
            let startingNode = connectionsToNode[i];
            let lastNode = startingNode;
            let currentNode = this.findNodeThatHasSpecificNodeAsConnection(hashGraph,startingNode,nodeToCheck,lastNode);
            let pathwayConnects = this.runSearchMovementAroundCenter(hashGraph,startingNode,currentNode,nodeToCheck,lastNode)
            result.push(pathwayConnects);
        }
        return this.isInArray(result,true)

    }

    static getOutsideNode(hashGraph : Map<number,number[]>) : number {
        for (const key of hashGraph.keys()) {
            
            if (this.isNodeSurroundedByNodes(hashGraph,key)) continue;
            
            return key; 
        }
        return -1;
    }
    static randomIntBetween(x : number,y : number) : number{
        let change = Math.round(Math.random() *(y-x));
        return x + change;
    }
    static multiplyArray(array : number[],number : number) : number[]{
        let newArray = [];
        for (const element of array) {
            newArray.push(element*number);
        }
        return newArray;
    }
    static divideArray(array : number[],number : number) : number[]{
        if (number ==0) throw new Error("Divisor is 0, critical failure, cannot divide by zero!");
        let newArray = [];
        for (const element of array) {
            newArray.push(element/number);
        }
        return newArray;
    }
    static elementWiseMultiplication(array1 : number[],array2 : number[]){
        if (array1.length != array2.length) throw new Error("Array lengths are different!");
        let productArray = [];
        for (let i =0 ; i < array1.length;i ++) {
            productArray.push(array1[i] * array2[i]);
        }
        return productArray;
    }
    static randomP5Color() : string{
        return "rgb(" + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + "," + Math.round(Math.random()*255) + ")";
    }

    static getNodesOnOutsideOfCounterClockwiseGraph(hashGraph : Map<number, number[]>,numberOfIterations : number) {
        if (numberOfIterations == undefined) {
            numberOfIterations = 15;
        }
        let iterationNumber = 1;
        let map = new Map(hashGraph);

        
        let goalIndex = this.getOutsideNode(hashGraph);
        let currentIndex = this.getCounterClockwiseMove(hashGraph,goalIndex);
        let pathway = [];


        while (iterationNumber < numberOfIterations && currentIndex != goalIndex) {
            iterationNumber++;
            let nextMove = this.getCounterClockwiseMove(hashGraph,currentIndex);
            pathway.push(currentIndex);
            currentIndex=nextMove;
            

        }
        pathway.push(currentIndex);

        return pathway;
    }
    static addElementsToArray<T>(array : T[] ,elements : T[]){
        for (const element of elements) {
            array.push(element);
        }
    }
    static removeIndicesFromArray<T>(array : T[],indices : number[]) {
        array = [...array];
        let index;
        for (let i = indices.length-1; i >= 0; i--) {
            index = indices[i];
            array.splice(index,1);
        }
        return array;
    }
    static clampNumber(number : number, bottomClamp : number, topClamp : number) {
        number = number > topClamp ? topClamp : number;
        number = number < bottomClamp ? bottomClamp : number;
    }
    
}