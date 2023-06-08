import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Alert, Button, Snackbar } from "@mui/material";

import { Product } from "../../types/type";
import { cartActions } from "../../redux/slices/cart";
import { fetchProductDetail } from "../../redux/thunk/product";

export default function ProductDetail() {
  const productDetail = useSelector(
    (state: RootState) => state.productDetail.productDetail
  );

  const dispatch = useDispatch<AppDispatch>();
  const param = useParams();
  const productId = param.id as string;

  useEffect(() => {
    if (param) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch]);

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function onClickHandler(item: Product) {
    dispatch(cartActions.getCartList(item));
    setOpen(true);
  }
  if (!productDetail) {
    return <div>no data</div>;
  }
  return (
    <div>
      <div>
        <img src={productDetail.image} alt={productDetail.title} />
        <div>
          <p>{productDetail.title}</p>
          <p> {productDetail.price}</p>
          <p> {productDetail.description}</p>
          <Button onClick={() => onClickHandler(productDetail)}>
            Add to cart
          </Button>
        </div>
        <p>
          Members receive free standard shipping and free returns on purchases
          of at least €25
        </p>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          A <b>{productDetail.title}</b> is added to cart
        </Alert>
      </Snackbar>
    </div>
  );
}
