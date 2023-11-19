describe('add product to cart', () => {
  it('should be ablle to navigate to the product page and add it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product/"]').first().click()

    cy.url().should('include', '/product/')

    cy.get('button').contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })

  it('should not count duplicated products on cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('a[href^="/product/"]').first().click()

    cy.url().should('include', '/product/')

    cy.get('button').contains('Adicionar ao carrinho').click()
    cy.get('button').contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })

  it('should be able to searcgh for a product and add it to the cart', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[name=q]').type('camiseta').parent().submit()

    cy.get('a[href^="/product/"]').first().click()

    cy.url().should('include', '/product/')

    cy.get('button').contains('Adicionar ao carrinho').click()

    cy.contains('Carrinho (1)').should('exist')
  })
})
