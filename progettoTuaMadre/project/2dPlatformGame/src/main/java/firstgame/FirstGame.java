/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package firstgame;

import static com.almasb.fxgl.dsl.FXGL.getAssetLoader;
import static com.almasb.fxgl.dsl.FXGL.getGameScene;
import static com.almasb.fxgl.dsl.FXGL.getSaveLoadService;
import static com.almasb.fxgl.dsl.FXGL.getd;
import static com.almasb.fxgl.dsl.FXGL.set;
import static com.almasb.fxgl.dsl.FXGL.setLevelFromMap;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Timer;

import com.almasb.fxgl.app.ApplicationMode;
import com.almasb.fxgl.app.GameApplication;
import com.almasb.fxgl.app.GameSettings;
import com.almasb.fxgl.app.MenuItem;
import com.almasb.fxgl.app.scene.FXGLMenu;
import com.almasb.fxgl.app.scene.MenuType;
import com.almasb.fxgl.app.scene.SceneFactory;
import com.almasb.fxgl.core.serialization.Bundle;
import com.almasb.fxgl.dsl.FXGL;
import com.almasb.fxgl.entity.Entity;
import com.almasb.fxgl.entity.level.Level;
import com.almasb.fxgl.input.UserAction;
import com.almasb.fxgl.input.virtual.VirtualButton;
import com.almasb.fxgl.physics.CollisionHandler;
import com.almasb.fxgl.physics.PhysicsComponent;
import com.almasb.fxgl.physics.box2d.dynamics.BodyType;
import com.almasb.fxgl.profile.DataFile;
import com.almasb.fxgl.profile.SaveLoadHandler;
import com.almasb.fxgl.texture.Texture;
import com.almasb.fxgl.time.LocalTimer;
import com.almasb.fxgl.ui.ProgressBar;

import javafx.beans.property.IntegerProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.geometry.Point2D;
import javafx.geometry.Rectangle2D;
import javafx.scene.control.Button;
import javafx.scene.input.KeyCode;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import javafx.util.Duration;

public class FirstGame extends GameApplication {

	private Entity player = new Entity();
	private int hasWeapons = 0;
	private Entity weapon;
	private boolean hasKey;
	private Entity laser;
	private LaserComponent laserComponent;
	private List<Entity> list = new ArrayList<Entity>();
	private EntityCreator creator;
	private boolean vero = false;
	private Button button;
	private ProgressBar bar;
	private LocalTimer newMove;
	private Entity boss;
	private Entity trigger;
	private Texture doorTex;

	@Override
	protected void initSettings(GameSettings settings) {
		boolean isRelease = true;
		settings.setWidth(30 * 70);
		settings.setHeight(16 * 70);
		settings.setTitle("Vitreus Odyssey");
		settings.setVersion("1.0.0");
		settings.setMainMenuEnabled(true);
		settings.setGameMenuEnabled(true);
		settings.setEnabledMenuItems(EnumSet.allOf(MenuItem.class));
		settings.setApplicationMode(isRelease ? ApplicationMode.RELEASE : ApplicationMode.DEVELOPER);
		settings.setSceneFactory(new SceneFactory() {
			@Override
			public FXGLMenu newGameMenu() {
				return new GameMenu(MenuType.MAIN_MENU);
			}
		});

	}

	private IntegerProperty score = new SimpleIntegerProperty(0);
	private IntegerProperty weaponsScore = new SimpleIntegerProperty(hasWeapons);
	private List<Entity> doorTop;
	private List<Entity> doorMid;
	private Entity top;
	private Entity mid;
	private Entity unbreaktop = new Entity();
	private Entity unbreakbot = new Entity();
	private Entity minion1;
	private Entity minion2;

