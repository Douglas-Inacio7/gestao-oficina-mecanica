/**
 * TESTES AUTOMATIZADOS - FLUXO DE LOGIN
 * 
 * Trilha 1 - Automação Web - Projeto Final QA
 */

import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('Fluxo de Login - Sistema Oficina Mecânica', () => {

  test('CT01 - Login com credenciais válidas deve redirecionar para o dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('admin@oficina.com', 'Admin123');
    
    await expect(page).toHaveURL(/.*gestao-oficina-mecanica/);
    await expect(loginPage.loginForm).not.toBeVisible();
  });

  test('CT02 - Login com senha fraca deve exibir mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.fillEmail('admin@oficina.com');
    await loginPage.fillPassword('123');
    await loginPage.clickLoginButton();
    
    await page.waitForSelector('[data-testid="error-message"]', { timeout: 5000 });
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('CT03 - Login com campos vazios deve exibir mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.clickLoginButton();
    
    await page.waitForSelector('[data-testid="error-message"]', { timeout: 5000 });
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('CT04 - Botão olhinho deve mostrar/esconder a senha', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    
    let fieldType = await loginPage.getPasswordFieldType();
    expect(fieldType).toBe('password');
    
    await loginPage.togglePasswordVisibility();
    fieldType = await loginPage.getPasswordFieldType();
    expect(fieldType).toBe('text');
    
    await loginPage.togglePasswordVisibility();
    fieldType = await loginPage.getPasswordFieldType();
    expect(fieldType).toBe('password');
  });

  test('CT05 - Login com usuário inexistente deve exibir mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('usuario@naoexiste.com', 'SenhaFalsa123');
    
    await page.waitForSelector('[data-testid="error-message"]', { timeout: 5000 });
    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('CT06 - Página inicial deve exibir o formulário de login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    
    const isVisible = await loginPage.isFormVisible();
    expect(isVisible).toBe(true);
  });
});