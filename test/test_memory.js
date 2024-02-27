import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

import generateBMFont from "../index.js";

console.log("[test:memory] Running tests");

const fontPath = path.join(import.meta.dirname, "..", "assets", "fonts", "DIN_CB.ttf");
const fontBuffer = fs.readFileSync(fontPath);

console.log("[test:memory] Loaded font");

generateBMFont(fontBuffer, { filename: "test", outputType: "json" }, (error, textures, fontFile) => {
    assert.ok(!error, "font generation failed");

    const font = JSON.parse(fontFile.data);
    const texture = textures[0];

    assert.equal(fontFile.filename, "test.json", "incorrect font filename");
    assert.equal(font.info.face, "test", "incorrect font face");
    assert.deepEqual(font.pages, ["test.png"], "incorrect font pages");
    assert.equal(textures.length, 1, "incorrect number of textures");
    assert.equal(texture.filename, "test", "incorrect texture name");
    assert.ok(texture.texture instanceof Buffer, "missing texture buffer");

    console.log("[test:memory] Tests passed");
});
