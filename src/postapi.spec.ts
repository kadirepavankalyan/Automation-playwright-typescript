import { test, expect } from '@playwright/test';

test.describe('API Testing with Playwright', () => {
  let authToken: string;
  let userId: string;

  test.beforeAll('POST request - Login API', async ({ request }) => {
    const requestBody = {
      userEmail: 'Pavankalyan@dipsotable.com',
      userPassword: 'Passw0rd!1'
    };

    const response = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: requestBody
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    authToken = responseBody.token;
    userId = responseBody.userId;

    expect(authToken).not.toBeNull();
    expect(userId).not.toBeNull();

    console.log('Auth Token:', authToken);
    console.log('User ID:', userId);
  });

  test('POST request - Add Product to Cart', async ({ request }) => {
    const addToCartBody = {
      product: {
        _id: "6581ca399fd99c85e8ee7f45",
        productName: "ZARA COAT 3",
        productCategory: "fashion",
        productSubCategory: "shirts",
        productPrice: 31500,
        productDescription: "Zara coat for Women and girls",
        productImage: "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
        productRating: "0",
        productStatus: true,
        productFor: "women",
        productAddedBy: "admin@gmail.com",
      },
      _id: userId
    };

    const response = await request.post('https://rahulshettyacademy.com/api/ecom/user/add-to-cart', {
      data: addToCartBody,
      headers: {
        Authorization: `${authToken}`
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log('Add to Cart Response:', responseBody);
  });

  test('GET request - Retrieve Cart Products', async ({ request }) => {
    const response = await request.get(`https://rahulshettyacademy.com/api/ecom/user/get-cart-products/${userId}`, {
      headers: {
        Authorization: `${authToken}`
      }
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.products).toBeInstanceOf(Array);
    expect(responseBody.products.length).toBeGreaterThan(0);

    const product = responseBody.products.find((p: any) => p._id === "6581ca399fd99c85e8ee7f45");
    expect(product).toHaveProperty('productName', 'ZARA COAT 3');
    expect(product).toHaveProperty('productCategory', 'fashion');
    expect(product).toHaveProperty('productSubCategory', 'shirts');
    expect(product).toHaveProperty('productPrice', 31500);

    console.log('Cart Products:', responseBody);
  });
});