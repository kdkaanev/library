const {test, expect} = require('@playwright/test')

test('Verify "All Boocs" link is visable', async ({page})=> {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('nav.navbar');
   

    const allBooksLink =  await page.$('a[href="/catalog"]');
    const isLinkVisable = await allBooksLink.isVisible();

    expect(isLinkVisable).toBe(true)

})

test('Verifi "Login" button is visibal', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');
    const isVisibalLoginButton = await loginButton.isVisible();

    expect(isVisibalLoginButton).toBe(true);
})

test('Verifi "Register" button is visibal', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('nav.navbar');
    const registerButton = await page.$('a[href="/register"]');
    const isVisibalRegisterButton = await registerButton.isVisible();

    expect(isVisibalRegisterButton).toBe(true);
})



test('Verifi "All Books" lonk is visable after user login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink =  await page.$('a[href="/catalog"]');
    const isLinkVisable = await allBooksLink.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Verify That the "My Books" Link Is Visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink =  await page.$('a[href="/profile"]');
    const isLinkVisable = await myBooksLink.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Verify That the "Add Book" Link Is Visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBookLink =  await page.$('a[href="/create"]');
    const isLinkVisable = await addBookLink.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Verify That the Users Email Address Is Visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const email =  await page.$('#user');
    const isLinkVisable = await email.isVisible();

    expect(isLinkVisable).toBe(true)
})

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');

    expect(page.url()).toBe('http://localhost:3000/catalog')
})

test('Login with empty credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a [href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})

test('Submit the Form with Empty Email Input Field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a [href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')

})

test('Submit the Form with Empty Password Input Field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();

    });
    await page.$('a [href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})
test('Submit the Form with Different Passwords', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123476');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    })
})

test('Add book whit correct data', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.fill('#title', 'The Hobbit');
    await page.fill('#description', 'The Hobbit is a novel');
    await page.fill('#image', 'https://www.booktopia.com.au/covers/9780553448486/300/300');
    await page.selectOption('#type', 'Fiction');

    await  page.click('#create-form input[type="submit"]');

    await page.waitForURL('http://localhost:3000/catalog');

    expect(page.url()).toBe('http://localhost:3000/catalog')

})
test('add book with empty title', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');


    await page.fill('#description', 'The Hobbit is a novel');
    await page.fill('#image', 'https://www.booktopia.com.au/covers/9780553448486/300/300');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create')

});
test('add book with empty description', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');


    await page.fill('#title', 'The Hobbit');
    await page.fill('#image', 'https://www.booktopia.com.au/covers/9780553448486/300/300');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create')

});
test('add book with empty image', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');

    await page.click('a[href="/create"]');
    await page.waitForSelector('#create-form');


    await page.fill('#description', 'The Hobbit is a novel');
    await page.fill('#title', 'The Hobbit');
    await page.selectOption('#type', 'Fiction');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });

    await page.$('a[href="/create"]');
    expect(page.url()).toBe('http://localhost:3000/create')

});

test('Login and verify that all books are visible', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.waitForSelector('.dashboard');

    const  bookElement = await page.$$('.other-books-list');
    expect(bookElement.length).toBeGreaterThan(0)
})

test('Login and verify that all no books are displayed', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.waitForSelector('#dashboard-page');


    const noBookMessage = await page.textContent('.no-books');
    expect(noBookMessage).toBe('No books in database!')
})

test('Login and navigate to Details page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');


    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks')
    await page.click('.otherBooks .button');
    await page.waitForSelector('.book-information')

    const detailPageInfo = await page.textContent('.book-information h3');
    expect(detailPageInfo).toBe('To Kill a Mockingbird')

})

test('Verify That Guest User Sees Details Button and Button Works Correctly', async ({ page }) => {

    await page.goto('http://localhost:3000/catalog');

    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks')
    await page.click('.otherBooks .button');
    await page.waitForSelector('.book-information');

    const detailPageInfo = await page.textContent('.book-information h3');
    expect(detailPageInfo).toBe('To Kill a Mockingbird')
})

test('Verify That All Info Is Displayed Correctly', async ({ page }) => {

    await page.goto('http://localhost:3000/catalog');
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks')
    await page.click('.otherBooks .button');
    await page.waitForSelector('.book-information');

    const detailPageInfo = await page.textContent('.book-information h3');
    const detailPageDescription = await page.textContent('.book-description h3');
    const detailPageType = await page.textContent('.type');

    expect(detailPageInfo).toBe('To Kill a Mockingbird')
    expect(detailPageDescription).toBe('Description:')
    expect(detailPageType).toBe('Type: Classic')


})
test('Verify If Edit and Delete Buttons Are Visible for Creator', async ({ page }) => {

    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks')
    await page.click('.otherBooks .button');
    await page.waitForSelector('.book-information')

    const editButton = await page.$('.actions > a:nth-child(1)');
    const deleteButton = await page.$('.actions > a:nth-child(2)');

    expect(editButton).toBeTruthy();
    expect(deleteButton).toBeTruthy();

})
test('Verify If Edit and Delete Buttons Are Visible for Guest', async ({ page }) => {

    await page.goto('http://localhost:3000/catalog');
    await page.click('a[href="/catalog"]');
    await page.waitForSelector('.otherBooks')
    await page.click('.otherBooks .button');
    await page.waitForSelector('.book-information');

    const editButton = await page.$('.actions > a:nth-child(1)');
    const deleteButton = await page.$('.actions > a:nth-child(2)');

    expect(editButton).toBeFalsy();
    expect(deleteButton).toBeFalsy();


})

test('Verify If Like Button Is Not Visible for Creator', async ({ page }) => {

    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');

    await Promise.all([
        page.click('input[type="submit"]'),
        page.waitForURL('http://localhost:3000/catalog')
    ]);
    await page.click('a[href="/profile"]');
    await page.waitForSelector('.otherBooks')
    await page.click('.otherBooks .button');
    await page.waitForSelector('.book-information')

    const likeButton = await page.$('.like');
    expect(likeButton).toBeFalsy();

});















