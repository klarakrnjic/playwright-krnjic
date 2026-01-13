Ham Radio Outlet E2E Tests with Playwright
This project contains automated end-to-end tests for Ham Radio Outlet, a retail website for amateur radio equipment.
The tests are written using Playwright and focus on essential user flows such as product search, cart management, and checkout validation.

📦 Tech Stack
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Playwright-45BA4B?style=for-the-badge&logo=playwright&logoColor=white" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>

🚀 Getting Started
1. Clone the Repository
bash
git clone https://github.com/klarakrnjic/playwright-krnjic.git
2. Install Dependencies
bash
npm install
3. Install Playwright Browsers
bash
npx playwright install
4. Run All Tests
bash
npx playwright test
5. View Test Report
bash
npx playwright show-report
✅ Covered Test Scenarios
Navigate through product categories

Search for a specific radio or accessory

View product details and specifications

Add and remove items from the cart

Create and log in to a user account

Complete a purchase with order confirmation

🧰 Useful Commands
Run tests in headless mode:

bash
npx playwright test
Run tests in headed (UI) mode:

bash
npx playwright test --headed
Run tests with debugger:

bash
npx playwright test --debug
📸 Screenshots and Videos
Playwright automatically saves screenshots and videos when a test fails.
You can find them inside the test-results/ directory after test execution.

📍 Repository
https://github.com/klarakrnjic/playwright-krnjic

🧪 Test Cases to Automate
1. User Login Test
Verify that a registered user can successfully log in with valid credentials and is redirected to their account page.

2. Search Functionality Test
Ensure that searching for a product (e.g., "Yaesu radio") returns relevant results containing the searched keyword.

3. Add to Cart Test
Test adding multiple products to the shopping cart and verify that item quantities and total price are displayed correctly.

4. Remove from Cart Test
Confirm that removing an item from the cart updates the cart count and total accordingly.

5. User Logout Test
Verify that a loged in user can successfully log out.