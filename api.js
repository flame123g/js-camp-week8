// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`;
  const response = await axios.get(url);
  return response.data.products;  
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const response = await axios.get(url);
  let data=response.data;
  let cartsObj={carts:data.carts,total:data.total,finalTotal:data.finalTotal};
  return cartsObj;
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const data={
    data: {
      productId: productId,
      quantity: quantity
    }
};
  const response = await axios.post(url, data);
  return response.data;
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const data={
    data: {
      id: cartId,
      quantity: quantity
    }
  };
  const response = await axios.patch(url,data);
  return response.data;
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`;
  const response = await axios.delete(url);
  return response.data;
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`;
  const response = await axios.delete(url);
  return response.data;
}
//
/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  try{
    const url=`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`;
    const data={
    data: {
      user: userInfo
    }
  };
    const response = await axios.post(url, data);
    return response.data;
  }catch(error){
    console.log(error.message);
  };
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
  const response = await axios.get(url,{
    headers: {
      authorization: ADMIN_TOKEN
    }});
  return response.data.orders;
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`;
  const data={ 
    data: {
      id: orderId,
      paid: isPaid
    }
  };
  const headers={
    headers: {
      authorization: ADMIN_TOKEN
    }
  };
  const response = await axios.put(url,data,headers);
  return response.data;
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  const url=`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`;
  const response = await axios.delete(url,{
    headers: {
      authorization: ADMIN_TOKEN
    }});
  return response.data;
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
