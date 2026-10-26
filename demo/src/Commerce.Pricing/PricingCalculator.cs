namespace Commerce.Pricing;

public sealed class PricingCalculator
{
    public decimal ApplyPromotion(
        decimal subtotal,
        string promotionCode,
        bool hasCategoryDiscount)
    {
        if (!string.Equals(promotionCode, "SAVE20", StringComparison.OrdinalIgnoreCase))
        {
            return subtotal;
        }

        // Intentional workshop bug: the implementation guesses the rule.
        var discount = subtotal * 0.20m;
        return subtotal - discount;
    }
}
