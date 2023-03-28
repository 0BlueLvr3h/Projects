package firstgame;

import java.util.List;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.texture.Texture;

import javafx.scene.image.Image;

public class KeyComponent extends Component {
	private List<Entity> doorTop;
	private List<Entity> doorMid;
	private Entity top;
	private Entity mid;
	private Texture texture;

	public KeyComponent() {

	}

	@Override
	public void onAdded() {
		doorTop = FXGL.getGameScene().getGameWorld().getEntitiesByComponent(DoorTopComponent.class);
		doorMid = FXGL.getGameScene().getGameWorld().getEntitiesByComponent(DoorComponent.class);

		for (Entity e : doorTop) {
			top = e;
		}

		for (Entity e : doorMid) {
			mid = e;
		}

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.KEY) {

			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				top.getViewComponent().clearChildren();
				texture = FXGL.getAssetLoader().loadTexture("door_openTop.png");
				top.getViewComponent().addChild(texture);

				mid.getViewComponent().clearChildren();
				texture = FXGL.getAssetLoader().loadTexture("door_openMid.png");
				mid.getViewComponent().addChild(texture);

			}

			@Override
			protected void onCollision(Entity a, Entity b) {
				mid.getComponent(DoorComponent.class).setHasKey(true);
				b.removeFromWorld();
			}
		});
	}
}
