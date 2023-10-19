import React from 'react';
import { describe, test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useItems } from '../src/hooks/useItems';

describe('useItems hooks', () => {
  test('should add and remove items', () => {
    const { result } = renderHook(() => useItems());

    expect(result.current.items).toEqual([]);
    expect(result.current.items.length).toBe(0);

    act(() => {
      result.current.addItem('Frida');
      result.current.addItem('Black');
    });

    expect(result.current.items.length).toBe(2);

    act(() => {
      result.current.removeItem(result.current.items[0].id);
    });

    expect(result.current.items.length).toBe(1);
    expect(result.current.items[0].text).toBe('Black');
  });
});
