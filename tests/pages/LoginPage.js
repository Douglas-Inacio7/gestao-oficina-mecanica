/**
 * Page Object: LoginPage
 * 
 * Esta classe representa a página de Login do sistema.
 * Centraliza todos os localizadores e ações relacionadas ao login.
 * 
 * Trilha 1 - Automação Web - Projeto Final QA
 * 
 * O que é um Page Object?
 * - Padrão de projeto que encapsula os elementos e ações de uma página
 * - Facilita manutenção: se a página mudar, muda apenas aqui
 * - Torna os testes mais limpos e reutilizáveis
 */

class LoginPage {
  /**
   * Construtor da classe
   * @param {import('@playwright/test').Page} page - Instância da página do Playwright
   * 
   * Aqui definimos todos os localizadores (como encontrar os elementos na tela)
   * Usamos getByTestId para localizar os elementos pelos data-testid que adicionamos
   */
  constructor(page) {
    this.page = page;

    // Localizadores baseados nos data-testid do componente LoginForm
    this.emailInput = page.getByTestId('email-input');           // Campo de email
    this.passwordInput = page.getByTestId('password-input');     // Campo de senha
    this.loginButton = page.getByTestId('login-button');         // Botão de login
    this.errorMessage = page.getByTestId('error-message');       // Mensagem de erro
    this.togglePasswordButton = page.getByTestId('toggle-password-visibility'); // Botão olhinho
    this.loginForm = page.getByTestId('login-form');             // Formulário completo
  }

  /**
   * Navega até a página de login
   * O baseURL já está configurado no playwright.config.js
   * Então page.goto('/') vai para http://localhost:5173/
   */
  async goto() {
    await this.page.goto('/');
  }

  /**
   * Preenche o email no campo correspondente
   * @param {string} email - Email a ser preenchido
   */
  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  /**
   * Preenche a senha no campo correspondente
   * @param {string} password - Senha a ser preenchida
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Clica no botão de login
   */
  async clickLoginButton() {
    await this.loginButton.click();
  }

  /**
   * Ação completa de login (combina preenchimento + clique)
   * Método de alto nível que executa o fluxo completo
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Obtém o texto da mensagem de erro
   * @returns {Promise<string>} Texto da mensagem de erro
   */
  async getErrorMessage() {
    // Verifica se a mensagem de erro está visível antes de tentar pegar o texto
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent();
    }
    return null;
  }

  /**
   * Verifica se a mensagem de erro está visível na tela
   * @returns {Promise<boolean>} True se visível, False se não
   */
  async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Alterna a visibilidade da senha (clicando no botão olhinho)
   * Útil para testar se o campo de senha muda de type="password" para type="text"
   */
  async togglePasswordVisibility() {
    await this.togglePasswordButton.click();
  }

  /**
   * Verifica o tipo do campo de senha (password ou text)
   * @returns {Promise<string>} O valor do atributo type do campo de senha
   */
  async getPasswordFieldType() {
    return await this.passwordInput.getAttribute('type');
  }

  /**
   * Limpa todos os campos do formulário de login
   */
  async clearForm() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Verifica se o formulário de login está visível na página
   * @returns {Promise<boolean>} True se visível, False se não
   */
  async isFormVisible() {
    return await this.loginForm.isVisible();
  }

  /**
   * Aguarda a página de login estar completamente carregada
   * Útil para garantir que a página está pronta antes de interagir
   */
  async waitForPageToLoad() {
    await this.loginForm.waitFor({ state: 'visible' });
  }
}

// Exporta a classe para ser usada nos testes
export default LoginPage;