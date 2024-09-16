// const puppeteer = require('puppeteer');

// async function main() {
//     const browser = await puppeteer.launch({
//         headless: false,  // Set to true if you want to see the browser UI
//         defaultViewport: null,  // Allows the viewport to be maximized
//         args: ["--start-maximized"]
//     });

//     const page = await browser.newPage();

//     try {
//         // Go to the Internshala login page
//         await page.goto('https://internshala.com/login');

//         // Wait for the email and password input fields to appear
//         await page.waitForSelector('#email');
//         await page.waitForSelector('#password');

//         // Enter username (email) and password
//         const username = 'whereyouat12am@gmail.com';  // Replace with your actual username or email
//         const password = 'internshala990#';  // Replace with your actual password

//         await page.type('#email', username);
//         await page.type('#password', password);

//         // Press Enter to submit the form
//         await page.keyboard.press('Enter');

//         // Wait for navigation to complete (assuming redirection after login)
//         await page.waitForNavigation();

//         // Check if login was successful (you can add your logic here)
//         console.log('Login successful!');

//         // Navigate to the internship in Mumbai page
//         await page.goto('https://internshala.com/internships/android-app-development-internship-in-mumbai/');

//         console.log('Navigated to "Internship in Mumbai" page.');
//         console.log('Entered "Software" into the search input field.');

//         // Press Enter key to trigger search
//         await page.goto('https://internshala.com/internships/android-app-development-internship-in-mumbai/', { waitUntil: 'networkidle0' });

//     // Wait for the container to load
//     await page.waitForSelector('#internship_list_container_1');

//     // Click the first div inside the container
//     await page.evaluate(async () => {
//       const firstDiv = document.querySelector('#internship_list_container_1 > div:first-child');
//       if (firstDiv) {
//         firstDiv.click();
//         await page.waitForNavigation();
//       } else {
//         throw new Error('First div not found');
//       }
//     });

//     // Wait for a moment to see the resul

//     // Close the browser
//         // You can continue with further actions after the page has loaded
        
//     } catch (error) {
//         console.error('Login or navigation failed:', error);
//     } finally {
//         // Close the browser after execution
//         await browser.close();
//     }
// }

