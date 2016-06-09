var deleteFormActions = {
  clickToSubmit: function() {
    this.api.pause(1000); 
    return this.click('@submitButton');
  }
};

module.exports = {
  commands: [deleteFormActions],
  elements: {
    deleteSubscriptionForm: {
      selector: '#delete_subscription_form'
    },
    submitButton: {
      selector: 'input[type="submit"]'
    }
  }
};
