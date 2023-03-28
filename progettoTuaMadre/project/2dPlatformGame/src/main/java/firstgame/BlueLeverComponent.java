package firstgame;

import javax.imageio.plugins.tiff.GeoTIFFTagSet;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.component.Component;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.texture.Texture;

public class BlueLeverComponent extends Component {

	private Texture texture;

	public BlueLeverComponent() {
		texture = FXGL.getAssetLoader().loadTexture("laserSwitchBlueOn.png");
	}

	@Override
	public void onAdded() {
		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, entity.getType()) {
			private int contatore;

			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				entity.getViewComponent().clearChildren();
				if (contatore % 2 == 0) {
					texture = FXGL.getAssetLoader().loadTexture("laserSwitchBlueOn.png");
					entity.getViewComponent().addChild(texture);
					contatore++;
				} else {
					texture = FXGL.getAssetLoader().loadTexture("laserSwitchBlueOff .png");
					entity.getViewComponent().addChild(texture);
					contatore++;
				}
			}
		});
	}

	@Override
	public void onUpdate(double tpf) {

	}
}
