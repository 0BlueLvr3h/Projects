class Nodee{
    constructor(nodeId,sequenceId,released,nodePosition,actions){
        this.nodeId = nodeId;
        this.sequenceId = sequenceId;
        this.released = released;
        this.nodePosition = nodePosition;
        this.actions = actions;
    }
    
    getNodeId(){
        return this.nodeId;
    }
    
    getSequenceId(){
        return this.sequenceId;
    }
    
    getReleased(){
        return this.released;
    }
    
    getNodePosition(){
        return this.nodePosition;
    }
    
    getActions(){
        return this.actions;
    }
    
    setNodeId(nodeId){
        this.nodeId = nodeId;
    }
    
    setSequenceId(sequenceId){
        this.sequenceId = sequenceId;
    }
    
    setReleased(released){
        this.released = released;
    }
    
    setNodePosition(nodePosition){
        this.nodePosition = nodePosition;
    }
    
    setActions(actions){
        this.actions = actions;
    }
    
    
    
    
    
}