const API_BASE_URL = 'http://localhost:3001/api/orders/seller/orders';

export const fetchSellerOrders = async (token) => {
    const response = await fetch(API_BASE_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch orders');
    }
    return await response.json();
};

export const updateOrder = async (orderId, status, token) => {
    const response = await fetch(`${API_BASE_URL}/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error('Failed to update order');
    }
    return await response.json();
};

// Function to delete an order
export const deleteOrder = async (orderId, token) => {
    const response = await fetch(`${API_BASE_URL}/${orderId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete order');
    }
    return orderId;  // returning orderId for removal from state
};
