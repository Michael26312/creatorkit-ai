'use client';

import { useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard, truncateText } from '@/lib/utils/string';
import toast from 'react-hot-toast';

interface ContentDisplayProps {
  title: string;
  items: string[];
  category: 'Social' | 'Video' | 'SEO' | 'Growth';
}

export function ContentDisplay({ title, items, category }: ContentDisplayProps) {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

  const handleCopy = async (text: string) => {
    try {
      await copyToClipboard(text);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.size === items.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map((_, i) => i)));
    }
  };

  const handleToggle = (index: number) => {
    const newSet = new Set(selectedItems);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setSelectedItems(newSet);
  };

  const handleCopySelected = async () => {
    const selected = Array.from(selectedItems)
      .map((i) => items[i])
      .join('\n\n');
    await handleCopy(selected);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="flex items-center gap-2">
          {selectedItems.size > 0 && (
            <span className="text-sm text-gray-600">{selectedItems.size} selected</span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedItems.has(index)
                ? 'border-brand-600 bg-brand-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => handleToggle(index)}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={selectedItems.has(index)}
                onChange={() => handleToggle(index)}
                className="mt-1 w-4 h-4 accent-brand-600"
              />
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm leading-relaxed break-words">{item}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(item);
                }}
                className="text-gray-500 hover:text-brand-600 flex-shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleSelectAll}
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {selectedItems.size === items.length ? 'Deselect All' : 'Select All'}
          </button>
          <div className="flex items-center gap-3">
            {selectedItems.size > 0 && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopySelected}
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  Copy Selected
                </Button>
              </>
            )}
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
