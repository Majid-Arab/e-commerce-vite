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
import { Toggle } from "./Toggle";
import useCartStore from "../../store/cart";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

const links = [
  { link: "/", label: "Home" },
  { link: "/products", label: "Products" },
  { link: "/about-us", label: "About us" },
  { link: "/contact-us", label: "Contact us" },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const cart = useCartStore((state) => state.cart);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => setActive(link.link)}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Title>Logo</Title>
        <Group gap={5} visibleFrom="xs">
          {items}
          <Link to="/cart" className={classes.link}>
            <ActionIcon variant="filled" aria-label="Settings">
              <CiShoppingCart />
            </ActionIcon>
            <Code>{cart.length}</Code>
          </Link>
          <Toggle />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
