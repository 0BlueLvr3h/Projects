class actionParameter{
    constructor(key,value) {
        setMap(key,value);
    }

    getMap(){
        return this.map
    }

    setMap(key,value){
        this.map = new Map(key,value);
    }

    

}