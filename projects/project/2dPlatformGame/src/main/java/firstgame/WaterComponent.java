package firstgame;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.physics.PhysicsComponent;

import javafx.animation.TranslateTransition;
import javafx.geometry.Point2D;

public class WaterComponent extends Component {

	public WaterComponent() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void onAdded() {
		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.WATER) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				a.getComponent(PhysicsComponent.class).overwritePosition(new Point2D(50, 335));
				FXGL.getGameController().gotoMainMenu();
				FXGL.showMessage("sei morto");
				
			}
		});
		
	}
}
