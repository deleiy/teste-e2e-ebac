Cypress.Commands.add('preencherDadosCheckout', (dados) => {
    cy.get('#billing_first_name').type(dados.nome);
    cy.get('#billing_last_name').type(dados.sobrenome);
    cy.get('#billing_company').type(dados.empresa);
    cy.get('#billing_address_1').type(dados.endereco);
    cy.get('#billing_city').type(dados.cidade);
    cy.get('#billing_postcode').type(dados.cep);
    cy.get('#billing_phone').type(dados.telefone);
    cy.get('#billing_email').type(dados.email);
    cy.get('#terms').check();
});
