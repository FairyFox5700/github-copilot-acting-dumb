using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Commerce.Api.Tests;

public sealed class PricingQuoteEndpointTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public PricingQuoteEndpointTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Save20QuoteUsesTheAuthoritativePricingRules()
    {
        var response = await _client.PostAsJsonAsync("/api/pricing/quote", new
        {
            subtotal = 400m,
            promotionCode = "SAVE20",
            hasCategoryDiscount = false
        });

        response.EnsureSuccessStatusCode();
        var quote = await response.Content.ReadFromJsonAsync<PriceQuoteResponse>();

        Assert.NotNull(quote);
        Assert.Equal(50m, quote.DiscountApplied);
        Assert.Equal(350m, quote.FinalAmount);
    }

    [Fact]
    public async Task Save20DoesNotStackAtTheHttpBoundary()
    {
        var response = await _client.PostAsJsonAsync("/api/pricing/quote", new
        {
            subtotal = 100m,
            promotionCode = "SAVE20",
            hasCategoryDiscount = true
        });

        response.EnsureSuccessStatusCode();
        var quote = await response.Content.ReadFromJsonAsync<PriceQuoteResponse>();

        Assert.NotNull(quote);
        Assert.Equal(0m, quote.DiscountApplied);
        Assert.Equal(100m, quote.FinalAmount);
    }

    [Fact]
    public async Task Save20RoundsCurrencyAwayFromZeroAtTheHttpBoundary()
    {
        var response = await _client.PostAsJsonAsync("/api/pricing/quote", new
        {
            subtotal = 99.99m,
            promotionCode = "SAVE20",
            hasCategoryDiscount = false
        });

        response.EnsureSuccessStatusCode();
        var quote = await response.Content.ReadFromJsonAsync<PriceQuoteResponse>();

        Assert.NotNull(quote);
        Assert.Equal(20m, quote.DiscountApplied);
        Assert.Equal(79.99m, quote.FinalAmount);
    }

    [Fact]
    public async Task NonPositiveSubtotalReturnsValidationProblem()
    {
        var response = await _client.PostAsJsonAsync("/api/pricing/quote", new
        {
            subtotal = 0m,
            promotionCode = "SAVE20",
            hasCategoryDiscount = false
        });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    private sealed record PriceQuoteResponse(decimal DiscountApplied, decimal FinalAmount);
}
