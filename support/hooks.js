const { Before, After, BeforeAll, AfterAll } = require('@cucumber/cucumber');
require('dotenv').config();

// Global setup - runs once before all tests
BeforeAll(async function() {
    console.log('🚀 Starting test suite...');
    console.log('📋 Test environment variables:');
    console.log(`   - TEST_USER: ${process.env.TEST_USER || 'S_admin (default)'}`);
    console.log(`   - TEST_PASSWORD: ${process.env.TEST_PASSWORD ? '***' : 'admin@123 (default)'}`);
    console.log(`   - TEST_STORE_CODE: ${process.env.TEST_STORE_CODE || 'SUB1 (default)'}`);
    
    // Ensure browser is maximized at the start
    try {
        await browser.maximizeWindow();
        console.log('🖥️  Browser window maximized in BeforeAll');
    } catch (error) {
        console.log('⚠️  Could not maximize window in BeforeAll:', error.message);
    }
});

// Global teardown - runs once after all tests
AfterAll(async function() {
    console.log('✅ Test suite completed');
});

// Before each scenario
Before(async function(scenario) {
    console.log(`\n📝 Running scenario: ${scenario.pickle.name}`);
    console.log(`🏷️  Tags: ${scenario.pickle.tags.map(tag => tag.name).join(', ')}`);
    
    // Maximize browser window for better visibility
    try {
        await browser.maximizeWindow();
        console.log('🖥️  Browser window maximized');
    } catch (error) {
        console.log('⚠️  Could not maximize window:', error.message);
        // Fallback: Set a large window size
        await browser.setWindowSize(1920, 1080);
        console.log('🖥️  Set window size to 1920x1080');
    }
    
    // Clear browser data before each test
    await browser.deleteAllCookies();
    await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    
    // Set default timeout for all operations
    await browser.setTimeout({ 'implicit': 10000, 'pageLoad': 30000, 'script': 30000 });
});

// After each scenario
After(async function(scenario) {
    console.log(`📊 Scenario result: ${scenario.result?.status || 'unknown'}`);
    
    // Take screenshot on failure
    if (scenario.result && scenario.result.status === 'FAILED') {
        const screenshot = await browser.saveScreenshot();
        console.log(`📸 Screenshot saved for failed scenario: ${scenario.pickle.name}`);
        
        // Attach screenshot to the scenario
        await this.attach(screenshot, 'image/png');
    }
    
    // Clear browser data after each test
    await browser.deleteAllCookies();
    await browser.execute(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    
    // Close any open alerts or modals
    try {
        await browser.dismissAlert();
    } catch (e) {
        // No alert to dismiss
    }
});

// Before hook for specific tags
Before('@smoke', async function() {
    console.log('🔥 Running smoke test - using default credentials');
});

Before('@negative', async function() {
    console.log('❌ Running negative test case');
});

Before('@session', async function() {
    console.log('⏰ Running session timeout test');
});

// After hook for specific tags
After('@session', async function() {
    console.log('🔄 Session test completed - cleaning up session data');
    // Additional cleanup for session tests
    await browser.execute(() => {
        // Clear any session-related data
        if (window.sessionStorage) {
            window.sessionStorage.clear();
        }
    });
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    await browser.deleteSession();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    await browser.deleteSession();
    process.exit(0);
}); 