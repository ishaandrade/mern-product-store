import {create} from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image){
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products:[...state.products, data.data]}))
        return {success: true, message: "Product created successfully."}
    },
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        });
        const data = await res.json()
        if(!data.success) return {success: false, message: "Product could not be deleted."};
        const response = {success: true, message: "Product deleted successfully."};
        set(state => ({products: state.products.filter(product => product._id !== pid)}));
        return response;
    },

    updateProduct: async (pid, updatedProductData) => {
        if(!updatedProductData.name || !updatedProductData.price || !updatedProductData.image){
            return {success: false, message: "Please fill in all fields."}
        }
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProductData)
        })
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message}
        set(state => ({products: state.products.map(product => product._id === pid ? {...product, ...updatedProductData} : product)}));
        return {success: true, message: "Product updated successfully."}

    }

}));

