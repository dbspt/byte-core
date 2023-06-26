@browser
Feature: Browser Steps

  @browser_go_to
  Scenario: Go to test
    Given I go to "about:blank"

  @browser_should_be_current_url_exactly
  Scenario: Should be current url exactly test
    Given I go to "about:blank"
    When I assert should be current url is exactly "about:blank"

  @browser_should_be_current_url_contains
  Scenario: Should be current url contains test
    Given I go to "about:blank"
    When I assert should be current url contains "blank"

  @browser_should_be_title_equals
  Scenario: Should be title equals test
    Given I go to "https://www.google.com.br"
    When I assert should be title equals "Google"

  @browser_go_back
  Scenario: Go back test
    Given I go to "https://www.google.com.br"
    When I assert should be title equals "Google"
    Then I go to "https://www.youtube.com"
    And I assert should be title equals "YouTube"
    Then I go back
    And I assert should be title equals "Google"

  @browser_go_forward
  Scenario: Go forward test
    Given I go to "https://www.google.com.br"
    When I assert should be title equals "Google"
    Then I go to "https://www.youtube.com"
    And I assert should be title equals "YouTube"
    Then I go back
    And I assert should be title equals "Google"
    Then I go forward
    And I assert should be title equals "YouTube"

  @browser_refresh_page
  Scenario: Refresh page test
    Given I go to "about:blank"
    When I refresh page