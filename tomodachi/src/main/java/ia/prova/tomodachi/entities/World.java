package ia.prova.tomodachi.entities;

import java.util.ArrayList;
import java.util.List;

public class World {
    private List<Avatar> avatars;

    public World() {
        avatars = new ArrayList<>();
        avatars.add(new Avatar("Alice"));
        avatars.add(new Avatar("Bob"));
        avatars.add(new Avatar("Charlie"));
    }

    public void simulate() {
        for (int i = 0; i < 10; i++) { // 10 cicli di simulazione
            System.out.println("Ciclo " + (i + 1));
            for (Avatar agent : avatars) {
                agent.updateNeeds();
                if (agent.getHunger() > 70) {
                    agent.eat();
                } else if (agent.getEnergy() < 30) {
                    agent.sleep();
                } else {
                    Avatar other = avatars.get((int) (Math.random() * avatars.size()));
                    if (!other.equals(agent)) {
                        agent.interactWith(other);
                    }
                }
            }
        }
    }
}
