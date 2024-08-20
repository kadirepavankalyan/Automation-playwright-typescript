import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs'; // Ensure fs module is imported for file system operations

test('upload file', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');
    const uploadFile = page.locator('#uploadFile');
    await uploadFile.setInputFiles('C://Users/pavanka/playwright-typescript/upload/newUploadFile.txt');

    expect(await page.locator('#uploadedFilePath').textContent()).toEqual('C:\\fakepath\\newUploadFile.txt');
});

test('download', async ({ page }) => {
    await page.goto('https://demoqa.com/upload-download');

    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('#downloadButton')
    ]);

    // Define the path where the downloaded file will be saved
    const downloadPath = path.join('C:/Users/pavanka/playwright-typescript/download', 'downloadedFile.jpeg');

    // Ensure the directory exists before saving the file
    const downloadDir = path.dirname(downloadPath);
    if (!fs.existsSync(downloadDir)) {
        fs.mkdirSync(downloadDir, { recursive: true });
    }

    // Save the downloaded file
    await download.saveAs(downloadPath);
    console.log('File downloaded successfully:', downloadPath);

    // Optionally, verify that the file exists and is not empty
    expect(fs.existsSync(downloadPath)).toBeTruthy();
    const fileSize = fs.statSync(downloadPath).size;
    expect(fileSize).toBeGreaterThan(0);
});
