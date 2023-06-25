// const puppeteer = require("puppeteer");

// async function scrapeAmazonProducts() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navigate to the Amazon website
//   await page.goto('https://www.amazon.com/');

//   // Enter a search query
//   const searchQuery = 'laptop';
//   await page.type('#twotabsearchtextbox', searchQuery);
//   await page.keyboard.press('Enter');

//   // Wait for search results to load
//   await page.waitForSelector('.s-result-item');

//   // Extract product information
//   const products = await page.evaluate(() => {
//     const productList = document.querySelectorAll('.s-result-item');
//     const productsData = [];

//     productList.forEach((product) => {
//       const titleElement = product.querySelector('.a-size-medium');
//       const priceElement = product.querySelector('.a-price-whole');
//       const imageElement = product.querySelector('.s-image');
//       const categoryElement = product.querySelector('.a-color-secondary');

//       if (titleElement && priceElement && imageElement && categoryElement) {
//         const title = titleElement.textContent.trim();
//         const price = priceElement.textContent.trim();
//         const image = imageElement.getAttribute('src');
//         const category = categoryElement.textContent.trim();

//         productsData.push({ title, price, image, category });
//       }
//     });

//     return productsData;
//   });

//   console.log(products);

//   await browser.close();
// }

// scrapeAmazonProducts();

// async function scrapeAmazonProducts() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   // Navigate to the Amazon website
//   await page.goto(
//     "https://www.amazon.com/s?k=laptop&crid=1W427Y7XG0R7F&sprefix=laptop%2Caps%2C406&ref=nb_sb_noss_2"
//   );

//   const getLaptop = await page.evaluate(() => {
//     const laptop = document.querySelector(
//       ".a-size-medium.a-color-base.a-text-normal"
//     );
//     return laptop.innerHTML;
//   });

//   console.log(getLaptop);

//   await browser.close();
// }

// scrapeAmazonProducts();

// const puppeteer = require("puppeteer");

// async function scrapeJumia() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://www.jumia.com.ng/");

//   // Wait for the product items to load
//   await page.waitForSelector("a.core");

//   // Extract the product data
//   const productData = await page.evaluate(() => {
//     const products = Array.from(document.querySelectorAll("a.core"));

//     return products.map((product) => {
//       return {
//         image: product.querySelector("img").getAttribute("data-src"),
//         title: product.querySelector("h3.title").innerText.trim(),
//         category: product.querySelector("h3.title span").innerText.trim(),
//         price: product.querySelector("span.price").innerText.trim(),
//       };
//     });
//   });

//   // Print the extracted information
//   productData.forEach((product) => {
//     console.log("Image:", product.image);
//     console.log("Title:", product.title);
//     console.log("Category:", product.category);
//     console.log("Price:", product.price);
//     console.log("----------------------");
//   });

//   await browser.close();
// }

// scrapeJumia();

const puppeteer = require("puppeteer");

async function scrapeJumia(searchTerm) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.jumia.com.ng/");

  // Type the search term and press Enter
  await page.type('input[name="q"]', searchTerm);
  await page.keyboard.press("Enter");

  // Wait for the search results to load
  await page.waitForNavigation({ timeout: 0 });

  // Extract the product data from all pages
  const productData = await scrapeProductData(page);

  // Print the extracted information
  //   productData.forEach((product) => {
  //     console.log("Image:", product.image);
  //     console.log("Title:", product.title);
  //     console.log("Category:", product.category);
  //     console.log("Price:", product.price);
  //     console.log("----------------------");
  //   });
  console.log(productData);
  console.log(productData?.length);

  await browser.close();
}

async function scrapeProductData(page) {
  const productData = [];

  // Function to extract product data from a single page
  const extractProductData = async () => {
    const products = await page.evaluate(() => {
      const products = Array.from(document.querySelectorAll("a.core"));
      //   const products = Array.from(document.querySelectorAll("a.link"));

      return products.map((product) => {
        return {
          image: product.querySelector("img").getAttribute("data-src"),
          title: product.querySelector("h3.name")
            ? product.querySelector("h3.name").innerText.trim()
            : "",
          category: product.getAttribute("data-category"),
          //   category: product.getAttribute("data-brand")
          //     ? product.getAttribute("data-brand").innerText.trim()
          //     : "",
          price: product.querySelector("div.prc")
            ? product.querySelector("div.prc").innerText.trim()
            : "",
        };
        // return {
        //   image: product.querySelector("img").getAttribute("data-src"),
        //   title: product.querySelector("h3.name").innerText.trim(),
        //   //   title: product.querySelector("h3.title").innerText.trim(),
        //   category: product.getAttribute("data-brand").innerText.trim(),
        //   //   category: product.querySelector("h3.title span").innerText.trim(),
        //   price: product.querySelector("div.prc").innerText.trim(),
        //   //   price: product.querySelector("span.price").innerText.trim(),
        // };
      });
    });

    productData.push(...products);
  };

  // Extract product data from the initial page
  await extractProductData();

  // Check if there are additional pages
  while (true) {
    // Check if the "next" button is disabled (indicating no more pages)
    const nextButtonDisabled = await page.evaluate(() => {
      const nextButton = document.querySelector('a[aria-label="Next Page"]');
      return nextButton
        ? nextButton.getAttribute("aria-disabled") === "true"
        : true;
    });

    if (nextButtonDisabled) {
      break;
    }

    // Click the "next" button and wait for the page to load
    await Promise.all([
      page.click('a[aria-label="Next Page"]'),
      page.waitForNavigation(),
    ]);

    // Extract product data from the current page
    await extractProductData();
  }

  return productData;
}

scrapeJumia("a");
