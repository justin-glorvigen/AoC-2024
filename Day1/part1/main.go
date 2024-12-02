package main

import (
	"fmt"
	"math"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	filename := "input.txt"

	contents, _ := os.ReadFile(filename)

	strContents := string(contents)

	left, right := []int{}, []int{}

	lines := strings.Split(strContents, "\n")

	for _, line := range lines {
		if line == "" {
			continue
		}

		items := strings.Split(line, "   ")
		if len(items) != 2 {
			fmt.Println(fmt.Sprintf("Error parsing line %s", line))
		}

		leftItem, err := strconv.Atoi(items[0])
		if err != nil {
			fmt.Println(fmt.Sprintf("Error converting left %s to int, err=%v", items[0], err))
		} else {
			left = append(left, leftItem)
		}
		rightItem, err := strconv.Atoi(items[1])
		if err != nil {
			fmt.Println(fmt.Sprintf("Error converting right %s to int, err=%v", items[1], err))
		} else {
			right = append(right, rightItem)
		}
	}

	sort.Ints(left)
	sort.Ints(right)

	sum := float64(0)

	for i := 0; i < len(left); i++ {
		sum = sum + math.Abs(float64(right[i])-float64(left[i]))
	}

	fmt.Println(strconv.FormatFloat(sum, 'f', 0, 32))
}
