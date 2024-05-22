"use client";
import { Product } from "@/payload-types";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
  }, [isSuccess]);

  return (
    <Button
      size="lg"
      onClick={() => {
        addItem(product);
        setIsSuccess(true);
      }}
      className="w-full"
    >
      {isSuccess ? "Added!  ✔️" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
