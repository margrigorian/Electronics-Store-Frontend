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

async function getFeildOfApplicationCategories(category) {
    try {
        const data = await fetch(`http://localhost:3001/catalog/${category}`);
        const productCategories = await data.json();
        return productCategories;
    } catch (err) {
        console.log(err);
    }
}

async function getProductList(
    search,
    category,
    subcategory,
    minPrice,
    maxPrice,
    order,
    page,
    limit
) {
    try {
        const data = await fetch(
            `http://localhost:3001/catalog/product-list/${category}?search=${search}&subcategory=${subcategory}&minPrice=${minPrice}&maxPrice=${maxPrice}&order=${order}&page=${page}&limit=${limit}`
        );
        const productList = await data.json();
        return productList;
    } catch (err) {
        console.log(err);
    }
}

export { makeAuthorization, makeRegistration, getFeildOfApplicationCategories, getProductList };
