import { expect, test } from "vitest";
import { generateUuid } from "./uuid";

test("generateUuid returns a uuid v4", () => {
  expect(generateUuid()).toMatch(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  );
});
