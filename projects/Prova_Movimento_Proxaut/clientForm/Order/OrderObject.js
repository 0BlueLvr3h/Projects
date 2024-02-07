class orderObject{
    constructor(orderUpdateId,nodes,edges){
        this.orderUpdateId = orderUpdateId;
        this.nodes = nodes;
        this.edges = edges;
    }
    
    getNodes(){
        return this.nodes;
    }
    
    getEdges(){
        return this.edges;
    }
    
    getOrderUpdateId(){
        return this.orderUpdateId;
    }
    
    setNodes(nodes){
        this.nodes = nodes;
    }
    
    setEdges(edges){
        this.edges = edges;
    }
    
    setOrderUpdateId(orderUpdateId){
        this.orderUpdateId = orderUpdateId;
    }

    


}