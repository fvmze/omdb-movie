describe('Nonce CSP Header', () => {
  it('should include X-Nonce and CSP headers on main page', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'error').as('consoleError')
      },
    })

    cy.request('/').then((res) => {
      const nonce = res.headers['x-nonce']
      const csp = res.headers['content-security-policy']

      expect(nonce).to.match(/^[a-f0-9]{32}$/)
      expect(csp).to.include(`'nonce-${nonce}'`)
    })
  })
})
