package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {
	bytes, _ := os.ReadFile("input.txt")
	contents := string(bytes)

	lines := strings.Split(contents, "\n")

	numSafe := 0
	for _, line := range lines {
		if line == "" {
			continue
		}
		items := strings.Split(line, " ")

		report := make([]int, len(items))
		for i, item := range items {
			report[i], _ = strconv.Atoi(item)
		}

		isSafe := isReportSafe(report, true)
		if !isSafe {
			// Loop through the numbers and see if removing one fixes it
			// Not the most efficient, but it works
			for i := 0; i < len(report); i++ {
				newReport := []int{}
				newReport = append(newReport, report[:i]...)
				newReport = append(newReport, report[i+1:]...)

				fmt.Printf("Checking %v\n", newReport)
				if isReportSafe(newReport, true) {
					fmt.Printf("Report %v is not safe, but removing %d makes it safe\n", report, report[i])
					isSafe = true
					break
				}
			}
		}

		if isSafe {
			fmt.Printf("Report %v is safe\n", report)
			numSafe++
		}
	}

	fmt.Printf("%d safe reports", numSafe)
}

func isReportSafe(values []int, logVals bool) bool {
	if len(values) < 2 {
		return true // Only one value is always safe
	}

	increasing := values[1] > values[0]
	for i := 1; i < len(values); i++ {
		val := values[i]
		if val == values[i-1] {
			// Value doesn't increase or decrease, automatically unsafe
			if logVals {
				fmt.Printf("Value %d=%d\n", val, values[i-1])
			}
			return false
		}
		if increasing && val < values[i-1] {
			// Increasing, but we found a value that doesn't increase
			if logVals {
				fmt.Printf("Increasing: %d !> %d\n", val, values[i-1])
			}
			return false
		}
		if !increasing && val > values[i-1] {
			// Decreasing, but we found a value that doesn't decrease
			if logVals {
				fmt.Printf("Decreasing: %d !< %d\n", val, values[i-1])
			}
			return false
		}

		safeChange := float64(3)
		diff := math.Abs(float64(val) - float64(values[i-1]))
		if diff > safeChange {
			// Change is too large to be considered safe
			if logVals {
				fmt.Printf("Value %d is not within a safe change of %d\n", val, values[i-1])
			}
			return false
		}
	}

	return true
}
