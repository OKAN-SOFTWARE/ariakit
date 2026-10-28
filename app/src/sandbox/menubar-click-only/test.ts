import {
  waitFor,
  click,
  focus,
  hover,
  mouseDown,
  mouseUp,
  q,
} from "@ariakit/test";
import { expect, test } from "vitest";

// https://github.com/ariakit/ariakit/issues/4023
test("click-only menubar switches menus without closing both", async () => {
  await click(q.menuitem("File"));
  await waitFor(() => expect(q.menu("File")).toBeVisible(), { timeout: 5000 });

  await click(q.menuitem("Edit"));
  await waitFor(() => expect(q.menu("Edit")).toBeVisible(), { timeout: 5000 });
  expect(q.menu.maybe("File")).not.toBeInTheDocument();
});

test("canceled pointer press does not block later keyboard focus", async () => {
  const file = q.menuitem("File");
  const edit = q.menuitem("Edit");
  await click(file);
  await focus(edit);
  await waitFor(() => expect(q.menu("Edit")).toBeVisible(), { timeout: 5000 });

  // A press on the already-focused button produces no new focus event.
  await hover(edit);
  await mouseDown(edit);
  // Releasing outside cancels the click; the press must not affect later focus.
  await hover(file, { buttons: 1 });
  await mouseUp(file);

  await focus(file);
  await waitFor(() => expect(q.menu("File")).toBeVisible(), { timeout: 5000 });
  await focus(edit);
  await waitFor(() => expect(q.menu("Edit")).toBeVisible(), { timeout: 5000 });
});

test("keyboard focus switches between open menus", async () => {
  const file = q.menuitem("File");
  const edit = q.menuitem("Edit");

  await click(file);
  await focus(edit);
  await waitFor(() => expect(q.menu("Edit")).toBeVisible(), { timeout: 5000 });

  await focus(file);
  await waitFor(() => expect(q.menu("File")).toBeVisible(), { timeout: 5000 });

  await focus(edit);
  await waitFor(() => expect(q.menu("Edit")).toBeVisible(), { timeout: 5000 });
});