	@Override
	protected void initUI() {

		Text text = FXGL.getUIFactoryService().newText("", Color.BLACK, 18.0);
		text.textProperty().bind(FXGL.getdp("time").asString());
		FXGL.addUINode(text, 1930, 190);

		Text scoreText = FXGL.getUIFactoryService().newText("", Color.BLACK, 24);
		scoreText.textProperty().bind(score.asString("Score: [%d]"));
		FXGL.addUINode(scoreText, 1930, 100);

		Text weaponsText = FXGL.getUIFactoryService().newText("", Color.BLACK, 24);
		weaponsText.textProperty().bind(weaponsScore.asString("Weapons: [%d]"));
		FXGL.addUINode(weaponsText, 1930, 130);

		button = FXGL.getUIFactoryService().newButton("Special Move");
		button.setStyle("-fx-background-color: #007fff; " + "-fx-background-radius: 30em; ");
		button.setOnMousePressed(new EventHandler<Event>() {
			public void handle(Event event) {
				button.setStyle("-fx-background-color: #99ccff; ");
				player.setScaleUniform(3);
				vero = true;
				progressiveBar();
			};

		});
		button.setOnMouseReleased(new EventHandler<Event>() {
			@Override
			public void handle(Event event) {
				button.setStyle("-fx-background-radius: 30em; " + "-fx-background-color: #007fff; ");
				button.setVisible(false);
			}
		});
		FXGL.addUINode(button, 100, 880);

	}

	public void progressiveBar() {
		bar = new ProgressBar();
		bar.setCurrentValue(100);
		FXGL.addUINode(bar, 1050, 10);

		Timer t = new java.util.Timer();
		t.schedule(new java.util.TimerTask() {
			@Override
			public void run() {
				javafx.application.Platform.runLater(new Runnable() {

					@Override
					public void run() {
						bar.setCurrentValue(bar.getCurrentValue() - 10);
					}
				});

				if (bar.getCurrentValue() == 0) {
					player.setScaleX(1);
					player.setScaleY(1);
					vero = false;
					bar.setVisible(false);
					t.cancel();
				}
			}
		}, 1000, 1000);
	}

	public static void main(String[] args) {
		launch(args);
	}

	@Override
	protected void initGameVars(Map<String, Object> vars) {
		vars.put("time", 0.0);
		vars.put("playerx", 0);
		vars.put("playery", 0);
		vars.put("triggerx", 0);
		vars.put("triggery", 0);

	}

	@Override
	protected void onPreInit() {
		getSaveLoadService().addHandler(new SaveLoadHandler() {
			private double midx;
			private double midy;
			private double topx;
			private double topy;

			@Override
			public void onSave(DataFile data) {
				// create a new bundle to store your data
				Bundle bundle = new Bundle("gameData");

				// store some data
				double time = getd("time");
				double x = player.getX();
				double y = player.getY();

				double triggerx = trigger.getX();
				double triggery = trigger.getY();

				bundle.put("playerx", x);
				bundle.put("playery", y);
				bundle.put("triggerx", triggerx);
				bundle.put("triggery", triggery);

				bundle.put("time", time);
				// give the bundle to data file
				data.putBundle(bundle);

			}

			@Override
			public void onLoad(DataFile data) {
				// get your previously saved bundle
				Bundle bundle = data.getBundle("gameData");

				// retrieve some data
				double time = bundle.get("time");

				// update your game with saved data
				set("time", time);

				double newx = bundle.get("triggerx");
				double newy = bundle.get("triggery");

				trigger.setPosition(new Point2D(newx, newy));

				player.getComponent(PhysicsComponent.class)
						.overwritePosition(new Point2D(bundle.get("playerx"), bundle.get("playery")));

				mid.setVisible(true);
				top.setVisible(true);

				unbreakbot.removeFromWorld();
				unbreaktop.removeFromWorld();

			}
		});
	}

	@Override
	protected void initGame() {
		FXGL.run(() -> FXGL.inc("time", 1.0), Duration.seconds(1.0));
		FXGL.getGameScene().setBackgroundRepeat(getAssetLoader().loadImage("forestcolor.png"));
		getGameScene().getGameWorld().addEntityFactory(new EntityCreator());
		Level level = setLevelFromMap("level1.tmx");
		// spawn entities

		player = FXGL.spawn("player");
		FXGL.spawn("background");
		creator = new EntityCreator();
		trigger = creator.newTrigger(8890, 1400);
		this.minion1 = creator.newMinion1(9000, 1400);
		this.minion2 = creator.newMinion2(9100, 1400);

		FXGL.getSaveLoadService().saveAndWriteTask("save1.sav").run();

	}