// main();
const puppeteer = require("puppeteer");
let { id, pass } = require("./secret");
let tab;
let dataFile = require("./data");
async function main(email,password) {
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    tab = pages[0];
    await tab.goto("https://internshala.com/");
    await tab.click("button.login-cta");
    await tab.type("#modal_email", email);
    await tab.type("#modal_password", password);
    await tab.click("#modal_login_submit");
    // await tab.evaluate(() => {
    //     alert("Please click the submit button and then press OK here to continue.");
    // });
    // // Wait for the user to click the submit button manually
    // await tab.waitForFunction(
    //     () => document.querySelector('selector-for-submit-button') === null, // Replace with actual selector
    //     { timeout: 0 } // Wait indefinitely until the condition is met
    // );
    // console.log("Submit button clicked. Proceeding to the next task...");
    await tab.waitForNavigation({ waitUntil: "networkidle2" });
    await tab.click(".nav-link.dropdown-toggle.profile_container .is_icon_header.ic-24-filled-down-arrow");
    // Inject a script to prompt the user to click the submit button
    let profile_options = await tab.$$(".profile_options a");
    let app_urls = [];
    for (let i = 0; i < 11; i++) {
        let url = await tab.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, profile_options[i]);
        app_urls.push(url);
    }
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });
    tab.goto("https://internshala.com" + app_urls[3]);
    await tab.waitForSelector("#resume-education .ic-16-plus", { visible: true });
    await tab.click("#resume-education .ic-16-plus");  
    await tab.waitForSelector("#graduation-tab .ic-16-plus", { visible: true });
    await tab.click("#graduation-tab .ic-16-plus");
    await graduation(dataFile[0]);
    // await new Promise(function (resolve, reject) {
    //     return setTimeout(resolve, 1000);
    // });
    // await tab.waitForSelector(".next-button", { visible: true });
    // await tab.click(".next-button");
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await training(dataFile[0]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    // await tab.waitForSelector(".next-button", { visible: true });
    // await tab.click(".next-button");
    // await tab.waitForSelector(".btn.btn-secondary.skip.skip-button", { visible: true });
    // await tab.click(".btn.btn-secondary.skip.skip-button");
    await workSample(dataFile[0]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    // await tab.waitForSelector("#save_work_samples", { visible: true });
    // await tab.click("#save_work_samples");
    // await tab.waitForSelector(".resume_download_mobile", {visible : true});
    // await tab.click(".resume_download_mobile");                                // if you want to download resume.
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await application(dataFile[0]);
}
let graduationCompleted = false;
async function graduation(data) {
    // await tab.waitForSelector("#degree_completion_status_pursuing", { visible: true });
    // await tab.click("#degree_completion_status_pursuing");
    if (graduationCompleted) {
        console.log("Graduation details already submitted. Skipping...");
        return;
    }

    await tab.waitForSelector("#college", { visible: true });
    await tab.type("#college", data["College"]);
    await tab.waitForSelector("#start_year_chosen", { visible: true });
    await tab.click("#start_year_chosen");
    await tab.waitForSelector(".active-result[data-option-array-index='5']", { visible: true });
    await tab.click(".active-result[data-option-array-index='5']");
    await tab.waitForSelector("#end_year_chosen", { visible: true });
    await tab.click('#end_year_chosen');
    await tab.waitForSelector("#end_year_chosen .active-result[data-option-array-index = '6']", { visible: true });
    await tab.click("#end_year_chosen .active-result[data-option-array-index = '6']");
    await tab.waitForSelector("#degree", { visible: true });
    await tab.type("#degree", data["Degree"]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#stream", { visible: true });
    await tab.type("#stream", data["Stream"]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#performance-college", { visible: true });
    await tab.type("#performance-college", data["Percentage"]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.click("#college-submit");
    await tab.waitForNavigation({ waitUntil: 'networkidle0' });

// Refresh the page
await tab.reload({ waitUntil: 'networkidle0' });
}


async function training(data) {
    console.log("Training data")
    await tab.waitForSelector('#resume-training .ic-16-plus',{visible:true});
    await tab.click("#resume-training .ic-16-plus")
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    // await tab.click(".experiences-tabs[data-target='#training-modal'] .ic-16-plus");
    await tab.waitForSelector("#other_experiences_course", { visible: true });
    await tab.type("#other_experiences_course", data["Training"]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.waitForSelector("#other_experiences_organization", { visible: true });
    await tab.type("#other_experiences_organization", data["Organization"]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.click("#other_experiences_location_type_label");
    await tab.click("#other_experiences_start_date");
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 1000);
    });
    await tab.waitForSelector(".ui-state-default[href='#']", { visible: true });
    let date = await tab.$$(".ui-state-default[href='#']");
    await date[0].click();
    await tab.click("#other_experiences_is_on_going");
    await tab.waitForSelector("#other_experiences_training_description", { visible: true });
    await tab.type("#other_experiences_training_description", data["description"]);
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });
    await tab.click("#training-submit");
}

async function workSample(data) {
    await tab.waitForSelector('#work-modal .ic-16-plus',{visible:true});
    await tab.click("#work-modal .ic-16-plus")
    await tab.waitForSelector("#to_add_github .ic-24-github", { visible: true });
    await tab.click("#to_add_github .ic-24-github")
    console.log("zaidl")
    await tab.waitForSelector(".input-container .form-control", { visible: true });
    console.log("sdfsfs")
    await tab.type("input-container .form-control", data["link"]);
    console.log("alfd")
}
async function application(data) {
    await tab.goto("https://internshala.com/the-grand-summer-internship-fair");
    await tab.waitForSelector(".btn.btn-primary.campaign-btn.view_internship", { visible: true });
    await tab.click(".btn.btn-primary.campaign-btn.view_internship")
    await new Promise(function (resolve, reject) {
        return setTimeout(resolve, 2000);
    });
    await tab.waitForSelector(".view_detail_button", { visible: true });
    let details = await tab.$$(".view_detail_button");
    let detailUrl = [];
    for (let i = 0; i < 3; i++) {
        let url = await tab.evaluate(function (ele) {
            return ele.getAttribute("href");
        }, details[i]);
        detailUrl.push(url);
    }
    for (let i of detailUrl) {
        await apply(i, data);
        await new Promise(function (resolve, reject) {
            return setTimeout(resolve, 1000);
        });
    }
}
async function apply(url, data) {
    await tab.goto("https://internshala.com" + url);
    await tab.waitForSelector(".btn.btn-large", { visible: true });
    await tab.click(".btn.btn-large");
    await tab.waitForSelector("#application_button", { visible: true });
    await tab.click("#application_button");
    await tab.waitForSelector(".textarea.form-control", { visible: true });
    let ans = await tab.$$(".textarea.form-control");
    for (let i = 0; i < ans.length; i++) {
        if (i == 0) {
            await ans[i].type(data["hiringReason"]);
            await new Promise(function (resolve, reject) {
                return setTimeout(resolve, 1000);
            });
        }
        else if (i == 1) {
            await ans[i].type(data["availability"]);
            await new Promise(function (resolve, reject) {
                return setTimeout(resolve, 1000);
            });
        }
        else {
            await ans[i].type(data["rating"]);
            await new Promise(function (resolve, reject) {
                return setTimeout(resolve, 1000);
            });
        }
    }
    await tab.click(".submit_button_container");
}

module.exports = { main };