@element @element_page
Feature: Element Steps

  @element_should_contain_text
  Scenario: Element should contain text test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert "Title" element should contain "Welcome to the-internet" text

  @element_should_not_contain_text
  Scenario: Element should not contain text test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert "Title" element should not contain "I am the flash" text

  @element_page_should_contain_text
  Scenario: Page should contain text test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert page should contain "Welcome to the-internet" text

  @element_page_should_not_contain_text
  Scenario: Page should not contain text test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert page should not contain "I am the flash" text

  @element_assingn_id_to_element
  Scenario: Assign id to alement test
    Given I go to "https://the-internet.herokuapp.com"
    When I assign "title" id to "Title" element

  @element_should_be_enabled
  Scenario: Element Should be enabled test
    Given I go to "https://the-internet.herokuapp.com/dynamic_controls"
    When I assert "Enabled" element should be enabled

  @element_should_be_disabled
  Scenario: Element Should be disabled test
    Given I go to "https://the-internet.herokuapp.com/dynamic_controls"
    When I assert "Disabled" element should be disabled

  @element_page_should_contain_element
  Scenario: Page Should contain element test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert page should contain "Title" element

  @element_page_should_not_contain_element
  Scenario: Page Should not contain element test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert page should not contain "Not Exist" element

  @element_should_be_focused
  Scenario: Element should be focused test
    Given I go to "https://www.google.com.br"
    When I assert "Search" element should be focused

  @element_should_be_visible
  Scenario: Element should be visible test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert "Title" element should be visible

  @element_should_not_be_visible
  Scenario: Element should not be visible test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert "Title" element should not be visible

  @element_should_be_text
  Scenario: Element should be text test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert "Title" element should be "Welcome to the-internet" text

  @element_should_not_be_text
  Scenario: Element should not be text test
    Given I go to "https://the-internet.herokuapp.com"
    When I assert "Title" element should not be "I am the flash" text

  @element_attribute_should_be_value
  Scenario: Element attribute should be value test
    Given I go to "https://the-internet.herokuapp.com/horizontal_slider"
    When I assert "Horizontal Slider" element "value" attribute should be "0" value

  @element_cover_element
  Scenario: Cover element test
    Given I go to "https://the-internet.herokuapp.com"
    When I cover "Title" element

# Não testavel no momento
# @element_clear_element_text
# Scenario: Clear element text test
#   Given I go to "https://the-internet.herokuapp.com/inputs"
#   When I clear "Title" element text

# Não testavel no momento
# @element_click_element
# Scenario: Click element test
#   Given I go to "https://the-internet.herokuapp.com/dynamic_loading/1"
#   When I click "Start" element