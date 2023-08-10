// const puppeteer = require("puppeteer");
// const fs = require("fs");

// async function scrapeJumia(searchTerm) {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://www.jumia.com.ng/");

//   // Type the search term and press Enter
//   await page.type('input[name="q"]', searchTerm);
//   await page.keyboard.press("Enter");

//   // Wait for the search results to load
//   await page.waitForNavigation({ timeout: 0 });

//   // Extract the product data from all pages
//   const productData = await scrapeProductData(page);

//   // Save the data as JSON in a file
//   saveDataAsJson(productData);

//   await browser.close();
// }

// async function scrapeProductData(page) {
//   const productData = [];

//   // Function to extract product data from a single page
//   const extractProductData = async () => {
//     const products = await page.evaluate(() => {
//       const products = Array.from(document.querySelectorAll("a.core"));

//       return products.map((product) => {
// return {
//   image: product.querySelector("img").getAttribute("data-src"),
//   title: product.querySelector("h3.name")
//     ? product.querySelector("h3.name").innerText.trim()
//     : "",
//   category: product.getAttribute("data-category"),
//   price: product.querySelector("div.prc")
//     ? product.querySelector("div.prc").innerText.trim()
//     : "",
// };
//       });
//     });

//     productData.push(...products);
//   };

//   // Extract product data from the initial page
//   await extractProductData();

//   // Check if there are additional pages
//   while (true) {
//     // Check if the "next" button is disabled (indicating no more pages)
//     const nextButtonDisabled = await page.evaluate(() => {
//       const nextButton = document.querySelector('a[aria-label="Next Page"]');
//       return nextButton
//         ? nextButton.getAttribute("aria-disabled") === "true"
//         : true;
//     });

//     if (nextButtonDisabled) {
//       break;
//     }

//     // Click the "next" button and wait for the page to load
//     await Promise.all([
//       page.click('a[aria-label="Next Page"]'),
//       page.waitForNavigation(),
//     ]);

//     // Extract product data from the current page
//     await extractProductData();
//   }

//   return productData;
// }

// function saveDataAsJson(data) {
//   const jsonData = JSON.stringify(data, null, 2);

//   fs.writeFile("jumia_products.json", jsonData, "utf8", (err) => {
//     if (err) {
//       console.error("Error writing JSON file:", err);
//     } else {
//       console.log("Data saved successfully as JSON.");
//     }
//   });
// }

// scrapeJumia("a");

// FUNCTIONALITY TO SCRAPE BASED ON ALPHABETS

// const puppeteer = require("puppeteer");
// const fs = require("fs");

// async function scrapeJumia() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://www.jumia.com.ng/");

//   const alphabet = "abcdefghijklmnopqrstuvwxyz";
//   const uniqueProducts = new Set();

//   for (let i = 0; i < alphabet.length; i++) {
//     const searchTerm = alphabet[i];
//     console.log("Scraping products starting with letter:", searchTerm);

//     // Type the search term and press Enter
//     await page.type('input[name="q"]', searchTerm);
//     await page.keyboard.press("Enter");

//     // Wait for the search results to load
//     await page.setDefaultNavigationTimeout(0);
//     await page.waitForNavigation();

//     // Extract the product data from all pages
//     const productData = await scrapeProductData(page);

//     // Filter out duplicates and add unique products to the set
//     productData.forEach((product) => {
//       const productKey = `${product.title}-${product.price}`;
//       if (!uniqueProducts.has(productKey)) {
//         uniqueProducts.add(product);
//         // uniqueProducts.add(productKey);
//       }
//     });

//     // Clear the search input field
//     await page.focus('input[name="q"]');
//     await page.keyboard.press("End");
//     await page.keyboard.press("Backspace");
//   }

//   // Convert the set back to an array
//   const uniqueProductArray = Array.from(uniqueProducts);

//   // Save the data as JSON in a file
//   saveDataAsJson(uniqueProductArray);

//   await browser.close();
// }

// async function scrapeProductData(page) {
//   const productData = [];

