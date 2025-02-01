const ones = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
]
const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]

function convertLessThanOneThousand(num: number): string {
  if (num === 0) {
    return ""
  } else if (num < 20) {
    return ones[num]
  } else if (num < 100) {
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "")
  } else {
    return (
      ones[Math.floor(num / 100)] + " hundred" + (num % 100 !== 0 ? " " + convertLessThanOneThousand(num % 100) : "")
    )
  }
}

export function numberToWords(num: number): string {
  if (num === 0) return "zero"

  const crore = Math.floor(num / 10000000)
  const lakh = Math.floor((num % 10000000) / 100000)
  const thousand = Math.floor((num % 100000) / 1000)
  const remaining = num % 1000

  let result = ""

  if (crore > 0) {
    result += convertLessThanOneThousand(crore) + " crore "
  }
  if (lakh > 0) {
    result += convertLessThanOneThousand(lakh) + " lakh "
  }
  if (thousand > 0) {
    result += convertLessThanOneThousand(thousand) + " thousand "
  }
  if (remaining > 0) {
    result += convertLessThanOneThousand(remaining)
  }

  return result.trim()
}

