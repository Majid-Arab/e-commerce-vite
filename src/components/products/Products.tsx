import {
  Card,
  Image,
  Text,
  AspectRatio,
  Container,
  SimpleGrid,
  Button,
} from "@mantine/core";
import classes from "./Products.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import useCartStore from "../../store/cart";
import { Product } from "../../type";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const products = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error Fetching Products", error);
      } finally {
        setLoading(false);
      }
    };

    return () => {
      products();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const cards = products.map((product) => (
    <Card
      key={product.id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1080 / 1000} maw={300} mx="auto">
        <Image src={product.images} />
      </AspectRatio>
      <Text className={classes.title} mt={5}>
        {product.title}
      </Text>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        ${product.description}
      </Text>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        ${product.price}
      </Text>
      <Button onClick={() => addToCart(product)} size="xs" tt="uppercase">
        Add to cart
      </Button>
    </Card>
  ));

  //

  return (
    <Container py="xl" h={200}>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{cards}</SimpleGrid>
    </Container>
  );
};

export default Products;
