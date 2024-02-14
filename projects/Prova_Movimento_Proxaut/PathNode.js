
class PathNode {
    constructor(index, x, y, isReleased, isHome = false){
        this.index = index;
        this.x = x;
        this.y = y;
        this.isHome = isHome;
        this.isReleased = isReleased;
    }

    getNodeX(){
        return this.x;
    }
    
    getNodeY(){
        return this.y;
    }

    isThisNodeHome(){
        return this.isHome;
    }

    setHome(){
        this.isHome = true;
    }

    getIndex(){
        return this.index;
    }
    
    setReleased(flag){
        this.isReleased = flag;
    }

    isNodeReleased(){
        return this.isReleased;
    }
    

}