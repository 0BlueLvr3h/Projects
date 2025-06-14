package com.example.examplemod;
import com.example.examplemod.CameraAccessor;
import net.minecraft.client.Camera;
import net.minecraft.world.level.BlockGetter;
import net.minecraft.world.entity.Entity;
import org.apache.logging.log4j.LogManager;
import org.joml.Quaternionf;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;
import com.example.examplemod.ClientEvents;

@Mixin(Camera.class)
public class CameraMixin {

    @Inject(method = "setup", at = @At("TAIL"))
    private void applyRollOnCamera(BlockGetter level, Entity entity, boolean detached, boolean mirror, float partialTicks, CallbackInfo ci) {
        float rollRad = ClientEvents.currentRoll * ((float)Math.PI / 180F);

        Camera self = (Camera)(Object)this;
        Quaternionf rotation = ((CameraAccessor) self).getRotation();
        rotation.mul(new Quaternionf().rotationZ(rollRad));
        ((CameraAccessor) self).setRotation(rotation);

        LogManager.getLogger().info("Applied camera roll (CameraMixin): {}", ClientEvents.currentRoll);
    }
}
