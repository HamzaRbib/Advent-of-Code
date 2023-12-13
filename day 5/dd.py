# inputs, *blocks = open(0).read().split("\n\n")

# inputs = list(map(int, inputs.split(":")[1].split()))

# seeds = []

# for i in range(0, len(inputs), 2):
#     seeds.append((inputs[i], inputs[i] + inputs[i + 1]))

# for block in blocks:
#     ranges = []
#     for line in block.splitlines()[1:]:
#         ranges.append(list(map(int, line.split())))
#     new = []
#     while len(seeds) > 0:
#         s, e = seeds.pop()
#         for a, b, c in ranges:
#             os = max(s, b)
#             oe = min(e, b + c)
#             if os < oe:
#                 new.append((os - b + a, oe - b + a))
#                 if os > s:
#                     seeds.append((s, os))
#                 if e > oe:
#                     seeds.append((oe, e))
#                 break
#         else:
#             new.append((s, e))
#     seeds = new
#     print(new)

# print(min(seeds)[0])

# #10834440
import sys
import re

from itertools import groupby

## PARSE INPUT
def parse_ints(s):
    return list(map(int, re.findall("\d+", s)))

def split_list(lst):
    return (list(group) for _, group in groupby(lst, lambda x: x != ''))

almanac = [l.strip() for l in open(r"C:\Users\hmzrb\OneDrive\Documents\advent of code\day 5\exampleInput.txt").readlines()]
seeds = parse_ints(almanac[0])
maps = [[parse_ints(x) for x in m[1:]] for m in split_list(almanac[2:])]

## PART 1
def part1(seed):
    for m in maps:
        for to, start, count in m:
            if (start <= seed <= start + count):
                seed += to - start
                break


    return seed    

## PART 2
def find_overlap(r1, r2):
    r1_start, r1_end = r1
    r2_start, r2_end = r2
    o_start = max(r1_start, r2_start)
    o_end = min(r1_end, r2_end)
    return (o_start, o_end) if o_start <= o_end else None

def shift_range(r, delta):
    r_start, r_end = r
    return (r_start + delta, r_end + delta)

def split_range(r, overlap):
    result = set()

    o_start, o_end = overlap
    r_start, r_end = r

    if r_start < o_start:
        result.add((r_start, o_start-1))

    if r_end > o_end:
        result.add((o_end+1, r_end))

    return result

def as_range(start_count):
    start, count = start_count
    return (start, start + count - 1)

def part2():
    ranges = set(map(as_range, zip(seeds[0::2], seeds[1::2])))
    
    for m in maps:
        shifted_ranges = set()

        for to, start, count in m:
            for r in ranges.copy():
                if overlap := find_overlap(r, as_range((start, count))):
                    ranges.remove(r)
                    ranges |= split_range(r, overlap)
                    shifted_ranges.add(shift_range(overlap, to - start))

        ranges |= shifted_ranges
        print(ranges)  

    return ranges

print("2:", min(min(part2())))