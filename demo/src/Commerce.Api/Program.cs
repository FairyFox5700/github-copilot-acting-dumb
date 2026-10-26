using Commerce.Pricing;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<PricingCalculator>();

var app = builder.Build();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));

app.MapPost("/api/pricing/quote", (PriceQuoteRequest request, PricingCalculator calculator) =>
{
    if (request.Subtotal <= 0)
    {
        return Results.Problem(
            detail: "Subtotal must be greater than zero.",
            statusCode: StatusCodes.Status400BadRequest);
    }

    var promotionCode = request.PromotionCode?.Trim() ?? string.Empty;
    var finalAmount = calculator.ApplyPromotion(
        request.Subtotal,
        promotionCode,
        request.HasCategoryDiscount);

    return Results.Ok(new PriceQuoteResponse(
        request.Subtotal,
        promotionCode,
        request.HasCategoryDiscount,
        request.Subtotal - finalAmount,
        finalAmount));
});

app.Run();

public sealed record PriceQuoteRequest(
    decimal Subtotal,
    string? PromotionCode,
    bool HasCategoryDiscount);

public sealed record PriceQuoteResponse(
    decimal Subtotal,
    string PromotionCode,
    bool HasCategoryDiscount,
    decimal DiscountApplied,
    decimal FinalAmount);

public partial class Program;
