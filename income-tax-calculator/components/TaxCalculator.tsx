"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateTax2024, calculateTax2025 } from "../utils/taxCalculations"
import { numberToWords } from "../utils/numberToWords"

export default function TaxCalculator() {
  const [income, setIncome] = useState("")
  const [taxData, setTaxData] = useState({
    tax2024: 0,
    tax2025: 0,
    takeHome2024: 0,
    takeHome2025: 0,
    effectiveRate2024: 0,
    effectiveRate2025: 0,
  })
  const [amountInWords, setAmountInWords] = useState("")

  const handleCalculate = () => {
    const incomeValue = Number.parseFloat(income)
    if (isNaN(incomeValue)) return

    setAmountInWords(numberToWords(incomeValue))

    const tax2024 = calculateTax2024(incomeValue)
    const tax2025 = calculateTax2025(incomeValue)

    setTaxData({
      tax2024,
      tax2025,
      takeHome2024: incomeValue - tax2024,
      takeHome2025: incomeValue - tax2025,
      effectiveRate2024: (tax2024 / incomeValue) * 100,
      effectiveRate2025: (tax2025 / incomeValue) * 100,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Income Tax Calculator: 2024 vs 2025</h1>

      <div className="mb-8">
        <div className="flex space-x-4">
          <Input
            type="number"
            placeholder="Enter your annual income"
            value={income}
            onChange={(e) => {
              setIncome(e.target.value)
              setAmountInWords(numberToWords(Number.parseFloat(e.target.value) || 0))
            }}
            className="flex-grow"
          />
          <Button onClick={handleCalculate}>Calculate</Button>
        </div>
        {amountInWords && <p className="mt-2 text-sm text-gray-600">Amount: {amountInWords} rupees</p>}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <TaxCard
          year={2024}
          taxAmount={taxData.tax2024}
          takeHome={taxData.takeHome2024}
          effectiveRate={taxData.effectiveRate2024}
          accentColor="blue"
          income={Number.parseFloat(income)}
        />
        <TaxCard
          year={2025}
          taxAmount={taxData.tax2025}
          takeHome={taxData.takeHome2025}
          effectiveRate={taxData.effectiveRate2025}
          accentColor="green"
          income={Number.parseFloat(income)}
        />
      </div>

      <SavingsSection savings={taxData.tax2024 - taxData.tax2025} />

      <TaxSlabsInfo />
    </div>
  )
}

function TaxCard({ year, taxAmount, takeHome, effectiveRate, accentColor, income }) {
  const surchargeInfo = getSurchargeInfo(income, year)

  return (
    <Card className={`hover:shadow-lg transition-shadow duration-300 border-t-4 border-${accentColor}-500`}>
      <CardHeader>
        <CardTitle className={`text-2xl font-bold text-${accentColor}-600`}>{year} Tax Regime</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2">
          <span className="font-semibold">Tax Amount:</span> ₹{taxAmount.toFixed(2)}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Take Home Amount:</span> ₹{takeHome.toFixed(2)}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Effective Tax Rate:</span> {effectiveRate.toFixed(2)}%
        </p>
        {surchargeInfo && (
          <p className="mb-2">
            <span className="font-semibold">Surcharge:</span> {surchargeInfo}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function getSurchargeInfo(income: number, year: number): string | null {
  if (year === 2024) {
    if (income > 50000000) return "37% of tax"
    if (income > 20000000) return "25% of tax"
    if (income > 10000000) return "15% of tax"
    if (income > 5000000) return "10% of tax"
  } else if (year === 2025) {
    if (income > 50000000) return "25% of tax"
    if (income > 20000000) return "15% of tax"
    if (income > 10000000) return "10% of tax"
  }
  return null
}

function SavingsSection({ savings }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">Your Tax Savings in 2025</h2>
      <p className="text-3xl font-bold text-green-600">₹{savings.toFixed(2)}</p>
    </div>
  )
}

function TaxSlabsInfo() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <TaxSlabCard
        year={2024}
        slabs={[
          { range: "₹0 - ₹3,00,000", rate: "Nil" },
          { range: "₹3,00,000 - ₹6,00,000", rate: "5%" },
          { range: "₹6,00,000 - ₹9,00,000", rate: "10%" },
          { range: "₹9,00,000 - ₹12,00,000", rate: "15%" },
          { range: "₹12,00,000 - ₹15,00,000", rate: "20%" },
          { range: "Above ₹15,00,000", rate: "30%" },
        ]}
        rebate="No tax for income up to ₹7,00,000"
      />
      <TaxSlabCard
        year={2025}
        slabs={[
          { range: "₹0 - ₹4,00,000", rate: "Nil" },
          { range: "₹4,00,000 - ₹8,00,000", rate: "5%" },
          { range: "₹8,00,000 - ₹12,00,000", rate: "10%" },
          { range: "₹12,00,000 - ₹16,00,000", rate: "15%" },
          { range: "₹16,00,000 - ₹20,00,000", rate: "20%" },
          { range: "₹20,00,000 - ₹24,00,000", rate: "25%" },
          { range: "Above ₹24,00,000", rate: "30%" },
        ]}
        rebate="No tax for income up to ₹12,00,000"
      />
    </div>
  )
}

function TaxSlabCard({ year, slabs, rebate }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{year} Tax Slabs</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {slabs.map((slab, index) => (
            <li key={index} className="flex justify-between">
              <span>{slab.range}</span>
              <span className="font-semibold">{slab.rate}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-gray-600">Rebate: {rebate}</p>
      </CardContent>
    </Card>
  )
}

