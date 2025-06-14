package com.example.examplemod;

import com.mojang.authlib.minecraft.client.MinecraftClient;
import com.mojang.blaze3d.vertex.PoseStack;
import com.mojang.math.Axis;
import net.minecraft.client.Camera;
import net.minecraft.client.Minecraft;
import net.minecraft.client.model.PlayerModel;
import net.minecraft.client.player.AbstractClientPlayer;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.client.event.RenderGuiOverlayEvent;
import net.minecraftforge.client.event.RenderLevelStageEvent;
import net.minecraftforge.client.event.RenderLivingEvent;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod.EventBusSubscriber(modid = ExampleMod.MODID, value = Dist.CLIENT, bus = Mod.EventBusSubscriber.Bus.FORGE)
public class ClientTickHandler {
    private static final Logger LOGGER = LogManager.getLogger();


    @SubscribeEvent
    public static void onClientTick(TickEvent.ClientTickEvent event) {
        if (event.phase != TickEvent.Phase.END) return;

        Minecraft mc = Minecraft.getInstance();
        if (mc.player == null || ClientEvents.rollLeft == null || ClientEvents.rollRight == null) return;

        if (ClientEvents.rollLeft.isDown()) {
            ClientEvents.currentRoll -= 2f;
            LOGGER.info("Roll Left pressed, currentRoll = {}", ClientEvents.currentRoll);
        }

        if (ClientEvents.rollRight.isDown()) {
            ClientEvents.currentRoll += 2f;
            LOGGER.info("Roll Right pressed, currentRoll = {}", ClientEvents.currentRoll);
        }

        ClientEvents.currentRoll %= 360f;
    }

    @SubscribeEvent
    public static void onRenderPlayer(RenderLivingEvent.Pre<AbstractClientPlayer, PlayerModel<AbstractClientPlayer>> event) {
        if (!(event.getEntity() instanceof AbstractClientPlayer)) return;

        PoseStack poseStack = event.getPoseStack();

        // Applica la rotazione roll (intorno all'asse Z)
        poseStack.mulPose(Axis.ZP.rotationDegrees(ClientEvents.currentRoll));

        // Log per debug
        LogManager.getLogger().info("Applied roll: {}", ClientEvents.currentRoll);

    }

}

