import { Then } from '@cucumber/cucumber'
import { Element, Logger, Selector, World } from '../index'
import assert from 'node:assert'

const logger = Logger.createLogger('Element')
const element = Element.getInstance()
const selector = Selector.getInstance()

Then(
    /^I assert "([^"]*)" element should (contain|not contain) "([^"]*)" text$/,
    async function (this: World, locator: string, action: string, text: string) {
        await element.getText(this, locator).then((expected) => {
            switch (action) {
                case 'contain':
                    if (text && !expected.includes(text)) {
                        const error = `Element '${locator}' should have contained text '${expected}' but its text was '${text}'.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    } else {
                        logger.info(`(${this.id}) Element '${locator}' contains text '${text}'.`)
                    }
                    break
                case 'not contain':
                    if (text && expected.includes(text)) {
                        const error = `Element '${locator}' should not contain text '${expected}' but it did.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    } else {
                        logger.info(
                            `(${this.id}) Element '${locator}' should not contain text '${text}'.`,
                        )
                    }
                    break
                default:
                    throw new Error(`(${this.id}) Incorrect action.`)
            }
        })
    },
)

Then(
    /^I assert page should (contain|not contain) "([^"]*)" text$/,
    async function (this: World, action: string, text: string) {
        await this.driver.getPageSource().then(async (expected) => {
            switch (action) {
                case 'contain':
                    logger.info(`(${this.id}) Current page should contain text '${text}'.`)
                    if (text && !expected.includes(text)) {
                        const error = `Page should have contained text '${text}' but did not.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    }
                    break
                case 'not contain':
                    logger.info(`(${this.id}) Current page should not contain text '${text}'.`)
                    if (text && expected.includes(text)) {
                        const error = `Page should not have contained text '${text}'.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    }
                    break
                default:
                    throw new Error(`(${this.id}) Incorrect action.`)
            }
        })
    },
)

Then(
    /^I assert page should (contain|not contain) "([^"]*)" element$/,
    async function (this: World, action: string, locator: string) {
        switch (action) {
            case 'contain':
                logger.info(`(${this.id}) Page should contain '${locator}' element.`)
                try {
                    await this.driver.findElement(await selector.locator(locator))
                } catch {
                    const error = `Page should contain '${locator}' element, but it not does.`
                    logger.log('fail', `(${this.id}) ${error}`)
                    assert.fail(error)
                }
                break
            case 'not contain':
                logger.info(`(${this.id}) Page should not contain '${locator}' element.`)
                let contain = false
                try {
                    await this.driver.findElement(await selector.locator(locator))
                    contain = true
                } catch {}
                if (contain) {
                    const error = `Page should not contain '${locator}' element, but it does.`
                    logger.log('fail', `(${this.id}) ${error}`)
                    assert.fail(error)
                }
                break
            default:
                throw new Error(`(${this.id}) Incorrect action.`)
        }
    },
)

Then(
    /^I assign "([^"]*)" id to "([^"]*)" element$/,
    async function (this: World, id: string, locator: string) {
        const element = await selector.getElement(this, locator)
        await this.driver.executeScript(`arguments[0].id='${id}';`, element).then(() => {
            logger.info(`(${this.id}) Assigning temporary id '${id}' to element '${locator}'.`)
        })
    },
)

Then(
    /^I assert "([^"]*)" element should be (enabled|disabled)$/,
    async function (this: World, locator: string, action: string) {
        switch (action) {
            case 'enabled':
                const isEnabled = await element.isEnabled(this, locator)
                logger.info(`(${this.id}) Element '${locator}' should is enabled.`)
                if (!isEnabled) {
                    const error = `Element '${locator}' is disabled.`
                    logger.log('fail', `(${this.id}) ${error}`)
                    assert.fail(error)
                }
                break
            case 'disabled':
                const isDisabled = await element.isDisabled(this, locator)
                logger.info(`(${this.id}) Element '${locator}' should is disabled.`)
                if (!isDisabled) {
                    const error = `Element '${locator}' is enabled.`
                    logger.log('fail', `(${this.id}) ${error}`)
                    assert.fail(error)
                }
                break
            default:
                throw new Error(`(${this.id}) Incorrect action.`)
        }
    },
)

Then(
    /^I assert "([^"]*)" element should be focused$/,
    async function (this: World, locator: string) {
        const element = await selector.getElement(this, locator)
        const elementTagName = await element.getTagName()
        const focused = await this.driver.switchTo().activeElement()
        const focusedTagName = await focused.getTagName()
        logger.info(`(${this.id}) Element '${locator}' should be focused.`)
        if (elementTagName != focusedTagName) {
            const error = `Element '${locator}' does not have focus.`
            logger.log('fail', `(${this.id}) ${error}`)
            assert.fail(error)
        }
    },
)

Then(
    /^I assert "([^"]*)" element should (be|not be) visible$/,
    async function (this: World, locator: string, action: string) {
        const element = await this.driver.findElement(await selector.locator(locator))
        const isDisabled = await element.isDisplayed()
        switch (action) {
            case 'be':
                logger.info(`(${this.id}) Element '${locator}' should be displayed.`)
                if (!isDisabled) {
                    const error = `The element '${locator}' should be visible, but it is not.`
                    logger.log('fail', `(${this.id}) ${error}`)
                    assert.fail(error)
                }
                break
            case 'not be':
                logger.info(`(${this.id}) Element '${locator}' should not be displayed.`)
                if (isDisabled) {
                    const error = `The element '${locator}' should not be visible, but it is.`
                    logger.log('fail', `(${this.id}) ${error}`)
                    assert.fail(error)
                }
                break
            default:
                throw new Error(`(${this.id}) Incorrect action.`)
        }
    },
)

