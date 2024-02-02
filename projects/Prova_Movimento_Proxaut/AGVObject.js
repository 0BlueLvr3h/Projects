class AGV{
    
    constructor(graphicElement, homePosition){
        this.graphicElement = graphicElement;
        this.homePosition = homePosition;
        this.currentX = homePosition.y;
        this.currentY = homePosition.x;
        this.acceleration = 1;
        this.speed = 0;
        this.rotation = 90;
        this.weight = 1000;
    }

    returnHome(){
        moveTo(this.homePosition);
    }

    move(final) {
        let index = 0;
        let element = this.graphicElement;
        let home = this.homePosition;
        let acceleration = this.acceleration;
        function animateNode() {
            console.log("entra");
            const destinationX = final[index].x;
            const destinationY = final[index].y;

            let startX = element.offsetTop;
            let startY = element.offsetLeft;
            const deltaX = (destinationX - startX);
            const deltaY = (destinationY - startY);
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            document.getElementById("animation").disabled = true;
            document.getElementById("changeButton").disabled = true;

            const step = 1;
            const stepsCount = Math.ceil(distance / step);
            const stepX = deltaX / stepsCount;
            const stepY = deltaY / stepsCount;

            let stepIndex = 0;

            const moveInterval = setInterval(() => {
                if (stepIndex >= stepsCount) {
                    clearInterval(moveInterval);

                    index++;
            
                    if (index < final.length) {
                        animateNode();
                    }
            
                    if (final[index - 1].x == home.x && final[index - 1].y == home.y) {
                        document.getElementById("animation").disabled = false;
                        document.getElementById("changeButton").disabled = false;
                        home.setReleased(false);
                        console.log("home: "+ home.isNodeReleased());
                    }
                    
                    if(final[index]!=undefined && final[index]!=home){
                        final[index].setReleased(true);

                        console.log("home: "+ home.isNodeReleased());
                    }
                    
                } else {
                    if(final[index+1] !=undefined){
                        final[index+1].setReleased(false);
                        home.setReleased(true);
                        console.log("home: "+ home.isNodeReleased());
                    }
                    startX += (stepX * acceleration);
                    startY += (stepY * acceleration);
                    element.style.top = startX + "px";
                    element.style.left = startY + "px";
                    stepIndex++;
                    collisionDetector(startX,startY,final);
                    /*

                    const remainingDistance = (Math.sqrt(
                        (final[index].x - startX) * (final[index].x - startX) +
                        (final[index].y - startY) * (final[index].y - startY)
                    )).toFixed(2);

                    console.log(remainingDistance);
                    if (remainingDistance < step) {
                        clearInterval(moveInterval);
                        index++;
            
                        if (index < final.length) {
                            animateNode();
                        }
            
                        if (final[index - 1].x == home.x && final[index - 1].y == home.y) {
                            document.getElementById("animation").disabled = false;
                            document.getElementById("changeButton").disabled = false;
                        }
                        console.log("arrivato");
                    }*/ 
                }
            }, 8);
            
        }

        animateNode();
    }


    load(load){
        this.weight = this.weight + load.weight;
    }


    unload(load){
        this.weight = this.weight - load.weight;
    }

    
    isNextNodeReleased(nextNode){
        if(nextNode.isReleased()){
            return true;
        }
        return false;
    }


}