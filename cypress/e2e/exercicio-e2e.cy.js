//  cypress/e2e/exercicio-e2e.cy.js

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
            
            cy.get( {timeout: 10000});

            cy.get('.single_add_to_cart_button').click();
             
            
            cy.visit('http://lojaebac.ebaconline.art.br/produtos/');
        });
        
        cy.visit('http://lojaebac.ebaconline.art.br/carrinho/'); 
        cy.get('.checkout-button').click();
        
        const customerData = {
            nome: 'Seu_Nome',
            sobrenome: 'Seu_Sobrenome',
            empresa: 'Sua_Empresa',
            endereco: 'Rua da Lapa, 123',
            cidade: 'São Paulo',
            cep: '01234-567',
            telefone: '11987654321',
            email: 'teste@teste.com'
        };

        cy.preencherDadosCheckout(customerData);
        
        cy.get('#place_order').click();
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
    }); 
});