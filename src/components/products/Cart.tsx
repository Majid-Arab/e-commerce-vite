import cx from "clsx";
import { useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Button,
} from "@mantine/core";
import { Product } from "../../type";
import useCartStore from "../../store/cart";
import classes from "./Cart.module.css";

function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const [selection, setSelection] = useState<string[]>([]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const toggleAll = () => {
    setSelection((current) =>
      current.length === cart.length
        ? []
        : cart.map((product) => product.id.toString())
    );
  };
  const rows = cart.map((product: Product) => {
    const selected = selection.includes(product.id.toString());
    return (
      <Table.Tr
        key={product.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(product.id.toString())}
            onChange={() => toggleRow(product.id.toString())}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={product.image} radius={26} />
            <Text size="sm" fw={500}>
              {product.title}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{product.description}</Table.Td>
        <Table.Td>{product.price}</Table.Td>
        <Table.Td>
          <Button
            onClick={() => removeFromCart(product.id)}
            size="xs"
            tt="uppercase"
          >
            Remove from cart
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                checked={selection.length === cart.length}
                indeterminate={
                  selection.length > 0 && selection.length !== cart.length
                }
                onChange={toggleAll}
              />
            </Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Price</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default Cart;
