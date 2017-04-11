        expect(checkDisplay('getAdditionalAccountsToManageInputTxt'), accountSecond.companyName)
          .toBe(true);
         // TODO: checking access to main and addinional accounts - use REST API call
        // expect( Portal.admin.apiKeys.editPage
        //   .checkAccessApiKeyToAccount(apiKey.id,accountSecond.id,apiKey.key))
        //   .toBe(true);
      });

      it('checking access API Key to main and addinional accounts',function(){
         Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKey.key);
        // NOTE: checking access to main and addinional accounts - use REST API call
        expect(Portal.admin.apiKeys.editPage.checkAccessApiKeyToAccount(apiKey.id,accountFirst.id))
          .toBe(true);
        expect(Portal.admin.apiKeys.editPage.checkAccessApiKeyToAccount(apiKey.id,accountSecond.id))
          .toBe(true);