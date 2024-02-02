package firstgame;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.texture.Texture;
import com.almasb.fxgl.time.LocalTimer;

import javafx.scene.image.Image;
import javafx.util.Duration;

public class JumperComponent extends Component {

	private boolean isColliding = false;
	private Entity player;
	private int contatore;
	private Texture texture;
	private LocalTimer newMove;
	private Duration duration;

	public JumperComponent(int patrolEndY, double y) {
		duration = Duration.seconds(1);
	}

	@Override
	public void onAdded() {
		newMove = FXGL.newLocalTimer();
		newMove.capture();

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, entity.getType()) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				player = a;
				isColliding = true;

				entity.getViewComponent().clearChildren();
				texture = FXGL.getAssetLoader().loadTexture("springboardDown.png");
				entity.getViewComponent().addChild(texture);
				contatore++;

			}

			@Override
			protected void onCollisionEnd(Entity a, Entity b) {
				isColliding = false;
				entity.getViewComponent().clearChildren();
				texture = FXGL.getAssetLoader().loadTexture("springboardUp.png");
				entity.getViewComponent().addChild(texture);
				contatore++;

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
