const { Builder, Capabilities, By, until, Key } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
    driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    await driver.get('http://localhost:3000');
});

afterEach(async () => {
    await driver.quit();
});

describe("add movies test", () => {

    test("Check the message after check", async () => {
        let message;
        await driver.findElement(By.name("movieTitle")).sendKeys("The Matrix", Key.RETURN);
        let checkbox = await driver.findElement(By.id("movie-0"));
        await checkbox.click();
        message = await driver.findElement(By.id("message")).getText();
        expect(message).toBe("Watched The Matrix");
        await driver.findElement(By.className("delete-btn")).click();
        message = await driver.findElement(By.id("message"));
        await driver.wait(until.elementIsNotVisible(message), 2000);
    })

    test("Check the message after uncheck", async () => {
        let message;
        await driver.findElement(By.name("movieTitle")).sendKeys("The Matrix", Key.RETURN);
        let checkbox = await driver.findElement(By.id("movie-0"));
        await checkbox.click();
        await checkbox.click();
        message = await driver.findElement(By.id("message")).getText();
        expect(message).toBe("Added back The Matrix");
        await driver.findElement(By.className("delete-btn")).click();
        message = await driver.findElement(By.id("message"));
        await driver.wait(until.elementIsNotVisible(message), 2000);
    })


    test("Check the movie is deleted", async () => {
        await driver.findElement(By.name("movieTitle")).sendKeys("The Matrix", Key.RETURN);
        await driver.findElement(By.className("delete-btn")).click();
        let movieElements = await driver.findElements(By.id("movie-0"));
        expect(movieElements.length).toBe(0);
    })

});