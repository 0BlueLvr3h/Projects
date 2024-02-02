package firstgame;

import static com.almasb.fxgl.dsl.FXGL.entityBuilder;
import static com.almasb.fxgl.dsl.FXGL.getAssetLoader;
import static com.almasb.fxgl.dsl.FXGL.texture;

import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.dsl.components.EffectComponent;
import com.almasb.fxgl.dsl.components.OffscreenCleanComponent;
import com.almasb.fxgl.dsl.components.ProjectileComponent;
import com.almasb.fxgl.dsl.views.ScrollingBackgroundView;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.EntityFactory;
import com.almasb.fxgl.entity.SpawnData;
import com.almasb.fxgl.entity.Spawns;
import com.almasb.fxgl.entity.components.CollidableComponent;
import com.almasb.fxgl.entity.components.IrremovableComponent;
import com.almasb.fxgl.entity.components.TimeComponent;
import com.almasb.fxgl.physics.BoundingShape;
import com.almasb.fxgl.physics.HitBox;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.physics.box2d.dynamics.BodyType;
import com.almasb.fxgl.physics.box2d.dynamics.FixtureDef;
import com.almasb.fxgl.texture.Texture;

import javafx.geometry.Point2D;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;

public class EntityCreator implements EntityFactory {

	Texture groundImage = getAssetLoader().loadTexture("nuovoground.png");

	public EntityCreator() {

	}

	@Spawns("background")
	public Entity newBackground(SpawnData data) {
		return entityBuilder().view(new ScrollingBackgroundView(texture("forest.png"))).zIndex(-2).at(0, 840)
				.with(new IrremovableComponent()).build();
	}

	@Spawns("sfondoGrotta")
	public Entity newSfondoGrotta(SpawnData data) {
		return entityBuilder().view(getAssetLoader().loadTexture("grotta.png")).zIndex(-1).opacity(1)
				.with(new IrremovableComponent()).build();
	}

	@Spawns("backgroundMare")
	public Entity newSfondoMare(SpawnData data) {
		return entityBuilder().view(getAssetLoader().loadTexture("sfondoMare.png")).zIndex(-1).opacity(1)
				.with(new IrremovableComponent()).build();
	}

	@Spawns("entrataGrotta")
	public Entity newEntrataGrotta(SpawnData data) {
		return entityBuilder().view(getAssetLoader().loadTexture("entrata.png")).zIndex(-1).opacity(1)
				.with(new IrremovableComponent()).build();
	}

	@Spawns("greenLever")
	public Entity newGreenLever(SpawnData data) {
		return entityBuilder().viewWithBBox(getAssetLoader().loadTexture("laserSwitchBlueOff.png")).with(new CollidableComponent(true))
				.with(new BlueLeverComponent()).build();
	}

	@Spawns("player")
	public Entity newPlayer(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		physics.setBodyType(BodyType.DYNAMIC);
		physics.addGroundSensor(new HitBox(BoundingShape.box(54, 59)));

		return FXGL.entityBuilder().at(50, 1135).view("batman.png").type(Type.PLAYER).zIndex(-1)
				.bbox(new HitBox(BoundingShape.box(54, 59))).with(physics).with(new PlayerComponent())
				.with(new CollidableComponent(true)).build();
	}

	@Spawns("fireball")
	public Entity newFireBall(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return entityBuilder().type(Type.FIREBALL).bbox(new HitBox(BoundingShape.box(width, height)))
				.view(getAssetLoader().loadTexture("fireballpiccola.png")).with(new CollidableComponent(true))
				.with(new fireBallComponent(data.get("patrolEndY"), data.getY())).build();
	}

	@Spawns("boss")
	public Entity newBoss(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return entityBuilder().type(Type.BOSS).bbox(new HitBox(BoundingShape.box(width, height))).zIndex(-1)
				.with(new CollidableComponent(true)).with(new bossComponent()).build();
	}

	@Spawns("trigger")
	public Entity newTrigger(double x, double y) {
		return entityBuilder().type(Type.TRIGGERBOX).view(new Rectangle(70, 210, Color.GREEN))
				.bbox(new HitBox(BoundingShape.box(70, 210))).at(x, y - 140).with(new CollidableComponent(true))
				.buildAndAttach();
	}

	@Spawns("minion1")
	public Entity newMinion1(double x, double y) {
		return entityBuilder().type(Type.SAW).bbox(new HitBox(BoundingShape.box(70, 70))).at(x, y + 40).zIndex(-1)
				.with(new CollidableComponent(true)).with(new minion1Component()).buildAndAttach();
	}

	@Spawns("minion2")
	public Entity newMinion2(double x, double y) {
		return entityBuilder().type(Type.BARNACLE).bbox(new HitBox(BoundingShape.box(70, 70))).at(x, y + 14).zIndex(-1)
				.with(new CollidableComponent(true)).with(new minion2Component()).buildAndAttach();
	}

