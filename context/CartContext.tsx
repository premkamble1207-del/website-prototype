"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import { Product } from "@/data/products";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
}

interface CartState {
    items: CartItem[];
    isDrawerOpen: boolean;
}

type CartAction =
    | { type: "ADD_ITEM"; payload: CartItem }
    | { type: "REMOVE_ITEM"; payload: string }
    | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
    | { type: "CLEAR_CART" }
    | { type: "TOGGLE_DRAWER" }
    | { type: "OPEN_DRAWER" }
    | { type: "CLOSE_DRAWER" };

interface CartContextType {
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    toggleDrawer: () => void;
    openDrawer: () => void;
    closeDrawer: () => void;
    totalItems: number;
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    isDrawerOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (item) =>
                    item.product.id === action.payload.product.id &&
                    item.selectedColor === action.payload.selectedColor &&
                    item.selectedSize === action.payload.selectedSize
            );
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.product.id === existing.product.id &&
                            item.selectedColor === existing.selectedColor &&
                            item.selectedSize === existing.selectedSize
                            ? { ...item, quantity: item.quantity + action.payload.quantity }
                            : item
                    ),
                };
            }
            return { ...state, items: [...state.items, action.payload] };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.product.id !== action.payload),
            };
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === action.payload.id
                        ? { ...item, quantity: Math.max(1, action.payload.quantity) }
                        : item
                ),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        case "TOGGLE_DRAWER":
            return { ...state, isDrawerOpen: !state.isDrawerOpen };
        case "OPEN_DRAWER":
            return { ...state, isDrawerOpen: true };
        case "CLOSE_DRAWER":
            return { ...state, isDrawerOpen: false };
        default:
            return state;
    }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = useCallback((item: CartItem) => {
        dispatch({ type: "ADD_ITEM", payload: item });
        dispatch({ type: "OPEN_DRAWER" });
    }, []);

    const removeItem = useCallback((id: string) => {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: "CLEAR_CART" });
    }, []);

    const toggleDrawer = useCallback(() => {
        dispatch({ type: "TOGGLE_DRAWER" });
    }, []);

    const openDrawer = useCallback(() => {
        dispatch({ type: "OPEN_DRAWER" });
    }, []);

    const closeDrawer = useCallback(() => {
        dispatch({ type: "CLOSE_DRAWER" });
    }, []);

    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                state,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                toggleDrawer,
                openDrawer,
                closeDrawer,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
