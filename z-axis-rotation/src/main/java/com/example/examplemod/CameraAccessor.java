package com.example.examplemod;

import net.minecraft.client.Camera;
import org.joml.Quaternionf;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Accessor;

@Mixin(Camera.class)
public interface CameraAccessor {
    @Accessor("rotation")
    Quaternionf getRotation();

    @Accessor("rotation")
    void setRotation(Quaternionf rot);
}
