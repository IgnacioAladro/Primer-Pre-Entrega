import { CartModel } from "./models/cart.model.js";



export default class CartDaoMongoDB {
    
    async getAll() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log(error);
        };
    };

    async getById(id) {
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            console.log(error);
        };
    };

    async create() {
        try {
            return await CartModel.create({
                products: [],
            });
        } catch (error) {
            console.log(error);
        };
    };

    async clearCart(cartId) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $set: { products: [] } },
                { new: true }
            );
        } catch (error) {
            console.log(error);
        }
    };

    async update(id, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        };
    };

    async addProductToCart(cartId, prodId, quantity) {
        try {
            return await CartModel.findByIdAndUpdate(
                cartId,
                { $push: { products: { product: prodId, quantity } } },
                { new: true }
            );
        } catch (error) {
            console.log(error);
        };
    };

    async removeProductToCart(cartId, prodId) {
        try {
            return await CartModel.findByIdAndUpdate(
                { _id: cartId },
                { $pull: { products: { product: prodId } } },
                { new: true }
            );
        } catch (error) {
            console.log(error);
        };
    };

    async updateQuantityOfProductsInCart(cartId, prodId, quantity) {
        try {
            return await CartModel.findOneAndUpdate(
                {
                    _id: cartId,
                    'products.product': prodId 
                },
                {
                    $set: { 'products.$.quantity': quantity }
                },
                { new: true }
            ); 
        } catch (error) {
            console.log(error);
        };
    };

    async existProductInCart(cartId, prodId) {
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: prodId } }
            });
        } catch (error) {
            console.log(error);
        };
    };
};