	@Spawns("shoot")
	public Entity newShoot(SpawnData data) {
		Point2D dir = data.get("dir");
		double y = (Math.random() * ((500 - 200) + 1)) + 200;

		EffectComponent effectComponent = new EffectComponent();

		Entity e = entityBuilder(data).type(Type.SHOOT).viewWithBBox("bullet.png").with(new ProjectileComponent(dir, y))
				.with(new OffscreenCleanComponent()).with(new TimeComponent()).with(effectComponent).collidable()
				.buildAndAttach();

		e.setOnActive(() -> {
			effectComponent.startEffect(new SuperSlowTimeEffect(e));
		});

		return e;

	}

	@Spawns("spikes")
	public Entity newSpikes(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return entityBuilder().type(Type.SPIKE).bbox(new HitBox(BoundingShape.box(width, height)))
				.with(new CollidableComponent(true)).build();
	}

	@Spawns("platform")
	public Entity newPlatform(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		physics.setFixtureDef(new FixtureDef().friction(0.2f));
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		HitBox hitbox = new HitBox(BoundingShape.box(width, height));
		return entityBuilder().bbox(hitbox).with(physics).build();

	}

	@Spawns("platforNotJump")
	public Entity newPlatformNotJump(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		HitBox hitbox = new HitBox(BoundingShape.box(width, height));
		return entityBuilder().bbox(hitbox).with(new CollidableComponent(true)).with(new PhysicsComponent()).build();

	}

	@Spawns("movePlatform")
	public Entity newMovePlatform(SpawnData data) {
		int patrolEndX = data.get("patrolEndX");
		int patrolEndY = data.get("patrolEndY");
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		HitBox hitbox = new HitBox(BoundingShape.box(width, height));
		return entityBuilder().type(Type.MOVE_PLATFORM).viewWithBBox("platformmm.png").bbox(hitbox).zIndex(-1)
				.with(new CollidableComponent(true))
				.with(new MovePlatformComponent(patrolEndX, patrolEndY, data.getY(), data.getX())).build();
	}

	@Spawns("enemy")
	public Entity newEnemy(SpawnData data) {
		int patrolEndX = data.get("patrolEndX");
		return FXGL.entityBuilder().view(getAssetLoader().loadTexture("blockerMad.png")).type(Type.ENEMY)
				.bbox(new HitBox(BoundingShape.box(51, 51))).with(new CollidableComponent(true))
				.with(new EnemyComponent(patrolEndX, data.getX())).build();
	}

	@Spawns("ghostEnemy")
	public Entity newGhostEnemy(SpawnData data) {
		int patrolEndX = data.get("patrolEndX");
		return FXGL.entityBuilder().view(getAssetLoader().loadTexture("ghost_normal.png")).type(Type.ENEMY)
				.bbox(new HitBox(BoundingShape.box(51, 51))).with(new CollidableComponent(true))
				.with(new EnemyComponent(patrolEndX, data.getX())).build();
	}

	@Spawns("spiderEnemy")
	public Entity newSpiderEnemy(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		physics.setBodyType(BodyType.DYNAMIC);
		physics.setFixtureDef(new FixtureDef().friction(0.0f));
		int patrolEndX = data.get("patrolEndX");
		return FXGL.entityBuilder().view(getAssetLoader().loadTexture("spider.png")).type(Type.ENEMY)
				.bbox(new HitBox(BoundingShape.box(51, 51))).with(new CollidableComponent(true))
				.with(new EnemyComponent(patrolEndX, data.getX())).build();
	}

	@Spawns("water")
	public Entity newWater(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		physics.setFixtureDef(new FixtureDef().friction(0.2f));
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		HitBox hitbox = new HitBox(BoundingShape.box(width, height));
		return entityBuilder().type(Type.WATER).bbox(hitbox).with(physics).with(new WaterComponent())
				.with(new CollidableComponent(true)).build();

	}

	@Spawns("itemBlock")
	public Entity newItemBlock(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		HitBox hitbox = new HitBox(BoundingShape.box(width, height));
		return entityBuilder().viewWithBBox("boxItemAlt.png").type(Type.ITEM_BLOCK).bbox(hitbox)
				.with(new BlockComponent()).with(new CollidableComponent(true)).with(physics).build();
	}

	@Spawns("levelStart")
	public Entity newlevelStart(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return entityBuilder().viewWithBBox("signRight.png").zIndex(-1).with(new CollidableComponent(true)).build();
	}

	@Spawns("coin")
	public Entity newCoin(SpawnData data) {
		return FXGL.entityBuilder().type(Type.COIN).viewWithBBox("coinBronze.png")
				.bbox(new HitBox(BoundingShape.box(70, 70))).with(new CollidableComponent(true)).build();
	}

	@Spawns("ground")
	public Entity newGround(SpawnData data) {
		return entityBuilder().with(new PhysicsComponent()).build();

	}

