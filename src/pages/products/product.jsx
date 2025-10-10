import React from 'react';
import ResponsiveAppBar from '../../component/navbar/MenuAppBar';
import Footer from '../../component/footer/Footer';
import AxiosIntanse from '../../AxiosIntanse';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

export default function Product() {

  // دالة لجلب المنتجات
  const fetchProducts = async () => {
    const response = await AxiosIntanse.get("/Customer/Products");
    console.log("Products response:", response.data);
    return response.data.data || [];
  };

  // دالة لجلب العلامات التجارية
  const fetchBrands = async () => {
  const response = await AxiosIntanse.get("/Customer/Brands");
  console.log("Brands response:", response.data);
  return response.data || [];
};
const fetchCategories = async () => {
    const response = await AxiosIntanse.get("/Customer/Categories");
    console.log("Categories response:", response.data);
    return response.data || [];
  };
  // React Query للمنتجات
  const {
    data: products = [],
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  // React Query للعلامات التجارية
  const {
    data: brands = [],
    isLoading: isBrandsLoading,
    isError: isBrandsError,
    error: brandsError,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5,
  });


    const {
    data: Categories = [],
    isLoading: isCategoriessLoading,
    isError: isCategoriesError,
    error: CategoriesError,
  } = useQuery({
    queryKey: ['Categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
  });

  if (isProductsLoading || isBrandsLoading) return <p>Loading...</p>;
  if (isProductsError) return <p>Error Products: {productsError.message}</p>;
  if (isBrandsError) return <p>Error Brands: {brandsError.message}</p>;
 if (isCategoriesError) return <p>Error Categories: {CategoriesError.message}</p>;



  return (
    <>
      <ResponsiveAppBar />

      {/* عرض المنتجات */}
      <Box sx={{ padding: '40px', minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#333', fontWeight: 'bold' }}>
          🛍️ Our Products
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {products.map((product) => (
            <Grid key={product.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%', lg: '23%' }, display: 'flex', justifyContent: 'center' }}>
              <Card 
                sx={{ 
                  height: 400,
                  width: '100%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: 3, 
                  borderRadius: 3,
                 
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: 'cover' }}
                  image={product.mainImageUrl}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography gutterBottom variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Price: ${product.price}</Typography>
                    <Typography variant="body2" color="text.secondary">Quantity: {product.quantity}</Typography>
                  </Box>
                  <Button variant="contained" sx={{ mt: 2, backgroundColor: '#000' }}>Add to Cart</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* عرض العلامات التجارية */}
      <Box sx={{ padding: '40px', minHeight: '50vh', backgroundColor: '#f7f7f7' }}>
  <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#333', fontWeight: 'bold' }}>
    🔖 Our Brands
  </Typography>

  <Grid container spacing={3} justifyContent="center">
    {brands.map((brand) => (
      <Grid key={brand.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%', lg: '23%' }, display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            height: 300,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 3,
            borderRadius: 3,
            
          }}
        >
          <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'contain', width: '80%', marginTop: 2 }}
            image={brand.mainImageUrl}
            alt={brand.name}
          />
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography gutterBottom variant="h6" noWrap>
              {brand.name}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>





















</Box>

 {/* عرض المنتجات */}
      <Box sx={{ padding: '40px', minHeight: '100vh', backgroundColor: '#f7f7f7' }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#333', fontWeight: 'bold' }}>
          🛍️ Our Categories
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {Categories.map((Categories) => (
            <Grid key={Categories.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%', lg: '23%' }, display: 'flex', justifyContent: 'center' }}>
              <Card 
                sx={{ 
                  height: 100,
                  width: '50%',
                  display: 'flex', 
                  flexDirection: 'column', 
                  boxShadow: 3, 
                  borderRadius: 3,
                 
                }}
              >
                
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',textAlign:'center' }}>
                  <Typography gutterBottom variant="h6" noWrap>
                    {Categories.name}
                  </Typography>
                  <Box>
                    
                  </Box>
               
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>







      <Footer />
    </>
  );
}
