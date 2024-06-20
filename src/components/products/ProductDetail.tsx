// ProductDetail.tsx

import {
  AspectRatio,
  Button,
  Card,
  Container,
  Image,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useCartStore from "../../store/cart";
import fetchProductById from "../../store/products";
import { Product } from "../../type";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // useParams to get id from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await fetchProductById(+id);
        setProduct(response);
      } catch (error) {
        console.error("Error Fetching Product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Container py="xl" h={200}>
      <Card p="md" radius="md">
        <AspectRatio ratio={1080 / 1000} maw={300} mx="auto">
          <Image radius="md" fit="contain" src={product.image} />
        </AspectRatio>
        <Text mt={5}>{product.title}</Text>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
          {product.description}
        </Text>
        <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
          ${product.price}
        </Text>
        <Button onClick={() => addToCart(product)} size="xs" tt="uppercase">
          Add to cart
        </Button>
      </Card>
    </Container>
  );
};

export default ProductDetail;
