@alert @alert_page
Feature: Alert Steps

  @alert_accept
  Scenario: Accept alert box test
    Given I go to "https://the-internet.herokuapp.com/javascript_alerts"
    Then I click "Click for JS Alert" element
    Then I accept alert box

  @alert_dismiss
  Scenario: Dismiss alert box test
    Given I go to "https://the-internet.herokuapp.com/javascript_alerts"
    Then I click "Click for JS Alert" element
    Then I dismiss alert box

  @alert_should_be_present_and_accept
  Scenario: Should be present and accept alert box test
    Given I go to "https://the-internet.herokuapp.com/javascript_alerts"
    Then I click "Click for JS Alert" element
    Then I should see be present and accept alert box with "I am a JS Alert" text

  @alert_should_be_present_and_dismiss
  Scenario: Should be present and dismiss alert box test
    Given I go to "https://the-internet.herokuapp.com/javascript_alerts"
    Then I click "Click for JS Alert" element
    Then I should see be present and dismiss alert box with "I am a JS Alert" text

  @alert_input_text_into
  Scenario: Input text into prompt box test
    Given I go to "https://the-internet.herokuapp.com/javascript_alerts"
    Then I click "Click for JS Prompt" element
    Then I fill "test" text into prompt box
    Then I accept alert box