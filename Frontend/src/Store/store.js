import { create } from 'zustand'

export const useStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (formData) => {
        try {
            console.log("Sending formData:", formData);
            
            if (!formData.name?.trim() || !formData.price || !formData.imageUrl?.trim()) {
                return {success: false, Message: 'Missing required fields'};
            }

            const productData = {
                ...formData,
                price: Number(formData.price)
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error response:", errorText);
                try {
                    const errorData = JSON.parse(errorText);
                    return {success: false, Message: errorData.message || 'Failed to create product'};
                } catch {
                    return {success: false, Message: errorText || 'Failed to create product'};
                }
            }

            const data = await res.json();
            set((state) => ({
                products: [...state.products, data.product]
            }));
            return {success: true, Message: 'Product created successfully'};
        } catch (error) {
            console.error("Create product error:", error);
            return {success: false, Message: error.message || 'Failed to create product'};
        }
    },
   
    fetchProducts: async () => {
        try {
            const res = await fetch('/api/products');
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Error fetching products:", errorText);
                return;
            }
            const data = await res.json();
            if (data.success) {
                set({ products: data.products });
            } else {
                console.error("Failed to fetch products:", data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },

    DeleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await res.json();
            console.log("Delete response:", data);
            
            if(res.ok) {
                set((state) => ({
                    products: state.products.filter((product) => product._id !== pid)
                }));
                return {success: true, Message: 'Product deleted successfully'};
            }
            return {success: false, Message: data.message || 'Failed to delete product'};
        } catch (error) {
            console.error("Delete error:", error);
            return {success: false, Message: 'Failed to delete product'};
        }
    },

    updateProduct: async (pid, updateData) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            
            const data = await res.json();
            
            if(res.ok) {
                set((state) => ({
                    products: state.products.map(p => 
                        p._id === pid ? { ...p, ...updateData } : p
                    )
                }));
                return {success: true, Message: 'Product updated successfully'};
            }
            return {success: false, Message: data.message || 'Failed to update product'};
        } catch (error) {
            console.error("Update error:", error);
            return {success: false, Message: 'Failed to update product'};
        }
    }
}));

