import * as Ariakit from "@ariakit/react";

export default function Example() {
  return (
    <Ariakit.Menubar aria-label="Click-only menubar">
      {(["File", "Edit"] as const).map((name) => (
        <Ariakit.MenuProvider key={name}>
          <Ariakit.MenuItem
            focusOnHover={false}
            render={<Ariakit.MenuButton showOnHover={false} />}
          >
            {name}
          </Ariakit.MenuItem>
          <Ariakit.Menu>
            <Ariakit.MenuItem>{name} action</Ariakit.MenuItem>
          </Ariakit.Menu>
        </Ariakit.MenuProvider>
      ))}
    </Ariakit.Menubar>
  );
}
