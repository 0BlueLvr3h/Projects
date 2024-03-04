class AGV {
  constructor(uuid, graphicElement, homePosition) {
    this.uuid = uuid;
    this.graphicElement = graphicElement;
    this.homePosition = homePosition;
    this.currentX = homePosition.y;
    this.currentY = homePosition.x;
    this.acceleration = 1;
    this.speed = 0;
    this.rotation = 90;
    this.load = "";
  }
  
  addLoad(loadToadd) {
    this.load = loadToadd;
  }

  unload() {
    this.load = "";
  }

  isNextNodeReleased(nextNode) {
    if (nextNode.isReleased()) {
      return true;
    }
    return false;
  }

  returnHome() {
    moveTo(this.homePosition);
  }

  move(final) {

    document.getElementById("buttons").innerHTML = "";
    let index = 0;
    let element = this.graphicElement;
    let home = this.homePosition;
    let acceleration = this.acceleration;

    function rotateAGV(angleDegrees) {
      return new Promise(resolve => {
        element.style.transition = "transform 1s ease";
        element.style.transform = `rotate(${angleDegrees}deg)`;
        setTimeout(() => {
          element.style.transition = "";
          resolve();
        }, 800);
      });
    }

    async function animateNode() {
      try {
        const destinationX = final[index].x;
        const destinationY = final[index].y;

        let startX = element.offsetTop;
        let startY = element.offsetLeft;
        const deltaX = destinationX - startX;
        const deltaY = destinationY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        let angleRadians = Math.atan2(deltaX, deltaY);
        let angleDegrees = angleRadians * (180 / Math.PI);

        angleDegrees = angleDegrees > 180 ? angleDegrees - 360 : angleDegrees;
        angleDegrees = angleDegrees < -180 ? angleDegrees + 360 : angleDegrees;

        document.getElementById("orders").disabled = true;
        document.getElementById("animation").disabled = true;
        document.getElementById("returnHome").disabled = true;

        await rotateAGV(angleDegrees);

        const step = 1;
        const stepsCount = Math.ceil(distance / step);
        const stepX = deltaX / stepsCount;
        const stepY = deltaY / stepsCount;

        let stepIndex = 0;

        const moveInterval = setInterval(() => {
          if (stepIndex >= stepsCount) {

            document.getElementById("buttons").innerHTML = "";
            clearInterval(moveInterval);

            index++;

            if (index < final.length) {
              document.getElementById("buttons").innerHTML = "";
              animateNode();
            }

            if (final[index - 1].x == home.x && final[index - 1].y == home.y) {
              document.getElementById("orders").disabled = false;
              document.getElementById("animation").disabled = false;
              document.getElementById("returnHome").disabled = true;
            }

            if (final[index] != undefined && final[index] != home) {
              final[index].setReleased(true);
            }
          } else {
            if (final[index + 1] != undefined) {
              final[index + 1].setReleased(false);
            }

            startX += stepX * acceleration;
            startY += stepY * acceleration;
            element.style.top = startX + "px";
            element.style.left = startY + "px";
            stepIndex++;

            const remainingDistance = Math.sqrt(
              (final[index].x - startX) * (final[index].x - startX) +
              (final[index].y - startY) * (final[index].y - startY)
            ).toFixed(2);

            if (remainingDistance < step) {
              clearInterval(moveInterval);
              index++;

              document.getElementById("buttons").innerHTML = "";

              if (index < final.length) {
                document.getElementById("buttons").innerHTML = "";
                animateNode();
              } else {
                document.getElementById("returnHome").disabled = false;
                var loadButton = document.createElement("button");
                loadButton.innerHTML = "Load/Unload";

                loadButton.addEventListener("click", () => {
                  toggleDisplay("overlay");
                  toggleDisplay("load");
                  document.getElementById("order").style.display = "none";

                })

                document.getElementById("buttons").appendChild(loadButton);
              }

              if (final[index - 1].x == home.x && final[index - 1].y == home.y) {
                document.getElementById("animation").disabled = false;
                document.getElementById("orders").disabled = false;
                document.getElementById("returnHome").disabled = true;
              }
            }
          }
        }, 8);
      } catch (error) {
        console.log("Node Error");
      }

    }

    animateNode();
  }
}
