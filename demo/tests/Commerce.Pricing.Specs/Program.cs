using Commerce.Pricing;

var calculator = new PricingCalculator();
var failures = new List<string>();

Check("unknown code leaves price unchanged",
    expected: 120m,
    actual: calculator.ApplyPromotion(120m, "OTHER", hasCategoryDiscount: false));

Check("SAVE20 discounts twenty percent below cap",
    expected: 80m,
    actual: calculator.ApplyPromotion(100m, "SAVE20", hasCategoryDiscount: false));

Check("SAVE20 discount is capped at EUR 50",
    expected: 350m,
    actual: calculator.ApplyPromotion(400m, "SAVE20", hasCategoryDiscount: false));

Check("SAVE20 does not stack with category discount",
    expected: 100m,
    actual: calculator.ApplyPromotion(100m, "SAVE20", hasCategoryDiscount: true));

Check("currency result rounds away from zero",
    expected: 79.99m,
    actual: calculator.ApplyPromotion(99.99m, "SAVE20", hasCategoryDiscount: false));

if (failures.Count > 0)
{
    Console.Error.WriteLine($"FAILED: {failures.Count} pricing specification(s)");
    foreach (var failure in failures)
    {
        Console.Error.WriteLine($" - {failure}");
    }

    return 1;
}

Console.WriteLine("PASS: 5 pricing specifications");
return 0;

void Check(string name, decimal expected, decimal actual)
{
    if (expected != actual)
    {
        failures.Add($"{name}: expected {expected:G29}, got {actual:G29}");
    }
}
