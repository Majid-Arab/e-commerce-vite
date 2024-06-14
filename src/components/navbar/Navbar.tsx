import { useState } from "react";
import {
  Container,
  Group,
  Burger,
  Title,
  ActionIcon,
  Code,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import { IconBadge } from "@tabler/icons-react";

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title>Logo</Title>
        <Group gap={5} visibleFrom="xs">
          {items}
          <ActionIcon variant="filled" aria-label="Settings">
            <IconBadge style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <Code>1</Code>
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
