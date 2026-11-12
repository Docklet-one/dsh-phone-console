import { describe, expect, it } from 'vitest'
import { compareMessages, messageOrder, sortMessages } from './timeline.js'

describe('timeline ordering', () => {
  it('puts messages without seq last', () => {
    expect(messageOrder({ seq: 3 })).toBe(3)
    expect(messageOrder({ seq: '4' })).toBe(4)
    expect(messageOrder({})).toBe(Number.MAX_SAFE_INTEGER)
    expect(messageOrder({ seq: 'abc' })).toBe(Number.MAX_SAFE_INTEGER)
  })

  it('sorts by seq, then time, then id', () => {
    const list = [
      { text: 'late', seq: undefined, at: 1, id: 1 },
      { text: 'b', seq: 2, at: 20 },
      { text: 'a', seq: 1, at: 10 },
      { text: 'a2', seq: 1, at: 11 },
      { text: 'a3', seq: 1, at: 11 },
    ]
    const sorted = sortMessages(list)
    expect(sorted.map((item) => item.text)).toEqual(['a', 'a2', 'a3', 'b', 'late'])
  })

  it('keeps fractional seq between neighbours (optimistic send)', () => {
    const list = [{ seq: 6 }, { seq: 5.5 }, { seq: 5 }]
    expect(list.sort(compareMessages).map((item) => item.seq)).toEqual([5, 5.5, 6])
  })
})
