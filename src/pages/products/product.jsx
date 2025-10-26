import React, { useState } from "react";
import ResponsiveAppBar from "../../component/navbar/MenuAppBar";
import Footer from "../../component/footer/Footer";
import AxiosIntanse from "../../AxiosIntanse";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import homeImg from "../../assets/imges/home1.png";
import { useTranslation } from "react-i18next";

export default function Product() {
  const { t } = useTranslation();

  // 🧠 كل منتج له تقييم وتعليق خاص فيه
  const [reviews, setReviews] = useState({});

  // ✅ جلب المنتجات
  const fetchProducts = async () => {
    const response = await AxiosIntanse.get("/Customer/Products");
    return response.data.data || [];
  };

  // ✅ جلب العلامات التجارية
  const fetchBrands = async () => {
    const response = await AxiosIntanse.get("/Customer/Brands");
    return response.data || [];
  };

  // ✅ جلب التصنيفات
  const fetchCategories = async () => {
    const response = await AxiosIntanse.get("/Customer/Categories");
    return response.data || [];
  };

  // ✅ دالة إضافة للسلة
 const addtocart = async (id) => {
  try {
    console.log("🛒 Adding product to cart:", id);
    const response = await AxiosIntanse.post("/Customer/Carts", { productId: id });
    console.log("✅ Added to cart:", response.data);
    alert("Product added successfully!");
  } catch (error) {
    if (error.response) {
      console.error("❌ Server Error:", error.response.status, error.response.data);
      alert(`Error: ${error.response.data.message || "Something went wrong"}`);
    } else {
      console.error("❌ Unknown Error:", error.message);
    }
  }
};



  // ✅ دالة إرسال التقييم
  const addReview = async (productId) => {
    try {
      const { comment, rate } = reviews[productId] || {};

      if (!comment || !rate) {
        alert("⚠️ Please write a comment and select a rating first!");
        return;
      }

      const response = await AxiosIntanse.post("/Customer/Reviews", {
        productId,
        comment,
        rate,
      });

      console.log("Review added:", response.data);
      alert("✅ Review added successfully!");

      // بعد الإرسال، نفرغ الحقول الخاصة بهذا المنتج فقط
      setReviews({
        ...reviews,
        [productId]: { comment: "", rate: 0 },
      });
    } catch (err) {
      if (err.response) {
    console.log("Server error:", err.response.status, err.response.data);
    alert(`❌ Server error: ${err.response.status}`);
  } else {
    console.log("Network error:", err.message);
    alert("❌ Network error, please check console");
  }
    }
  };
const handleCheckout = async () => {
  try {
    const response = await AxiosIntanse.post("/Customer/CheckOut/payment", {
      paymentMethod: "Visa",
    });
    console.log("✅ Checkout successful:", response.data);
    alert("Payment successful! You can now review your product.");
  } catch (error) {
    console.error("❌ Checkout error:", error.response?.data || error.message);
    alert("Checkout failed. Try again later.");
  }
};



  // React Query لجلب البيانات
  const { data: products = [], isLoading: loadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: brands = [], isLoading: loadingBrands } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (loadingProducts || loadingBrands || loadingCategories)
    return <p>Loading...</p>;

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          backgroundImage: `url(${homeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          width: "100%",
          padding: "40px 0",
        }}
      >
        {/* 🛍️ عرض المنتجات */}
        <Box sx={{ padding: "40px" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            {t("Products")}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {products.map((product) => (
              <Grid
                key={product.id}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "30%", lg: "23%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    height: 540,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    borderRadius: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ height: 200, objectFit: "cover" }}
                    image={product.mainImageUrl}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {product.quantity}
                    </Typography>

                    <Button 
  variant="contained" 
  sx={{ mt: 2, backgroundColor: '#000' }} 
  onClick={() => addtocart(product.id)} 
>
  {t('AddtoCart')}
</Button>


                    {/* ✨ واجهة التقييم الخاصة بكل منتج */}
                    <TextField
                      label="Write your review"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={reviews[product.id]?.comment || ""}
                      onChange={(e) =>
                        setReviews({
                          ...reviews,
                          [product.id]: {
                            ...reviews[product.id],
                            comment: e.target.value,
                          },
                        })
                      }
                      sx={{ mt: 2 }}
                    />

                    <Rating
                      name={`rating-${product.id}`}
                      value={reviews[product.id]?.rate || 0}
                      onChange={(e, newValue) =>
                        setReviews({
                          ...reviews,
                          [product.id]: {
                            ...reviews[product.id],
                            rate: newValue,
                          },
                        })
                      }
                      sx={{ mt: 1 }}
                    />

                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() => addReview(product.id)}
                    >
                      Submit Review
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 🏷️ عرض العلامات التجارية */}
        <Box sx={{ padding: "40px" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            {t("Brands")}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {brands.map((brand) => (
              <Grid
                key={brand.id}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "30%", lg: "23%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    height: 300,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 3,
                    borderRadius: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 200,
                      objectFit: "contain",
                      width: "80%",
                      marginTop: 2,
                    }}
                    image={brand.mainImageUrl}
                    alt={brand.name}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h6" noWrap>
                      {brand.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* 🧩 عرض التصنيفات */}
        <Box sx={{ padding: "40px" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              textAlign: "center",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            🛍️ Our Categories
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {categories.map((category) => (
              <Grid
                key={category.id}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "30%", lg: "23%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Card
                  sx={{
                    height: 100,
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    borderRadius: 3,
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textAlign: "center",
                    }}
                  >
                    <Typography gutterBottom variant="h6" noWrap>
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
