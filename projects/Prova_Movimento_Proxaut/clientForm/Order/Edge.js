class Edge{
    constructor(edgeId,sequenceId,startNodeId,endNodeId,released,actions){
        this.edgeId = edgeId;
        this.sequenceId = sequenceId;
        this.startNodeId = startNodeId;
        this.endNodeId = endNodeId;
        this.released = released;
        this.actions = actions;
    }
    
    getEdgeId(){
        return this.edgeId;
    }
    
    getSequenceId(){
        return this.sequenceId;
    }
    
    getStartNodeId(){
        return this.startNodeId;
    }
    
    getEndNodeId(){
        return this.endNodeId;
    }
    
    getReleased(){
        return this.released;
    }
    
    getActions(){
        return this.actions;
    }
    
    
    
    setEdgeId(edgeId){
        this.edgeId = edgeId;
    }
    
    setSequenceId(sequenceId){
        this.sequenceId = sequenceId;
    }
    
    setStartNodeId(startNodeId){
        this.startNodeId = startNodeId;
    }
    
    setEndNodeId(endNodeId){
        this.endNodeId = endNodeId;
    }
    
    setReleased(released){
        this.released = released;
    }
    
    setActions(actions){
        this.actions = actions;
    }
    

}