'use strict';

/**
 * part controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  shopName: 'isaac-sosebee',
//   apiKey: 'f77fa8f3b0e20c3319e07d5bd8a731cb',
  accessToken: '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'
});

// module.exports = createCoreController('api::part.part');
module.exports = createCoreController('api::part.part', ({ strapi }) =>  ({
    async findOne(ctx) {
        const { id } = ctx.params;
        const { query } = ctx;
    
        const entity = await strapi.service('api::part.part').findOne(id, query);

        entity.shopify = await shopify.product.get(entity.shopifyID);

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    
        return this.transformResponse(sanitizedEntity);
      }
}));


/*
  // Find Product by ID
      async findOne(ctx) {
        const { id } = ctx.params;
        const entity = await strapi.services.product.findOne({ id });
        return sanitizeEntity(entity, { model: strapi.models.product });
      },
    */