import * as productService from '../services/productService.mjs';

export const getAllProducts = () => {
    return productService.fetchAllProducts();
};
