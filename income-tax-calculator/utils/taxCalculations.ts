function applySurcharge(tax: number, income: number, year: 2024 | 2025): number {
  let surcharge = 0
  let maxMarginalRelief = 0

  if (year === 2024) {
    if (income > 50000000) {
      surcharge = tax * 0.37
      maxMarginalRelief = income - 50000000
    } else if (income > 20000000) {
      surcharge = tax * 0.25
      maxMarginalRelief = income - 20000000
    } else if (income > 10000000) {
      surcharge = tax * 0.15
      maxMarginalRelief = income - 10000000
    } else if (income > 5000000) {
      surcharge = tax * 0.1
      maxMarginalRelief = income - 5000000
    }
  } else if (year === 2025) {
    if (income > 50000000) {
      surcharge = tax * 0.25
      maxMarginalRelief = income - 50000000
    } else if (income > 20000000) {
      surcharge = tax * 0.15
      maxMarginalRelief = income - 20000000
    } else if (income > 10000000) {
      surcharge = tax * 0.1
      maxMarginalRelief = income - 10000000
    }
  }

  // Apply marginal relief
  surcharge = Math.min(surcharge, maxMarginalRelief)

  return tax + surcharge
}

export function calculateTax2024(income: number): number {
  if (income <= 700000) return 0 // Rebate for income up to 7,00,000

  let tax = 0
  let taxableIncome = income

  if (taxableIncome > 1500000) {
    tax += (taxableIncome - 1500000) * 0.3
    taxableIncome = 1500000
  }

  if (taxableIncome > 1200000) {
    tax += (taxableIncome - 1200000) * 0.2
    taxableIncome = 1200000
  }

  if (taxableIncome > 900000) {
    tax += (taxableIncome - 900000) * 0.15
    taxableIncome = 900000
  }

  if (taxableIncome > 600000) {
    tax += (taxableIncome - 600000) * 0.1
    taxableIncome = 600000
  }

  if (taxableIncome > 300000) {
    tax += (taxableIncome - 300000) * 0.05
  }

  return applySurcharge(tax, income, 2024)
}

export function calculateTax2025(income: number): number {
  if (income <= 1200000) return 0 // Rebate for income up to 12,00,000

  let tax = 0
  let taxableIncome = income

  if (taxableIncome > 2400000) {
    tax += (taxableIncome - 2400000) * 0.3
    taxableIncome = 2400000
  }

  if (taxableIncome > 2000000) {
    tax += (taxableIncome - 2000000) * 0.25
    taxableIncome = 2000000
  }

  if (taxableIncome > 1600000) {
    tax += (taxableIncome - 1600000) * 0.2
    taxableIncome = 1600000
  }

  if (taxableIncome > 1200000) {
    tax += (taxableIncome - 1200000) * 0.15
    taxableIncome = 1200000
  }

  if (taxableIncome > 800000) {
    tax += (taxableIncome - 800000) * 0.1
    taxableIncome = 800000
  }

  if (taxableIncome > 400000) {
    tax += (taxableIncome - 400000) * 0.05
  }

  return applySurcharge(tax, income, 2025)
}

