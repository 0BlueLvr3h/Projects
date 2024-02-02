package firstgame;

import com.almasb.fxgl.dsl.components.Effect;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.components.TimeComponent;

import javafx.util.Duration;

public class SuperSlowTimeEffect extends Effect {

	Entity e;

	public SuperSlowTimeEffect(Entity e) {
		super(Duration.seconds(0.5));
		this.e = e;
	}

	@Override
	public void onEnd(Entity arg0) {

		e.getComponent(TimeComponent.class).setValue(3.0);

	}

	@Override
	public void onStart(Entity arg0) {

		e.getComponent(TimeComponent.class).setValue(0.05);

	}

}