	@Spawns("weapon")
	public Entity newWeapon(double height, double width) {
		PhysicsComponent physics = new PhysicsComponent();
		physics.setBodyType(BodyType.DYNAMIC);
		return FXGL.entityBuilder().at(height, width).view(getAssetLoader().loadTexture("swordSilver.png"))
				.type(Type.WEAPON).bbox(new HitBox(BoundingShape.box(70, 70))).with(physics)
				.with(new CollidableComponent(true)).buildAndAttach();
	}

	@Spawns("breakableBlock")
	public Entity newBreakableBlock(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox(getAssetLoader().loadTexture("boxAlt.png")).type(Type.BLOCK)
				.bbox(BoundingShape.box(width, height)).with(physics).with(new CollidableComponent(true)).build();
	}

	@Spawns("UnbreakableBlock")
	public Entity newUnBreakableBlock(double x, double y, PhysicsComponent ph) {
		return FXGL.entityBuilder().viewWithBBox(getAssetLoader().loadTexture("boxAlt.png")).at(x, y)
				.bbox(BoundingShape.box(70, 140)).with(ph).buildAndAttach();
	}

	@Spawns("UnbreakableBlock")
	public Entity newUnBreakableBlock(double x, double y) {
		PhysicsComponent physics = new PhysicsComponent();
		return FXGL.entityBuilder().viewWithBBox(getAssetLoader().loadTexture("boxAlt.png")).at(x, y)
				.bbox(BoundingShape.box(70, 140)).buildAndAttach();
	}

	@Spawns("pEsclamativo")
	public Entity newPuntoEsclamativo(double x, double y) {
		return FXGL.entityBuilder().view(getAssetLoader().loadTexture("p-esclamativo.png")).at(x, y - 20)
				.bbox(BoundingShape.box(30, 30)).buildAndAttach();
	}

	@Spawns("coinBlock")
	public Entity newCoinBlock(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox(getAssetLoader().loadTexture("boxCoin.png")).type(Type.COIN_BLOCK)
				.bbox(BoundingShape.box(width, height)).with(physics).with(new CollidableComponent(true)).build();
	}

	@Spawns("goldCoin")
	public Entity newGoldCoin(SpawnData data) {
		PhysicsComponent physics = new PhysicsComponent();
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox(getAssetLoader().loadTexture("coinGold.png")).type(Type.COIN_GOLD)
				.bbox(BoundingShape.box(width, height)).with(physics).with(new CollidableComponent(true)).build();
	}

	@Spawns("exitDoorUp")
	public Entity newExitDoorUp(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox("door_closedTop.png").type(Type.DOORTOP).with(new DoorTopComponent())
				.bbox(BoundingShape.box(width, height)).with(new CollidableComponent(true)).build();
	}

	@Spawns("exitDoor")
	public Entity newExitDoor(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox("door_closedMid.png").type(Type.DOOR).with(new DoorComponent())
				.bbox(BoundingShape.box(width, height)).with(new CollidableComponent(true)).build();
	}

	@Spawns("key")
	public Entity newKey(double x, double y) {
		PhysicsComponent physics = new PhysicsComponent();
		physics.setBodyType(BodyType.DYNAMIC);
		return FXGL.entityBuilder().at(x, y).view(getAssetLoader().loadTexture("keyBlue.png")).type(Type.KEY)
				.with(new KeyComponent()).bbox(BoundingShape.box(70, 70)).with(new CollidableComponent(true))
				.with(physics).buildAndAttach();
	}

	@Spawns("laserRay")
	public Entity newLaserRay(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox(getAssetLoader().loadTexture("redRay.png")).type(Type.LASER)
				.bbox(BoundingShape.box(width, height)).with(new CollidableComponent(true)).with(new LaserComponent())
				.with(new PhysicsComponent()).build();
	}

	@Spawns("laser")
	public Entity newLaser(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().type(Type.LASERBODY).bbox(BoundingShape.box(width, height))
				.with(new CollidableComponent(true)).with(new PhysicsComponent()).build();
	}

	@Spawns("stairs")
	public Entity newStairs(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().type(Type.STAIRS).view(getAssetLoader().loadTexture("springboardUp.png"))
				.bbox(BoundingShape.box(width, height)).with(new CollidableComponent(true))
				.with(new JumperComponent(data.get("patrolEndY"), data.getY())).build();
	}
	@Spawns("stairsNew")
	public Entity newStairsNew(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().type(Type.NEWSTAIRS).view(getAssetLoader().loadTexture("springboardUp.png"))
				.bbox(BoundingShape.box(width, height)).with(new CollidableComponent(true))
				.with(new newJumperComponent()).build();
	}

	@Spawns("redLever")
	public Entity newLever(SpawnData data) {
		int width = (int) data.get("width");
		int height = (int) data.get("height");
		return FXGL.entityBuilder().viewWithBBox("laserSwitchGreenOn.png").type(Type.LEVER)
				.bbox(BoundingShape.box(width, height)).with(new CollidableComponent(true)).with(new LeverComponent())
				.build();
	}

}
