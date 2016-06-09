var pageCommands = {
  clickActionsDropdown: function() {
    return this.click('@subscriptionDetailsActions');
  }
};

var actionsCommands = {
  clickDelete: function() {
    this.api.pause(1000);
    return this.click('@deleteLink');
  }
};

module.exports = {
  commands: [pageCommands],
  elements: {
    subscriptionDetailsActions: '#subscription-details-actions'
  },
  sections: {
    actionsDropdown: {
      commands: [actionsCommands],
      selector: '.actions .dropdown',
      elements: {
        deleteLink: 'ul li:nth-child(8) a'
      }
    }
  }
};
