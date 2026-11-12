# Bonfire model

`bonfire.glb` is "Dark Souls - Bonfire" by UselessViking
(https://sketchfab.com/3d-models/dark-souls-bonfire-b0d68c8f4cd0487da3d1fb8327ab1044),
licensed CC BY 4.0. The footer credits it automatically when the file is present.

The shipped file is optimised (helpers and UVs removed, light simplification,
quantised and meshopt-compressed: 2.3 MB down to ~370 KB). `lib/bonfire-model.ts`
loads it with the meshopt decoder, replaces its coarse ash with a generated mound,
merges the parts by material and gives them procedural materials.

To use another model, drop any `.glb` here as `bonfire.glb`. Name its materials
with `bone`, `sword`/`iron`, `ash` or `wood` so they get the right surface.
Re-optimise with glTF-Transform: `npx @gltf-transform/cli optimize in.glb bonfire.glb --compress meshopt --texture-compress webp`.
