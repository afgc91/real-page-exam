module.exports = (on, config) => {
    on('before:browser:launch', (browser = {}, launchOptions) => {
      if (browser.family === 'chromium') {
        launchOptions.args.push('--disable-site-isolation-trials = true')
    }
  
      return launchOptions
    })
}

describe('Real Page Exam', () => {
    const BASE_URL = 'https://www.google.com/'
    const SEARCH_WORD = 'The name of the wind'
    const SEARCH_WORD_2 = 'The name of the w'
    const WAIT_TIME = 1000
    const GOOGLE_SEARCH_BOX = '.gLFyf'
    const SITE_TITLE = 'The Books - Patrick Rothfuss'
    var siteToVisit = ''

    function visitGoogle () {
        cy.visit(BASE_URL)
    }

    function getSearchResult () {
        cy.get('.r > a').each((element, index, list) => {
            if (element.children('h3').text() === SITE_TITLE) {
               siteToVisit = 'http://' + element.text().match(/www\.[a-z]*\.com/)
               cy.log(siteToVisit)
            }
        })
    }

    function visitRothfussWebsite (site) {
        cy.visit(site)
    }

    it('Vist https://www.google.com', () => {
        visitGoogle()
    })

    it('Get Patrick Website URL from Google Search', function () {
        cy.get(GOOGLE_SEARCH_BOX).type(SEARCH_WORD).type('{enter}')
        getSearchResult()
    })

    it('Visit Patrick Rothfuss Website', () => {
        visitRothfussWebsite(siteToVisit)
    })

    it('Vist https://www.google.com', () => {
        visitGoogle()
    })

    it('Get Patrick Website URL from Google Search using the suggestion list', function () {
        cy.get(GOOGLE_SEARCH_BOX).type(SEARCH_WORD_2).then(() => {
            cy.wait(WAIT_TIME)
            cy.get(':nth-child(1) > .jKWzZXdEJWi__suggestions-inner-container > .sbtc > .sbl1 > span').click()
            getSearchResult()
        })
    })

    it('Visit Patrick Rothfuss Website', () => {
        visitRothfussWebsite(siteToVisit)
    })
})