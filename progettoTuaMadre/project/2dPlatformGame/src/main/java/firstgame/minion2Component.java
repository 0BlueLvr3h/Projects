package firstgame;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.texture.AnimatedTexture;
import com.almasb.fxgl.texture.AnimationChannel;
import com.almasb.fxgl.time.LocalTimer;

import javafx.util.Duration;

public class minion2Component extends Component {
	private int speed = 0;
	private AnimatedTexture texture;
	private AnimationChannel animIdle, animWalk;
	private LocalTimer newMove;
	protected Duration duration;
	private boolean vero;

	public minion2Component() {
		animIdle = new AnimationChannel(FXGL.image("barnacle.png"), Duration.seconds(1), 1);
		animWalk = new AnimationChannel(FXGL.image("barnacle_bite.png"), Duration.seconds(1), 1);
		duration = Duration.millis(100);
		texture = new AnimatedTexture(animIdle);
	}

	@Override
	public void onAdded() {
		entity.getViewComponent().addChild(texture);
		newMove = FXGL.newLocalTimer();
		newMove.capture();
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
	}
}