	@Override
	protected void initPhysics() {
		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.ENEMY) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				if (hasWeapons != 0 || vero) {
					b.removeFromWorld();
					score.set(score.get() + 200);
					if (vero == false) {
						hasWeapons--;
						weaponsScore.set(weaponsScore.get() - 1);
					}
				} else {
					FXGL.getSaveLoadService().readAndLoadTask("save1.sav").run();
					FXGL.getDialogService().showMessageBox("sei morto");
					score.set(0);
				}
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.WEAPON) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				b.removeFromWorld();
				hasWeapons++;
				weaponsScore.set(weaponsScore.get() + 1);
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.SPIKE) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				FXGL.getSaveLoadService().readAndLoadTask("save1.sav").run();
				FXGL.getDialogService().showMessageBox("sei morto");
				score.set(0);
				weaponsScore.set(0);
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.COIN) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				b.removeFromWorld();
				score.set(score.get() + 25);

			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.COIN_BLOCK) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				if (!(a.getBoundingBoxComponent().isWithin(new Rectangle2D(2170, 350, 70, 70)))) {
					b.removeFromWorld();
					score.set(score.get() + 100);
					creator.newKey(player.getX(), player.getY() - 200);
				}

			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.ITEM_BLOCK) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				b.removeFromWorld();
				creator = new EntityCreator();
				creator.newWeapon(player.getX(), player.getY() - 100);
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.BLOCK) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				b.removeFromWorld();
				score.set(score.get() + 50);
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.DOOR) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				hasKey = b.getComponent(DoorComponent.class).isHasKey();

				if (!hasKey) {
					// FXGL.getDialogService().showMessageBox("Hai bisogno di una chiave per entrare
					// nella porta!");
					// a.getComponent(PhysicsComponent.class).overwritePosition(new Point2D(a.getX()
					// - 5, a.getY()));
				} else {
					FXGL.getSaveLoadService().saveAndWriteTask("save1.sav").run();
				}
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.COIN_GOLD) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				b.removeFromWorld();
				score.set(score.get() + 200);
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.LASER) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				FXGL.getSaveLoadService().readAndLoadTask("save1.sav").run();
				FXGL.getDialogService().showMessageBox("sei stato bruciato dal laser");
				score.set(0);
				weaponsScore.set(0);
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.FIREBALL) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				FXGL.getSaveLoadService().readAndLoadTask("save1.sav").run();
				FXGL.getDialogService().showMessageBox("ti sei bruciato");
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.BARNACLE) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				System.out.println("morto");
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.SAW) {
			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				System.out.println("morto");
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.SHOOT) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				b.removeFromWorld();
				delete();
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.BOSS) {
			@Override
			protected void onCollision(Entity a, Entity b) {
				delete();
			}
		});

		FXGL.getPhysicsWorld().addCollisionHandler(new CollisionHandler(Type.PLAYER, Type.TRIGGERBOX) {
			private int c = 0;

			@Override
			protected void onCollisionBegin(Entity a, Entity b) {
				creator = new EntityCreator();
				fight(c);
				b.removeFromWorld();
				b = creator.newTrigger(a.getX() + 140, 1400);
				trigger = b;
				c++;
				c = c % 2;

			}
		});

	}

	private List<Entity> listaShoot;

	public void delete() {

		boss.getComponent(bossComponent.class).notAngry();
		if (punto.isActive()) {
			punto.removeFromWorld();
		}
		listaShoot = FXGL.getGameWorld().getEntitiesByType(Type.SHOOT);
		for (Entity e : listaShoot) {
			e.removeFromWorld();
		}
		FXGL.getSaveLoadService().readAndLoadTask("save1.sav").run();
		FXGL.getDialogService().showMessageBox("Sei morto dal boss");
	}

	private double x1;
	private double y1;
	private double x2;
	private double y2;
	private Entity punto = new Entity();

	public void fight(int c) {
		creator = new EntityCreator();
		if (c == 0) {
			for (Entity e : FXGL.getGameWorld().getEntitiesByComponent(DoorTopComponent.class)) {
				if (this.unbreaktop == null || !unbreakbot.isActive()) {
					this.unbreaktop = creator.newUnBreakableBlock(e.getX(), e.getY(), new PhysicsComponent());
				}

				x1 = e.getX();
				y1 = e.getY();

				this.unbreaktop.setVisible(true);
				top = e;
				top.setVisible(false);

			}
			for (Entity e : FXGL.getGameWorld().getEntitiesByComponent(DoorComponent.class)) {
				if (this.unbreaktop == null || !unbreakbot.isActive()) {
					this.unbreakbot = creator.newUnBreakableBlock(e.getX(), e.getY(), new PhysicsComponent());
				}
				x2 = e.getX();
				y2 = e.getY();

				this.unbreakbot.setVisible(true);
				mid = e;
				mid.setVisible(false);
			}

			Optional<Entity> bossOpt = FXGL.getGameWorld().getEntityByID("boss", 490);
			if (bossOpt.isPresent()) {
				boss = bossOpt.get();
				if (!punto.isActive()) {
					punto = creator.newPuntoEsclamativo(boss.getX(), boss.getY());
				}
				boss.getComponent(bossComponent.class).onAngry();
			} else {
				System.out.println(" non c'è");
			}

		}
		// ogni c spawna un entità diversa

		double y = (Math.random() * ((2 - 1) + 1)) + 1;
		switch (c + 1) {
		case 0: {

		}

		case 1: {
			if (player.getX() < 9880) {
				boss.getComponent(bossComponent.class).shoot(y);
			}
		}
		}
	}

	@Override
	protected void onUpdate(double tpf) {
		getGameScene().getViewport().setBounds(0, 0, 100 * 70, 22 * 70);
		if ((player.getX() < FXGL.getAppWidth() / 2 && player.getY() <= 1800)) {
			getGameScene().getViewport().focusOn(new Point2D(FXGL.getAppWidth() / 2, 1410));
		} else if (player.getX() > 8400) {
			getGameScene().getViewport().focusOn(new Point2D(9448, player.getY()));
		} else {
			getGameScene().getViewport().focusOn(new Point2D(player.getX(), 1410));
		}

		if (player.getX() < 0) {
			player.getComponent(PhysicsComponent.class).overwritePosition(new Point2D(50, 800));
		}

		if (player.getX() >= 10500) {
			player.getComponent(PhysicsComponent.class).overwritePosition(new Point2D(10450, player.getY()));
		}

		if (player.getX() > 1000 || player.getY() > 1450) {
			button.setDisable(true);
		} else {
			button.setDisable(false);
		}

	}

	@Override
	protected void initInput() {
		FXGL.getInput().addAction(new UserAction("Left") {
			@Override
			protected void onAction() {
				player.getComponent(PlayerComponent.class).left(vero);
			}

			@Override
			protected void onActionEnd() {
				player.getComponent(PlayerComponent.class).stop();
			}
		}, KeyCode.A, VirtualButton.LEFT);

		FXGL.getInput().addAction(new UserAction("Right") {
			@Override
			protected void onAction() {
				player.getComponent(PlayerComponent.class).right(vero);
			}

			@Override
			protected void onActionEnd() {
				player.getComponent(PlayerComponent.class).stop();
			}
		}, KeyCode.D, VirtualButton.RIGHT);

		FXGL.getInput().addAction(new UserAction("Jump") {
			@Override
			protected void onActionBegin() {
				player.getComponent(PlayerComponent.class).jump();
			}
		}, KeyCode.W, VirtualButton.A);

		FXGL.onKeyDown(KeyCode.F, "Save", () -> {
			FXGL.getSaveLoadService().saveAndWriteTask("save1.sav").run();
			System.out.println("salvato");
		});

		FXGL.onKeyDown(KeyCode.G, "Load", () -> {
			FXGL.getSaveLoadService().readAndLoadTask("save1.sav").run();
			System.out.println("caricato");
		});
	}

}
