// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /* Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/'); 
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        
        const productsToBuy = [0, 1, 2, 3]; 

        productsToBuy.forEach((index) => {
            cy.get('.product-block').eq(index).click();
            
            cy.get('.button-variable-item').each(($el) => {
                cy.wrap($el).click();
            });
            
            cy.wait(500); 

            cy.get('.single_add_to_cart_button').click();

            
            cy.visit('http://lojaebac.ebaconline.art.br/produtos/');
        });
        
        cy.visit('http://lojaebac.ebaconline.art.br/carrinho/'); 
        cy.get('.checkout-button').click();
        
        cy.get('#billing_first_name').type('Seu_Nome');
        cy.get('#billing_last_name').type('Seu_Sobrenome');
        cy.get('#billing_company').type('Sua_Empresa');
        cy.get('#billing_address_1').type('Rua da Lapa, 123');
        cy.get('#billing_city').type('São Paulo');
        cy.get('#billing_postcode').type('01234-567');
        cy.get('#billing_phone').type('11987654321');
        cy.get('#billing_email').type('teste@teste.com');
        cy.get('#terms').check();
        cy.get('#place_order').click();
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
    });
});