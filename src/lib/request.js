async function makeAuthorization(body) {
    try {
        const data = await fetch("http://localhost:3001/authentication/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        const authorization = await data.json();
        return authorization;
    } catch (err) {
        console.log(err);
    }
}

async function makeRegistration(body) {
    try {
        const data = await fetch("http://localhost:3001/authentication/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });

        const registration = data.json();
        return registration;
    } catch (err) {
        console.log(err);
    }
}

async function getFeildOfApplicationCategories(fieldOfApplication) {
    try {
        const data = await fetch(`http://localhost:3001/catalog/${fieldOfApplication}`);
        const productCategories = await data.json();
        return productCategories;
    } catch (err) {
        console.log(err);
    }
}

async function getProductList(category, subcategory, minPrice, maxPrice, order, page, limit) {
    try {
        const data = await fetch(
            `http://localhost:3001/catalog/product-list/${category}?subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&order=${order}&page=${page}&limit=${limit}`
        );
        const productList = await data.json();
        return productList;
    } catch (err) {
        console.log(err);
    }
}

async function getSearchProductList(search, subcategory, minPrice, maxPrice, order, page, limit) {
    try {
        const data = await fetch(
            `http://localhost:3001/catalog/search?q=${search}&subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&order=${order}&page=${page}&limit=${limit}`
        );
        const productList = await data.json();
        return productList;
    } catch (err) {
        console.log(err);
    }
}

async function getProduct(id) {
    try {
        const data = await fetch(`http://localhost:3001/catalog/product/${id}`);
        const product = await data.json();
        return product;
    } catch (err) {
        console.log(err);
    }
}

async function postRate(productId, rate, token) {
    try {
        await fetch(`http://localhost:3001/catalog/product/${productId}?rate=${rate}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function putRate(productId, rate, token) {
    try {
        await fetch(`http://localhost:3001/catalog/product/${productId}?rate=${rate}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                authorization: `Bearer ${token}`
            }
        });
    } catch (err) {
        console.log(err);
    }
}

async function postComment(productId, comment, token) {
    try {
        await fetch(`http://localhost:3001/catalog/product/${productId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ comment })
        });
    } catch (err) {
        console.log(err);
    }
}

async function deleteComment(productId, commentId, token) {
    try {
        await fetch(`http://localhost:3001/catalog/product/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ commentId })
        });
    } catch (err) {
        console.log(err);
    }
}

async function getAllProductsWithCategoryStructure(token) {
    try {
        let data = await fetch(`http://localhost:3001/account/admin/`, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                authorization: `Bearer ${token}`
            }
        });
        data = await data.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function postProduct(body, token) {
    try {
        const data = await fetch(`http://localhost:3001/account/admin`, {
            method: "POST",
            headers: {
                // Заголовок при отправке файлов, нерьходимо исп. FormData
                // "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                // делает post без загрузки изображения
                "Content-Type": "application/json; charset=utf-8",
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const product = await data.json();
        return product;
    } catch (err) {
        console.log(err);
    }
}

export {
    makeAuthorization,
    makeRegistration,
    getFeildOfApplicationCategories,
    getProductList,
    getSearchProductList,
    getProduct,
    postRate,
    putRate,
    postComment,
    deleteComment,
    getAllProductsWithCategoryStructure,
    postProduct
};
