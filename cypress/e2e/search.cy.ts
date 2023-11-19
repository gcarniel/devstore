describe('Search products', () => {
  it('should be able to search for a products', () => {
    cy.visit('/')
    cy.get('input[name=q]').type('camiseta').parent('form').submit()

    cy.location('pathname').should('include', '/search')
    cy.location('search').should('include', 'q=camiseta')

    cy.get('a[href^="/product"]').should('exist')
  })

  it('should not be able to search page without a search query', () => {
    cy.on('uncaught:exception', () => {
      return false
    })

    cy.visit('/search')

    cy.location('pathname').should('equal', '/')
  })
})
