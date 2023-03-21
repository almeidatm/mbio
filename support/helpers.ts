import fs from 'fs/promises';

export const EXPECTED_MIN_PRICE = 15000;
export const EXPECTED_MAX_PRICE = 60000;
export const BACKGROUND_HIGHLIGHT_COLOR = "rgb(232, 232, 232)";

export async function writeToFile(minPrice: number, maxPrice: number) {
  const formatter = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "GBP",
  });
  const min = formatter.format(minPrice);
  const max = formatter.format(maxPrice);

  try {
    const content = `Min price is ${min} \nMax price is ${max}`;
    await fs.writeFile("prices.txt", content);
  } catch (err) {
    console.log(err);
  }
}
