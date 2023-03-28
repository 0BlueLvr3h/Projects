package firstgame;

import com.almasb.fxgl.core.math.Vec2;
import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.SpawnData;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.texture.AnimatedTexture;
import com.almasb.fxgl.texture.AnimationChannel;
import com.almasb.fxgl.time.LocalTimer;

import javafx.geometry.Point2D;
import javafx.util.Duration;

public class bossComponent extends Component {

	private int speed = 0;
	private AnimatedTexture texture;
	private AnimationChannel animIdle, animWalk;
	private LocalTimer newMove;
	protected Duration duration;
	private boolean vero;

	public bossComponent() {
		animIdle = new AnimationChannel(FXGL.image("snakeSlime.png"), Duration.seconds(1), 1);
		animWalk = new AnimationChannel(FXGL.image("snakeSlime_ani.png"), Duration.seconds(1), 1);
		duration = Duration.millis(100);
		texture = new AnimatedTexture(animIdle);
	}

	@Override
	public void onAdded() {
		entity.getViewComponent().addChild(texture);
		newMove = FXGL.newLocalTimer();
		newMove.capture();
	}

	public void onAngry() {
		this.duration = Duration.millis(200);
		this.animIdle = new AnimationChannel(FXGL.image("snakeLava.png"), Duration.seconds(1), 1);
		this.animWalk = new AnimationChannel(FXGL.image("snakeLava_ani.png"), Duration.seconds(1), 1);
	}

	public void notAngry() {
		this.duration = Duration.millis(500);
		this.animIdle = new AnimationChannel(FXGL.image("snakeSlime.png"), Duration.seconds(1), 1);
		this.animWalk = new AnimationChannel(FXGL.image("snakeSlime_ani.png"), Duration.seconds(1), 1);
	}

	@Override
	public void onUpdate(double tpf) {
		if (newMove.elapsed(duration)) {
			if (texture.getAnimationChannel() == animIdle) {
				texture.loopAnimationChannel(animWalk);
			} else {
				texture.loopAnimationChannel(animIdle);
			}
			newMove.capture();
		}

		if (newMove.elapsed(Duration.seconds(2))) {
			this.vero = true;
		}

	}

	@Override
	public void onRemoved() {

	}

	public void shoot(double n) {
		EntityCreator creator = new EntityCreator();
		Point2D center = entity.getCenter();

		for (int i = 0; i < (int) n; i++) {
			double y = (Math.random() * ((1233 - 1456) + 1)) + 1456;

			Vec2 dir = Vec2.fromAngle(entity.getRotation() - 180);

			creator.newShoot(new SpawnData(center.getX(), y).put("dir", dir.toPoint2D()));
		}

	}
}
