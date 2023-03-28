package firstgame;

import com.almasb.fxgl.audio.Sound;
import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.physics.box2d.dynamics.FixtureDef;
import javafx.geometry.Point2D;

public class PlayerComponent extends Component {

	private PhysicsComponent physics;
	private Sound sound;
	protected boolean win = false;

	private int jumps = 2;

	public PlayerComponent() {
	}

	@Override
	public void onAdded() {
		entity.getTransformComponent().setScaleOrigin(new Point2D(16, 21));
		physics.setFixtureDef(new FixtureDef().friction(0.0f));
		sound = FXGL.getAssetLoader().loadSound("jump.mp3");
		physics.onGroundProperty().addListener((obs, old, isOnGround) -> {
			if (isOnGround) {
				jumps = 2;
			}
		});
	}
	
	public boolean hasWin() {
		return win;
	}

	public void left(boolean v) {
		if (!v) {
			getEntity().setScaleX(-1);
			physics.setVelocityX(-150);
		} else {
			getEntity().setScaleX(-3);
			physics.setVelocityX(-300);
		}
	}

	public void right(boolean v) {
		if (!v) {
			getEntity().setScaleX(1);
			physics.setVelocityX(150);
		} else {
			getEntity().setScaleX(3);
			physics.setVelocityX(300);
		}
	}

	public void stop() {
		physics.setVelocityX(0);
	}

	public void jump() {
		if (jumps == 0)
			return;
		FXGL.getAudioPlayer().playSound(sound);
		physics.setVelocityY(-300);

		jumps--;
	}

}
