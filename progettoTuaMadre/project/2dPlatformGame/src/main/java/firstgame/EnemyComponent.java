package firstgame;

import com.almasb.fxgl.core.math.FXGLMath;
import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.physics.box2d.dynamics.BodyType;
import com.almasb.fxgl.texture.AnimatedTexture;
import com.almasb.fxgl.texture.AnimationChannel;
import com.almasb.fxgl.time.LocalTimer;

import javafx.util.Duration;

public class EnemyComponent extends Component {

	private boolean goingRight = true;
	private Duration duration;
	private double distance;
	public boolean goingUp;
	private double speed;
	private int patrolEndX;
	private double x;
	private PhysicsComponent physicsComponent;

	public EnemyComponent(int patrolEndx, double x) {
		physicsComponent = new PhysicsComponent();
		this.patrolEndX = patrolEndx;
		this.x = x;

	}

	protected LocalTimer newMove;

	@Override
	public void onAdded() {
		distance = patrolEndX - x;
		if (distance < -400 || distance > 400) {
			duration = Duration.seconds(6);
		} else {
			duration = Duration.seconds(2);
		}

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
		physicsComponent.setVelocityX(goingRight ? speed * 0.016 * 50 : -speed * 0.016 * 50);
		entity.setScaleX(goingRight ? 1 : -1);
	}
}
