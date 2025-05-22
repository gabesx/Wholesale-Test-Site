import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When(
  'I add a new product with name {string} and prices regular {string}, sale {string}, wholesale {string}',
  (name, regular, sale, wholesale) => {
    cy.contains('Add new product').click();
    cy.get('#title').type(name).should('have.value', name);
    cy.get('iframe#content_ifr').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .click()
        .wait(200)
        .clear({ force: true })
        .type('This is a test product description.');
    });
    cy.get('#new-tag-product_tag').type('test,automation');
    cy.get('.tagadd').click();
    cy.get('body').then($body => {
      const $brandLabel = $body.find('label[for^="in-product_brand-"]');
      if ($brandLabel.length) {
        const checkboxId = $brandLabel.first().attr('for');
        cy.get(`#${checkboxId}`).check({ force: true });
      }
    });
    cy.get('input[name="_regular_price"]').clear().type(regular);
    cy.get('input[name="_sale_price"]').clear().type(sale);
    cy.get('body').then($body => {
      const $wholesale = $body.find('input[name="wholesale_customer_wholesale_price"]');
      if ($wholesale.length) {
        cy.get('input[name="wholesale_customer_wholesale_price"]', { timeout: 10000 })
          .should('be.visible')
          .clear();
        if (wholesale) {
          cy.get('input[name="wholesale_customer_wholesale_price"]').type(wholesale);
        }
      }
    });
    cy.get('#publish').click();
    cy.contains('Product published').should('exist');
  }
);

When('I visit the product page for {string}', (productName) => {
  cy.get('a.row-title').contains(productName).invoke('attr', 'href').then((href) => {
    cy.visit(href);
  });
});

When('I go to the products admin page', () => {
  cy.visit('/wp-admin/edit.php?post_type=product');
});

Then('I should see the product prices: regular {string}, sale {string} and wholesale value {string}', (regular, sale, wholesale) => {
  const regularNum = Number(regular);
  const saleNum = Number(sale);

  cy.get('del .woocommerce-Price-amount').should('contain', `Rp${regularNum.toLocaleString('id-ID')}`);
  cy.get('ins .woocommerce-Price-amount').should('contain', `Rp${saleNum.toLocaleString('id-ID')}`);

  if (wholesale !== 'no wholesale price') {
    let expectedWholesale;
    if (wholesale.trim().endsWith('%')) {
      const percent = parseFloat(wholesale);
      expectedWholesale = Math.round(regularNum * (1 - percent / 100));
    } else {
      expectedWholesale = Number(wholesale);
    }
    cy.get('.wholesale_price_container').should('contain', `Rp${expectedWholesale.toLocaleString('id-ID')}`);
  } else {
    cy.get('.wholesale_price_container').should('not.exist');
  }
});

When(
  'Admin fills in the product baseline with name {string}, regular price {string}, and sale price {string}',
  (name, regular, sale) => {
    cy.visit('/wp-admin/post-new.php?post_type=product');
    cy.get('#title').clear().type(name).should('have.value', name);
    cy.get('iframe#content_ifr').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .click()
        .wait(200)
        .type('{selectall}{backspace}')
        .type('This is a test product description.');
    });
    cy.get('iframe#excerpt_ifr').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .click()
        .wait(200)
        .type('{selectall}{backspace}')
        .type('This is a test product short description.');
    });
    cy.get('#new-tag-product_tag').type('automation-test');
    cy.get('.tagadd').click();
    cy.get('body').then($body => {
      if ($body.find('label:contains("automation-test") input[type="checkbox"]').length) {
        cy.contains('label', 'automation-test').find('input[type="checkbox"]').check({ force: true });
      } else {
        cy.get('#product_cat-add-toggle').click();
        cy.get('#newproduct_cat').clear().type('automation-test');
        cy.get('#product_cat-add-submit').click();
        cy.contains('label', 'automation-test').find('input[type="checkbox"]').check({ force: true });
      }
    });
    cy.get('body').then($body => {
      if ($body.find('label:contains("automation-test") input[type="checkbox"]').length) {
        cy.contains('label', 'automation-test').find('input[type="checkbox"]').check({ force: true });
      } else if ($body.find('#product_brand-add-toggle').length) {
        cy.get('#product_brand-add-toggle').click();
        cy.get('#newproduct_brand').clear().type('automation-test');
        cy.get('#product_brand-add-submit').click();
        cy.contains('label', 'automation-test').find('input[type="checkbox"]').check({ force: true });
      }
    });
    cy.get('input[name="_regular_price"]').clear();
    if (regular && regular !== '0') {
      cy.get('input[name="_regular_price"]').type(regular);
    }
    cy.get('input[name="_sale_price"]').clear();
    if (sale && sale !== '0') {
      cy.get('input[name="_sale_price"]').type(sale);
    }
    cy.get('#sample-permalink')
      .invoke('attr', 'href')
      .then((permalink) => {
        Cypress.env('productPermalink', permalink);
      });
  }
);

When('Admin sets {string} wholesale discount to {string}', (type, value) => {
  const discountType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  cy.get('select[name="wholesale_customer_wholesale_discount_type"]').select(discountType);
  if (discountType === 'Fixed') {
    cy.get('input[name="wholesale_customer_wholesale_price"]').should('be.visible').clear().type(value);
  } else if (discountType === 'Percentage') {
    cy.get('input[name="wholesale_customer_wholesale_percentage_discount"]').should('be.visible').clear().type(value);
  }
});

When('Admin publishes the product', () => {
  cy.get('#publish').click();
  cy.contains('Product published').should('exist');
});

When('I visit the saved product page', () => {
  const permalink = Cypress.env('productPermalink');
  cy.visit(permalink);
});
