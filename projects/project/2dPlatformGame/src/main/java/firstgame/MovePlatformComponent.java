package firstgame;

import com.almasb.fxgl.core.math.Vec2;
import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.physics.box2d.dynamics.BodyType;
import com.almasb.fxgl.physics.box2d.dynamics.FixtureDef;
import com.almasb.fxgl.texture.AnimatedTexture;
import com.almasb.fxgl.texture.AnimationChannel;
import com.almasb.fxgl.time.LocalTimer;

import javafx.util.Duration;

public class MovePlatformComponent extends Component {
	private boolean goingUp = true;
	private Duration duration;
	private double distance;
	private double speed;
	private int patrolEndY;
	private int patrolEndX;
	private double y;
	private PhysicsComponent physicsComponent;
	private double x;

	public MovePlatformComponent(int patrolEndX, int patrolEndY, double y, double x) {
		physicsComponent = new PhysicsComponent();
		this.patrolEndY = patrolEndY;
		this.patrolEndX = patrolEndX;
		this.y = y;
		this.x = x;
		if (distance < -400 || distance > 400) {
			duration = Duration.seconds(2);
		} else {
			duration = Duration.seconds(6);
		}

	}

	protected LocalTimer newMove;

	@Override
	public void onAdded() {
		if (patrolEndY == 0) {
			distance = patrolEndX - x;
		} else {
			distance = patrolEndY - y;
		}
		newMove = FXGL.newLocalTimer();
		newMove.capture();
		speed = distance / duration.toSeconds();
		physicsComponent.setBodyType(BodyType.KINEMATIC);
		entity.addComponent(physicsComponent);

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.MOVE_PLATFORM) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				a.getComponent(PhysicsComponent.class).setFixtureDef(new FixtureDef().friction(10));
			}

			@Override
			protected void onCollisionEnd(Entity a, Entity b) {
				a.getComponent(PhysicsComponent.class).setFixtureDef(new FixtureDef().friction(0.0f));
			}
		});
	}

	@Override
	public void onUpdate(double tpf) {
		if (newMove.elapsed(duration)) {
			goingUp = !goingUp;
			newMove.capture();
		}
		if (patrolEndY == 0) {
			physicsComponent.setVelocityX((goingUp ? speed * 0.016 * 50 : -speed * 0.016 * 50));
		} else {
			physicsComponent.setVelocityY((goingUp ? speed * 0.016 * 50 : -speed * 0.016 * 50));
		}

	}

}
