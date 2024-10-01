# Shamir's Secret Sharing Implementation

This project implements a simplified version of Shamir's Secret Sharing algorithm. It processes two test cases, finds the secret (constant term) for each polynomial, and identifies any wrong points in the second test case.

## Problem Statement

The task is to find the constant term 'c' of an unknown polynomial given a set of points. The points are provided in a specific JSON format, where the y-values are encoded in different bases. The implementation uses Lagrange interpolation to reconstruct the polynomial and find the secret.

## Features

- Reads input from separate JSON files for two test cases
- Decodes y-values from various bases
- Implements Lagrange interpolation to reconstruct the polynomial
- Finds the secret (constant term) for both test cases
- Identifies wrong points in the second test case
- Outputs results to both console and a file

## Implementation Details

The script uses Lagrange interpolation to reconstruct the polynomial from the given points. It then evaluates the polynomial at x=0 to find the constant term, which is the secret.

For the second test case, it also checks for any points that don't fit the reconstructed polynomial within a small threshold, identifying these as "wrong points".
