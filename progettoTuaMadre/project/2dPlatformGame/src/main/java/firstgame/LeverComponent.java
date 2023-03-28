package firstgame;

import static com.almasb.fxgl.dsl.FXGL.image;

import java.util.List;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.texture.Texture;

import javafx.scene.image.Image;

public class LeverComponent extends Component {
	private Texture texture;
	private boolean isOpen;
	private List<Entity> list;

	public LeverComponent() {
	}

	private int contatore = 0;

	@Override
	public void onAdded() {
		isOpen = false;
		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, entity.getType()) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				list = FXGL.getGameScene().getGameWorld().getEntitiesByComponent(LaserComponent.class);
				for (Entity e : list) {
					e.removeFromWorld();
				}
				entity.getViewComponent().clearChildren();
				if (contatore % 2 == 0) {
					texture = FXGL.getAssetLoader().loadTexture("laserSwitchGreenOff.png");
					entity.getViewComponent().addChild(texture);
					contatore++;
					isOpen = true;
				} else {
					texture = FXGL.getAssetLoader().loadTexture("laserSwitchGreenOn.png");
					entity.getViewComponent().addChild(texture);
					contatore++;
					isOpen = false;
				}
			}

		});

	}

	public boolean isOpen() {
		return isOpen;
	}

}
