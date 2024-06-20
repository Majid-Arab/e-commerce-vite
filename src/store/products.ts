import axios from "axios";

export type ProductId = {
  id: number;
};

const fetchProductById = async (id: number) => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching the product:", error);
    throw error;
  }
};

export default fetchProductById;
