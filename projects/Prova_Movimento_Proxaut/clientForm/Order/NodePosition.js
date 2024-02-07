class nodePosition{
    constructor(x,y,mapId){
        this.x = x;
        this.y = y;
        this.mapId = mapId;
    }
    
    getX(){
        return this.x;
    }
    
    getY(){
        return this.y;
    }
    
    getMapId(){
        return this.mapId;
    }
    
    setX(x){
        this.x = x;
    }
    
    setY(y){
        this.y = y;
    }
    
    setMapId(mapId){
        this.mapId = mapId;
    }
}