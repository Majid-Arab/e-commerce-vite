import { useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
} from "@mantine/core";
import { Product } from "../../type";
import useCartStore from "../../store/cart";

function Cart() {
  const cart = useCartStore((state) => state.cart);

  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );

  const rows = cart.map((product: Product) => {
    // const selected = selection.includes(product.id);
    return (
      <Table.Tr key={product.id}>
        <Table.Td>
          <Checkbox
            checked={selection.includes(product.id.toString())}
            onChange={() => toggleRow(product.id.toString())}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={product.image[0]} radius={26} />
            <Text size="sm" fw={500}>
              {product.title}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{product.description}</Table.Td>
        <Table.Td>{product.price}</Table.Td>
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
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Job</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}

export default Cart;
