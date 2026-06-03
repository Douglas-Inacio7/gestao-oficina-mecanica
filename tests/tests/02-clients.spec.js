/**
 * TESTES AUTOMATIZADOS - CRUD DE CLIENTES
 * 
 * Trilha 1 - Automação Web - Projeto Final QA
 */

import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

test.describe('CRUD de Clientes - Sistema Oficina Mecânica', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin@oficina.com', 'Admin123');
    
    await page.waitForTimeout(2000);
    await page.click('text=Clientes');
    await page.waitForSelector('button:has-text("Novo Cliente")', { timeout: 10000 });
  });

  test('CT08 - Cadastrar um novo cliente com dados válidos', async ({ page }) => {
    await page.click('button:has-text("Novo Cliente")');
    await page.waitForSelector('input[placeholder*="Digite o nome"]', { timeout: 5000 });
    
    await page.fill('input[placeholder*="Digite o nome"]', 'Maria Teste Silva');
    await page.fill('input[placeholder*="email@exemplo.com"]', 'maria@teste.com');
    await page.fill('input[placeholder*="(11) 99999-9999"]', '(11) 98888-7777');
    await page.click('button:has-text("Salvar")');
    
    // Aguarda a mensagem de sucesso
    await page.waitForTimeout(2000);
    
    await expect(page.locator('text=Maria Teste Silva')).toBeVisible({ timeout: 10000 });
  });

  test('CT09 - Buscar cliente por nome', async ({ page }) => {
    // PASSO 1: Criar um cliente com nome único
    const nomeUnico = `João Busca ${Date.now()}`;
    
    await page.click('button:has-text("Novo Cliente")');
    await page.waitForSelector('input[placeholder*="Digite o nome"]', { timeout: 5000 });
    
    await page.fill('input[placeholder*="Digite o nome"]', nomeUnico);
    await page.fill('input[placeholder*="email@exemplo.com"]', 'joao@busca.com');
    await page.fill('input[placeholder*="(11) 99999-9999"]', '(11) 97777-6666');
    await page.click('button:has-text("Salvar")');
    
    // Aguarda a mensagem de sucesso e o cliente aparecer
    await page.waitForTimeout(2000);
    await expect(page.locator(`text=${nomeUnico}`)).toBeVisible({ timeout: 10000 });
    
    // PASSO 2: Buscar pelo nome
    await page.fill('input[placeholder*="Buscar por nome"]', nomeUnico);
    await page.waitForTimeout(1000);
    
    // PASSO 3: Verificar resultado
    await expect(page.locator(`text=${nomeUnico}`)).toBeVisible();
  });

  test('CT10 - Editar um cliente existente', async ({ page }) => {
    const nomeOriginal = `Carlos Editar ${Date.now()}`;
    const nomeAtualizado = `Carlos Editado ${Date.now()}`;
    
    // PASSO 1: Criar um cliente
    await page.click('button:has-text("Novo Cliente")');
    await page.waitForSelector('input[placeholder*="Digite o nome"]', { timeout: 5000 });
    await page.fill('input[placeholder*="Digite o nome"]', nomeOriginal);
    await page.fill('input[placeholder*="email@exemplo.com"]', 'carlos@editar.com');
    await page.fill('input[placeholder*="(11) 99999-9999"]', '(11) 96666-5555');
    await page.click('button:has-text("Salvar")');
    
    await page.waitForTimeout(2000);
    await expect(page.locator(`text=${nomeOriginal}`)).toBeVisible({ timeout: 10000 });
    
    // PASSO 2: Editar o cliente
    await page.click('button:has-text("Editar")');
    await page.waitForSelector('input[placeholder*="Digite o nome"]', { timeout: 5000 });
    await page.fill('input[placeholder*="Digite o nome"]', nomeAtualizado);
    await page.click('button:has-text("Atualizar")');
    
    await page.waitForTimeout(2000);
    
    // PASSO 3: Verificar nome atualizado
    await expect(page.locator(`text=${nomeAtualizado}`)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(`text=${nomeOriginal}`)).not.toBeVisible();
  });

  test('CT11 - Cancelar cadastro de cliente', async ({ page }) => {
    const nomeCancelado = `Cliente Cancelado ${Date.now()}`;
    
    await page.click('button:has-text("Novo Cliente")');
    await page.waitForSelector('input[placeholder*="Digite o nome"]', { timeout: 5000 });
    
    await page.fill('input[placeholder*="Digite o nome"]', nomeCancelado);
    await page.fill('input[placeholder*="email@exemplo.com"]', 'cancelado@teste.com');
    await page.click('button:has-text("Cancelar")');
    
    await page.waitForTimeout(1000);
    
    // Verifica que o formulário fechou
    await expect(page.locator('input[placeholder*="Digite o nome"]')).not.toBeVisible();
    
    // Verifica que o cliente NÃO foi adicionado
    await expect(page.locator(`text=${nomeCancelado}`)).not.toBeVisible();
  });
});