const BASE_URL = "http://localhost/AFFILIATE/backend/api";

// =========================
// Products
// =========================

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products.php`);
  return await response.json();
}

export async function getProduct(id) {
  const response = await fetch(`${BASE_URL}/product.php?id=${id}`);
  return await response.json();
}

export async function searchProducts(search) {
  const response = await fetch(
    `${BASE_URL}/search_products.php?search=${encodeURIComponent(search)}`
  );
  return await response.json();
}

export async function getCategories() {

  const response = await fetch(
    `${BASE_URL}/get_categories.php`
  );

  return await response.json();

}

export async function getProductsByCategory(category) {

  const response = await fetch(
    `${BASE_URL}/products_by_category.php?category=${encodeURIComponent(category)}`
  );

  return await response.json();

}

// =========================
// Product CRUD
// =========================

export async function addProduct(productData) {
  const response = await fetch(`${BASE_URL}/add_product.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  return await response.json();
}

export async function updateProduct(product) {
  const response = await fetch(`${BASE_URL}/update_product.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  return await response.json();
}



// =========================
// Image Upload
// =========================

export async function uploadImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${BASE_URL}/upload_image.php`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
}

// =========================
// Authentication
// =========================

export async function loginUser(userData) {
  const response = await fetch(`${BASE_URL}/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return await response.json();
}

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
}
// =========================
// Orders
// =========================

export async function placeOrder(orderData) {
  const response = await fetch(`${BASE_URL}/place_order.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return await response.json();
}

export async function getOrders() {
  const response = await fetch(`${BASE_URL}/orders.php`);
  return await response.json();
}

export async function getMyOrders(email) {
  const response = await fetch(
    `${BASE_URL}/my_orders.php?email=${encodeURIComponent(email)}`
  );

  return await response.json();
}

export async function getOrderItems(orderId) {
  const response = await fetch(
    `${BASE_URL}/get_order_items.php?order_id=${orderId}`
  );

  return await response.json();
}

export async function updateOrderStatus(id, status) {
  const response = await fetch(`${BASE_URL}/update_order_status.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      status,
    }),
  });

  return await response.json();
}

export async function deleteOrder(id) {
  const response = await fetch(`${BASE_URL}/delete_order.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  return await response.json();
}

export async function getDashboardStats() {
  const response = await fetch(`${BASE_URL}/dashboard_stats.php`);
  return await response.json();
}


// =========================
// Customers
// =========================

export async function getUsers() {
  const response = await fetch(`${BASE_URL}/users.php`);
  return await response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/delete_user.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return await response.json();
}

// =========================
// Admin Products
// =========================

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products.php`);
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/delete_product.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  return await response.json();
}


export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/get_product.php?id=${id}`);
  return await response.json();
}


export async function getSalesReport() {
  const response = await fetch(
    `${BASE_URL}/sales_report.php`
  );

  return await response.json();
}

export async function getAdminProfile() {
  const response = await fetch(`${BASE_URL}/admin_profile.php`);
  return await response.json();
}

export async function updateAdminProfile(profile) {
  const response = await fetch(`${BASE_URL}/update_admin_profile.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  return await response.json();
}





export async function addReview(review) {
  const response = await fetch(`${BASE_URL}/add_review.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  return await response.json();
}

export async function getReviews(productId) {
  const response = await fetch(
    `${BASE_URL}/get_reviews.php?product_id=${productId}`
  );

  return await response.json();
}



export async function getOrderDetails(id) {
  const response = await fetch(
    `${BASE_URL}/order_details.php?id=${id}`
  );

  return await response.json();
}

export async function getProductReport() {
  const response = await fetch(
    `${BASE_URL}/product_report.php`
  );

  return await response.json();
}


export async function addActivity(activity) {
  const response = await fetch(`${BASE_URL}/add_activity.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activity,
    }),
  });

  return await response.json();
}

export async function getActivityLogs() {
  const response = await fetch(`${BASE_URL}/get_activity.php`);
  return await response.json();
}

export function exportOrders() {
  window.open(
    `${BASE_URL}/export_orders.php`,
    "_blank"
  );
}

export async function getNotifications() {
  const response = await fetch(
    `${BASE_URL}/get_notifications.php`
  );

  return await response.json();
}
export async function updateProfile(data) {

  const response = await fetch(
    `${BASE_URL}/update_profile.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}


export async function changePassword(data) {

  const response = await fetch(
    `${BASE_URL}/change_password.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await response.json();
}

// ================= FEATURED PRODUCTS =================

export async function getFeaturedProducts() {
  const response = await fetch(
    `${BASE_URL}/featured_products.php`
  );

  return await response.json();
}

// ================= TODAY DEALS =================

export async function getTodayDeals() {
  const response = await fetch(
    `${BASE_URL}/today_deals.php`
  );

  return await response.json();
}

// ================= FLASH SALE =================

export async function getFlashSaleProducts() {
  const response = await fetch(
    `${BASE_URL}/flash_sale.php`
  );

  return await response.json();
}

// ================= BEST SELLERS =================

export async function getBestSellerProducts() {
  const response = await fetch(
    `${BASE_URL}/best_sellers.php`
  );

  return await response.json();
}

// ======================
// Wishlist APIs
// ======================

export async function addToWishlist(user_email, product_id) {
  const response = await fetch(
    `${BASE_URL}/add_to_wishlist.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email,
        product_id,
      }),
    }
  );

  return response.json();
}

export async function removeFromWishlist(user_email, product_id) {
  const response = await fetch(
    `${BASE_URL}/remove_from_wishlist.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_email,
        product_id,
      }),
    }
  );

  return response.json();
}

export async function getWishlist(user_email) {
  const response = await fetch(
    `${BASE_URL}/get_wishlist.php?user_email=${encodeURIComponent(
      user_email
    )}`
  );

  return response.json();
}

export async function checkWishlist(user_email, product_id) {
  const response = await fetch(
    `${BASE_URL}/check_wishlist.php?user_email=${encodeURIComponent(
      user_email
    )}&product_id=${product_id}`
  );

  return response.json();
}