Then(
    /^I assert "([^"]*)" element should (be|not be) "([^"]*)" text$/,
    async function (this: World, locator: string, action: string, text: string) {
        await element.getText(this, locator).then((expected) => {
            switch (action) {
                case 'be':
                    logger.info(
                        `(${this.id}) Verifying element '${locator}' contains exact text '${text}'.`,
                    )
                    if (text && text != expected) {
                        const error = `The text of element '${locator}' should have been '${text}' but it was '${expected}'.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    }
                    break
                case 'not be':
                    logger.info(
                        `(${this.id}) Verifying element '${locator}' does not contain exact text '${text}'.`,
                    )
                    if (text && text == expected) {
                        const error = `The text of element '${locator}' was not supposed to be '${text}'.`
                        logger.log('fail', `(${this.id}) ${error}`)
                        assert.fail(error)
                    }
                    break
                default:
                    throw new Error(`(${this.id}) Incorrect action.`)
            }
        })
    },
)

Then(
    /^I assert "([^"]*)" element "([^"]*)" attribute should be "([^"]*)" value$/,
    async function (this: World, locator: string, attribute: string, expected: string) {
        await element.getAttribute(this, locator, attribute).then((current_expected) => {
            logger.info(
                `(${this.id}) Element '${locator}' attribute '${attribute}' contains value '${expected}'.`,
            )
            if (expected && current_expected != expected) {
                const error = `Element '${locator}' attribute should have value '${expected}' but its value was '${current_expected}'.`
                logger.log('fail', `(${this.id}) ${error}`)
                assert.fail(error)
            }
        })
    },
)

Then(/^I cover "([^"]*)" element$/, async function (this: World, locator: string) {
    let script = `
    old_element = arguments[0];
    let newDiv = document.createElement('div');
    newDiv.setAttribute("name", "covered");
    newDiv.style.backgroundColor = 'blue';
    newDiv.style.zIndex = '999';
    newDiv.style.top = old_element.offsetTop + 'px';
    newDiv.style.left = old_element.offsetLeft + 'px';
    newDiv.style.height = old_element.offsetHeight + 'px';
    newDiv.style.width = old_element.offsetWidth + 'px';
    old_element.parentNode.insertBefore(newDiv, old_element);
    old_element.remove();
    newDiv.parentNode.style.overflow = 'hidden';`
    try {
        const element = await this.driver.findElement(await selector.locator(locator))
        await this.driver.executeScript(script, element).then(() => {
            logger.info(`(${this.id}) Cover '${locator}' element.`)
        })
    } catch {
        const error = `No element with locator '${locator}' found.`
        logger.log('fail', `(${this.id}) ${error}`)
        assert.fail(error)
    }
})

Then(/^I clear "([^"]*)" element text$/, async function (this: World, locator: string) {
    await element.clear(this, locator).then(() => {
        logger.info(`(${this.id}) Clearing field '${locator}'.`)
    })
})

Then(/^I click "([^"]*)" element$/, async function (this: World, locator: string) {
    await element.click(this, locator).then(() => {
        logger.info(`(${this.id}) Clicking element '${locator}'.`)
    })
})

Then(/^I double click "([^"]*)" element$/, async function (this: World, locator: string) {
    const element = await selector.getElement(this, locator)
    await this.driver
        .actions({ async: true })
        .doubleClick(element)
        .perform()
        .then(() => {
            logger.info(`(${this.id}) Double clicking element '${locator}'.`)
        })
})

Then(/^I set focus to "([^"]*)" element$/, async function (this: World, locator: string) {
    const element = await selector.getElement(this, locator)
    await this.driver.executeScript('arguments[0].focus();', element)
})

Then(/^I scroll "([^"]*)" element into view$/, async function (this: World, locator: string) {
    const element = await selector.getElement(this, locator)
    await this.driver.executeScript('arguments[0].scrollIntoView(true);', element)
})

Then(
    /^I drag "([^"]*)" and "([^"]*)" drop$/,
    async function (this: World, locator: string, target: string) {
        const element = await selector.getElement(this, locator)
        const elementTarget = await selector.getElement(this, target)
        await this.driver
            .actions({ async: true })
            .dragAndDrop(element, elementTarget)
            .perform()
            .then(() => {
                logger.info(
                    `(${this.id}) Drags the element identified by '${locator}' into the '${target}' element.`,
                )
            })
    },
)

// Then(
//     /^I fill "([^"]*)" text into "([^"]*)" field$/,
//     async function (this: World, text: string, locator: string) {
//         await element.sendKeys(this, locator, text).then(() => {
//             logger.info(`(${this.id}) Typing text '${text}' into text field '${locator}'.`)
//         })
//     },
// )

// Then(/^I clean "([^"]*)" field$/, async function (this: World, locator: string) {
//     await element.clear(this, locator).then(() => {
//         logger.info(`(${this.id}) Clearing field '${locator}'.`)
//     })
// })

// Then(/^I submit "([^"]*)" form$/, async function (this: World, locator: string) {
//     await element.submit(this, locator).then(() => {
//         logger.info(`(${this.id}) Submitting form '${locator}'.`)
//     })
// })