//   // Function to extract product data from a single page
//   const extractProductData = async () => {
//     const products = await page.evaluate(() => {
//       const products = Array.from(document.querySelectorAll("a.core"));

//       return products.map((product) => {
//         return {
//           image: product.querySelector("img").getAttribute("data-src"),
//           title: product.querySelector("h3.name")
//             ? product.querySelector("h3.name").innerText.trim()
//             : "",
//           category: product.getAttribute("data-category"),
//           price: product.querySelector("div.prc")
//             ? product.querySelector("div.prc").innerText.trim()
//             : "",
//         };
//       });
//     });

//     productData.push(...products);
//   };

//   // Extract product data from the initial page
//   await extractProductData();

//   // Check if there are additional pages
//   while (true) {
//     // Check if the "next" button is disabled (indicating no more pages)
//     const nextButtonDisabled = await page.evaluate(() => {
//       const nextButton = document.querySelector('a[aria-label="Next Page"]');
//       return nextButton
//         ? nextButton.getAttribute("aria-disabled") === "true"
//         : true;
//     });

//     if (nextButtonDisabled) {
//       break;
//     }

//     // Click the "next" button and wait for the page to load
//     await Promise.all([
//       page.click('a[aria-label="Next Page"]'),
//       page.waitForNavigation(),
//     ]);

//     // Extract product data from the current page
//     await extractProductData();
//   }

//   return productData;
// }

// function saveDataAsJson(data) {
//   const jsonData = JSON.stringify(data, null, 2);

//   fs.writeFile("jumia_products.json", jsonData, "utf8", (err) => {
//     if (err) {
//       console.error("Error writing JSON file:", err);
//     } else {
//       console.log("Data saved successfully as JSON.");
//     }
//   });
// }

// scrapeJumia();

// END OF FUNCTIONALITY TO SCRAPE BASED ON ALPHABETS

// FUNCTIONALITY TO SCRAPE BASED ON CATEGORIES

const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeJumia() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.jumia.com.ng/");

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const uniqueProducts = new Set();

  for (let i = 0; i < alphabet.length; i++) {
    const searchTerm = alphabet[i];
    console.log("Scraping products starting with letter:", searchTerm);

    // Type the search term and press Enter
    await page.type('input[name="q"]', searchTerm);
    await page.keyboard.press("Enter");

    // Wait for the search results to load
    await page.setDefaultNavigationTimeout(0);
    await page.waitForNavigation();

    // Extract the product data from all pages
    const productData = await scrapeProductData(page);

    // Filter out duplicates and add unique products to the set
    productData.forEach((product) => {
      const productKey = `${product.title}-${product.price}`;
      if (!uniqueProducts.has(productKey)) {
        uniqueProducts.add(product);
        // uniqueProducts.add(productKey);
      }
    });

    // Clear the search input field
    await page.focus('input[name="q"]');
    await page.keyboard.press("End");
    await page.keyboard.press("Backspace");
  }

  // Convert the set back to an array
  const uniqueProductArray = Array.from(uniqueProducts);

  // Save the data as JSON in a file
  saveDataAsJson(uniqueProductArray);

  await browser.close();
}

async function scrapeProductData(page) {
  const productData = [];

  // Function to extract product data from a single page
  const extractProductData = async () => {
    const products = await page.evaluate(() => {
      const products = Array.from(document.querySelectorAll("a.core"));

      return products.map((product) => {
        return {
          image: product.querySelector("img").getAttribute("data-src"),
          title: product.querySelector("h3.name")
            ? product.querySelector("h3.name").innerText.trim()
            : "",
          category: product.getAttribute("data-category"),
          price: product.querySelector("div.prc")
            ? product.querySelector("div.prc").innerText.trim()
            : "",
        };
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

function saveDataAsJson(data) {
  const jsonData = JSON.stringify(data, null, 2);

  fs.writeFile("jumia_products.json", jsonData, "utf8", (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("Data saved successfully as JSON.");
    }
  });
}

scrapeJumia();

// END OF FUNCTIONALITY TO SCRAPE BASED ON CATEGORIES
