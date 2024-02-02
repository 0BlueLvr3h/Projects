package firstgame;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.physics.box2d.dynamics.BodyType;
import com.almasb.fxgl.time.LocalTimer;

import javafx.util.Duration;

public class fireBallComponent extends Component {

	private double y;
	private Entity fireball;
	private int patrolEndY;
	private double distance;
	private Duration duration;
	private LocalTimer newMove;
	private double speed;
	private boolean goingRight;
	private PhysicsComponent physicsComponent;

	public fireBallComponent(int patrolEndY, double y) {
		this.y = y;
		this.patrolEndY = patrolEndY;
		physicsComponent = new PhysicsComponent();
	}

	@Override
	public void onAdded() {
		distance = patrolEndY - y;
		duration = Duration.seconds(0.6);
		newMove = FXGL.newLocalTimer();
		newMove.capture();
		speed = distance / duration.toSeconds();
		physicsComponent.setBodyType(BodyType.KINEMATIC);
		entity.addComponent(physicsComponent);
	}

	@Override
	public void onUpdate(double tpf) {
		if (newMove.elapsed(duration)) {
			goingRight = !goingRight;
			newMove.capture();
		}
		physicsComponent.setVelocityY(goingRight ? -speed * 0.016 * 65 : speed * 0.016 * 65);
	}
}
