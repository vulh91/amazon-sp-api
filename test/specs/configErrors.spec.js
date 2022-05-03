const SellingPartnerAPI = require('../../index');
const chai = require('chai');
const expect = chai.expect;

describe('configErrors', async function(){

	it('should return a missing refresh token error', async function(){
    try {
      new SellingPartnerAPI({
        region:this.config.region,
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_REFRESH_TOKEN_PROVIDED');
    }
	});

  it('should return an invalid region error', async function(){
    try {
      new SellingPartnerAPI({
        region:'de',
        refresh_token:this.config.refresh_token
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_VALID_REGION_PROVIDED');
    }
  });

  it('should return a no operation given error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        access_token:this.config.access_token,
        role_credentials:this.config.role_credentials
      });
      await sellingPartner.callAPI({});
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_OPERATION_GIVEN');
    }
  });

  it('should return an invalid operation error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        access_token:this.config.access_token,
        role_credentials:this.config.role_credentials,
        options:{
          only_grantless_operations:true
        }
      });
      await sellingPartner.callAPI({
        operation:'sellers.getMarketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_OPERATION_ERROR');
    }
  });

  it('should return an endpoint not found error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        access_token:this.config.access_token,
        role_credentials:this.config.role_credentials
      });
      await sellingPartner.callAPI({
        operation:'getMarketplaceParticipations',
        endpoint:'invalidEndpoint'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('ENDPOINT_NOT_FOUND');
    }
  });

  it('should return an invalid operation for endpoint error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        access_token:this.config.access_token,
        role_credentials:this.config.role_credentials
      });
      await sellingPartner.callAPI({
        operation:'getMarketplaceParticipations',
        endpoint:'catalogItems'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_OPERATION_FOR_ENDPOINT');
    }
  });

  it('should return a no scope error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        options:{
          only_grantless_operations:true
        }
      });
      await sellingPartner.refreshAccessToken();
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_SCOPE_PROVIDED');
    }
  });

  it('should return a no access token or role credentials error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        options:{
          auto_request_tokens:false
        }
      });
      await sellingPartner.callAPI({
        operation:'sellers.getMarketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_ACCESS_TOKEN_AND_OR_ROLE_CREDENTIALS_PRESENT');
    }
  });

  it('should return a no operation given error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token
      });
      await sellingPartner.callAPI({});
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_OPERATION_GIVEN');
    }
  });

  it('should return an unknown operation error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token
      });
      await sellingPartner.callAPI({
        operation:'unknownOperation',
        endpoint:'sellers'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('OPERATION_NOT_FOUND');
    }
  });

  it('should return an invalid sandbox parameters error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        options:{
          use_sandbox:true
        }
      });
      await sellingPartner.callAPI({
        operation:'listCatalogItems',
        endpoint:'catalogItems',
        query:{
          MarketplaceId:'TEST',
          SellerSKU:'TEST'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_SANDBOX_PARAMETERS');
    }
  });

  it('should return an invalid refresh token error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:'invalidRefreshToken'
      });
      await sellingPartner.callAPI({
        operation:'sellers.getMarketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('invalid_grant');
    }
  });

  it('should return an invalid method error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token
      });
      await sellingPartner.callAPI({
        api_path:'/sellers/v1/marketplaceParticipations'
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('NO_VALID_METHOD_PROVIDED');
    }
  });

  it('should return an invalid endpoints error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        endpoints_versions:{
          'invalidEndpoint':'v0'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('VERSION_DEFINED_FOR_INVALID_ENDPOINTS');
    }
  });

  it('should return an invalid version for endpoints error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        endpoints_versions:{
          'sellers':'unknownVersion'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_VERSION_FOR_ENDPOINTS');
    }
  });

  it('should return an invalid version error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token
      });
      await sellingPartner.callAPI({
        operation:'getMarketplaceParticipations',
        endpoint:'sellers',
        options:{
          version:'unknownVersion'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('INVALID_VERSION');
    }
  });

  it('should return an operation not found for version error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        refresh_token:this.config.refresh_token,
        options:{
          version_fallback:false
        }
      });
      await sellingPartner.callAPI({
        operation:'listCatalogCategories',
        endpoint:'catalogItems',
        query:{
          MarketplaceId:this.config.marketplace_id,
          ASIN:this.config.asin
        },
        options:{
          version:'2020-12-01'
        }
      });
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('OPERATION_NOT_FOUND_FOR_VERSION');
    }
  });

  it('should return an invalid code parameter error', async function(){
    try {
      let sellingPartner = new SellingPartnerAPI({
        region:this.config.region,
        options:{
          only_grantless_operations:true
        }
      });
      await sellingPartner.exchange('invalid_auth_code');
    } catch(e){
      expect(e).to.be.an('error');
      expect(e.code).to.equal('invalid_request');
      expect(e.message).to.equal('The request has an invalid parameter : code');
    }
  });
  
});