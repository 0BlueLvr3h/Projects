package firstgame;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.texture.Texture;

public class newJumperComponent extends Component {
	private Texture texture;
	private boolean isColliding;
	private Entity player;

	public newJumperComponent() {

	}

	@Override
	public void onAdded() {
		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, entity.getType()) {

			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				player = a;
				isColliding = true;

				entity.getViewComponent().clearChildren();
				texture = FXGL.getAssetLoader().loadTexture("springboardDown.png");
				entity.getViewComponent().addChild(texture);
			}

			@Override
			protected void onCollisionEnd(Entity a, Entity b) {
				isColliding = false;

				entity.getViewComponent().clearChildren();
				texture = FXGL.getAssetLoader().loadTexture("springboardUp.png");
				entity.getViewComponent().addChild(texture);
			}
		});
	}

	@Override
	public void onUpdate(double tpf) {
		if (isColliding) {
			player.getComponent(PhysicsComponent.class).setVelocityY(-600);
		}
	}

}
